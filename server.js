const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // ဒါကို ထည့်ပေးပါ
        methods: ["GET", "POST"]
    }
});

app.use(express.static("public"));

let players = [];
let choices = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    if (players.length < 2) {
        players.push(socket.id);
        socket.emit("player-assigned", players.indexOf(socket.id) + 1);
        io.emit("player-count", players.length);
    } else {
        socket.emit("game-full");
        socket.disconnect();
        return;
    }

    socket.on("make-choice", (data) => {
        choices[socket.id] = data.choice;
        io.emit("choice-made", { player: data.player, choice: data.choice });

        if (Object.keys(choices).length === 2) {
            const player1Choice = choices[players[0]];
            const player2Choice = choices[players[1]];
            let result = "";
            let winner = null;

            if (player1Choice === player2Choice) {
                result = "သရေ!";
            } else if (
                (player1Choice === "လက်သီး" && player2Choice === "ကတ်ကြေး") ||
                (player1Choice === "လက်ဝါး" && player2Choice === "လက်သီး") ||
                (player1Choice === "ကတ်ကြေး" && player2Choice === "လက်ဝါး")
            ) {
                result = "ကစားသမား ၁ အနိုင်ရတယ်!";
                winner = 1;
            } else {
                result = "ကစားသမား ၂ အနိုင်ရတယ်!";
                winner = 2;
            }

            io.emit("game-result", { player1Choice, player2Choice, result, winner });
            choices = {};
        }
    });

    socket.on("reset-game", () => {
        choices = {};
        io.emit("game-reset");
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        players = players.filter(id => id !== socket.id);
        delete choices[socket.id];
        io.emit("player-count", players.length);
        io.emit("game-reset");
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});