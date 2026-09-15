$(document).ready(function() {
    loadTodos();

    $('#new_btn').click(function() {
        const text = prompt('Enter a new TO DO:');
        if (text && $.trim(text) !== '') {
            createTodo($.trim(text));
            saveTodos();
        }
    });

    function createTodo(text) {
        const $div = $('<div></div>').text(text);

        $div.click(function() {
            if (confirm('Do you really want to delete this TO DO?')) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend($div);
    }

    function saveTodos() {
        const todos = [];
        $('#ft_list div').each(function() {
            todos.push($(this).text());
        });

        const jsonStr = encodeURIComponent(JSON.stringify(todos));
        document.cookie = `todos=${jsonStr}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));
        if (todoCookie) {
            const jsonStr = todoCookie.split('=')[1];
            if (jsonStr) {
                try {
                    const todos = JSON.parse(decodeURIComponent(jsonStr));
                    for (let i = todos.length - 1; i >= 0; i--) {
                        createTodo(todos[i]);
                    }
                } catch (e) {
                    console.error("Cookie parsing error", e);
                }
            }
        }
    }
});