$(document).ready(function() {
    $('#btn').click(function() {
        const leftStr = $.trim($('#left').val());
        const rightStr = $.trim($('#right').val());
        const op = $('#op').val();

        const isPosInt = (str) => /^\d+$/.test(str);

        if (!isPosInt(leftStr) || !isPosInt(rightStr)) {
            alert('Error :(');
            return;
        }

        const left = parseInt(leftStr, 10);
        const right = parseInt(rightStr, 10);

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

    setInterval(function() {
        alert('Please, use me...');
    }, 30000);
});