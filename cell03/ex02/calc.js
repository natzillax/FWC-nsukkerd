document.getElementById('btn').addEventListener('click', function() {
    const leftStr = document.getElementById('left').value.trim();
    const rightStr = document.getElementById('right').value.trim();
    const op = document.getElementById('op').value;

    // ตรวจสอบว่าเป็นจำนวนเต็มบวกหรือ 0 เท่านั้น (ห้ามทศนิยม ห้ามติดลบ ห้ามเป็นตัวอักษร)
    const isPosInt = (str) => /^\d+$/.test(str);

    if (!isPosInt(leftStr) || !isPosInt(rightStr)) {
        alert('Error :(');
        return;
    }

    const left = parseInt(leftStr, 10);
    const right = parseInt(rightStr, 10);

    // ตรวจสอบกรณีหาร/Modulo ด้วย 0
    if ((op === '/' || op === '%') && right === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result;
    switch (op) {
        case '+': result = left + right; break;
        case '-': result = left - right; break;
        case '*': result = left * right; break;
        case '/': result = left / right; break;
        case '%': result = left % right; break;
    }

    alert(result);
    console.log(result);
});

// แจ้งเตือนทุกๆ 30 วินาที (30000 ms)
setInterval(function() {
    alert('Please, use me...');
}, 30000);