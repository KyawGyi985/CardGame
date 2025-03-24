const socket = io();

let playerNumber = 0;

socket.on('playerNumber', (number) => {
    playerNumber = number;
    document.getElementById('player').textContent = `လက်ရှိ ကစားသမား: ကစားသမား ${number}`;
});

socket.on('playerCount', (count) => {
    document.getElementById('playerCount').textContent = `ချိတ်ဆက်ထားသူ: ${count}`;
    if (count < 2) {
        document.getElementById('status').textContent = 'ကစားသမား ၂ ယောက် စောင့်နေတယ်...';
        document.getElementById('choices').style.pointerEvents = 'none';
    } else {
        document.getElementById('status').textContent = 'ဂိမ်းစတင်လို့ ရပါပြီ!';
        document.getElementById('choices').style.pointerEvents = 'auto';
    }
});

socket.on('gameFull', () => {
    alert('ဂိမ်းက ကစားသမား ၂ ယောက်နဲ့ ပြည့်နေပါပြီ။');
});

socket.on('result', (data) => {
    const { player1Choice, player2Choice, result } = data;
    document.getElementById('result').textContent = `ကစားသမား ၁: ${player1Choice}, ကစားသမား ၂: ${player2Choice} - ${result}`;
    document.getElementById('choices').style.pointerEvents = 'none';
    document.getElementById('reset').style.display = 'block';
});

socket.on('reset', () => {
    document.getElementById('result').textContent = '';
    document.getElementById('choices').style.pointerEvents = 'auto';
    document.getElementById('reset').style.display = 'none';
});

document.querySelectorAll('#choices img').forEach(img => {
    img.addEventListener('click', () => {
        const choice = img.getAttribute('data-choice');
        socket.emit('choice', { choice });
    });
});

document.getElementById('reset').addEventListener('click', () => {
    socket.emit('reset');
});