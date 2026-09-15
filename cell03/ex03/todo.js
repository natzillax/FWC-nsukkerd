const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// โหลดข้อมูลจาก Cookie เมื่อเปิดหน้าเว็บ
window.onload = function() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const jsonStr = todoCookie.split('=')[1];
        if (jsonStr) {
            try {
                const todos = JSON.parse(decodeURIComponent(jsonStr));
                // อ่านย้อนกลับเพื่อให้รายการถูก prepend กลับมาเรียงลำดับเดิม
                for (let i = todos.length - 1; i >= 0; i--) {
                    createTodo(todos[i]);
                }
            } catch (e) {
                console.error("Cookie parsing error", e);
            }
        }
    }
};

// ฟังก์ชันสร้าง TO DO Item
function createTodo(text) {
    const div = document.createElement('div');
    div.textContent = text;

    // เมื่อคลิกเพื่อลบ
    div.addEventListener('click', function() {
        if (confirm('Do you really want to delete this TO DO?')) {
            div.remove(); 
            saveTodos();  // อัปเดต Cookie
        }
    });

    // แทรกไว้ที่ด้านบนสุดเสมอ
    ftList.prepend(div);
}

// ฟังก์ชันบันทึกรายการลง Cookie
function saveTodos() {
    const todos = [];
    const items = ftList.querySelectorAll('div');
    items.forEach(item => {
        todos.push(item.textContent);
    });

    const jsonStr = encodeURIComponent(JSON.stringify(todos));
    // ตั้งค่า Cookie หมดอายุใน 7 วัน
    document.cookie = `todos=${jsonStr}; path=/; max-age=${7 * 24 * 60 * 60}`;
}

// ปุ่มกดสร้างรายการใหม่
newBtn.addEventListener('click', function() {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        createTodo(text.trim());
        saveTodos();
    }
});