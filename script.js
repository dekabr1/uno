let count = +localStorage.getItem('count');

function updateLocalStorage() {
    let users = [];

    let userElements = document.querySelectorAll('.user');

    userElements.forEach(userElement => {
        let userId = userElement.id;
        let userName = userElement.querySelector('.player_name').textContent;
        let userScore = userElement.querySelector('.current_count').textContent;

        let user = { id: userId, name: userName, score: userScore };
        users.push(user);
    });

    localStorage.setItem('users', JSON.stringify(users));
}

function addUser() {

    if (!count) {
        count = 1;
        localStorage.setItem('count', count);
    }

    let inputs = document.querySelectorAll('input');
    let numberOfInputs = inputs.length;

    if (numberOfInputs < 10) {
        let div = document.createElement('div')
        div.className = "user";
        div.id = count + 1;

        let divName = document.createElement('div');
        divName.className = "player_name";
        let textNodeName = document.createTextNode('введите имя');
        divName.appendChild(textNodeName);

        let divCount = document.createElement('div');
        divCount.className = "current_count";
        let textNodeCount = document.createTextNode('0');
        divCount.appendChild(textNodeCount);

        let divInput = document.createElement('input');
        divInput.type = 'text';
        divInput.value = '';
        divInput.className = 'plus';

        div.appendChild(divName);
        div.appendChild(divCount);
        div.appendChild(divInput);

        document.querySelector('.column').appendChild(div);
        updateLocalStorage()
        console.log('User added');

        count++;
        localStorage.setItem('count', count);
    }
};



document.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('player_name')) {
        // Создаем новый input
        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.classList.add('editable-name');
        inputElement.placeholder = 'введите имя'; // Задаем подсказку

        // Заменяем элемент с классом 'player_name' на созданный input
        event.target.replaceWith(inputElement);

        // Устанавливаем фокус на input для начала ввода
        inputElement.focus();

        // Обработчик события "потеря фокуса" для input
        inputElement.addEventListener('blur', function () {
            // Проверяем, было ли введено новое имя
            if (inputElement.value.trim().length > 2) {
                // Если было введено имя, устанавливаем его текстом элемента
                event.target.textContent = inputElement.value.trim();
            } else {
                // Если имя не было введено, возвращаем подсказку
                event.target.textContent = 'введите имя';
            }
            // Заменяем input обратно на элемент с классом 'player_name'
            inputElement.replaceWith(event.target);
            updateLocalStorage()
        });
    }
});


function addNumbers() {
    let users = document.querySelectorAll('.user');
    let scores = {};

    users.forEach(user => {
        let userId = user.id;
        let currentCount = parseInt(user.querySelector('.current_count').textContent);
        scores[userId] = currentCount;
    });

    users.forEach(user => {
        let userId = user.id;
        let inputValue = user.querySelector('.plus').value.trim();


        if (!isNaN(inputValue) && inputValue !== '') {
            scores[userId] += parseInt(inputValue);
            updateLocalStorage()
        } else {
            scores[userId] += 0;
        }
        user.querySelector('.current_count').textContent = scores[userId];
    });
}

document.querySelector('.uno-logo').addEventListener('click', function () {
    addNumbers();
    updateLocalStorage()
});

document.querySelector('.uno-logo').addEventListener('click', function () {
    document.querySelectorAll('.plus').forEach(input => {
        input.value = '';
    });
});


function champions() {
    let users = document.querySelectorAll('.user');
    let maxScore = -Infinity;
    let championUsers = [];

    users.forEach(user => {
        let currentCount = parseInt(user.querySelector('.current_count').textContent);
        if (currentCount > maxScore && currentCount > 0) {
            maxScore = currentCount;
            championUsers = [user];
        } else if (currentCount === maxScore) {
            championUsers.push(user);
        }
    });

    users.forEach(user => {
        user.classList.remove('fire-animation');
    });

    championUsers.forEach(user => {
        user.classList.add('fire-animation');
    });
}

document.querySelector('.uno-logo').addEventListener('click', function () {
    champions();
});

document.querySelector('.new_user').onclick = addUser;

let inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
        }
    });
});

let column = document.querySelector('.column');

column.addEventListener('keydown', function (event) {
    if (event.target.classList.contains('plus')) {
        if (event.key === 'Enter' || event.key === 'Done') {
            addNumbers();
            champions();
            document.querySelectorAll('.plus').forEach(input => {
                input.value = '';
            });
            updateLocalStorage()
        }
    }
});




// Функция для загрузки данных из Local Storage и отображения их на странице
function loadUsersFromLocalStorage() {
    // Получаем данные из Local Storage
    let usersData = localStorage.getItem('users');

    // Проверяем, есть ли данные в Local Storage
    if (usersData) {
        // Парсим JSON-строку с данными о пользователях
        let users = JSON.parse(usersData);

        // Очищаем текущий список пользователей на странице
        document.querySelector('.column').innerHTML = '';

        // Проходимся по данным о пользователях и создаем для каждого соответствующие элементы на странице
        users.forEach(user => {
            let div = document.createElement('div')
            div.className = "user";
            div.id = user.id;

            let divName = document.createElement('div');
            divName.className = "player_name";
            divName.textContent = user.name;

            let divCount = document.createElement('div');
            divCount.className = "current_count";
            divCount.textContent = user.score;

            let divInput = document.createElement('input');
            divInput.type = 'text';
            divInput.value = '';
            divInput.className = 'plus';

            div.appendChild(divName);
            div.appendChild(divCount);
            div.appendChild(divInput);

            document.querySelector('.column').appendChild(div);
        });
    }
}

// Вызываем функцию загрузки данных из Local Storage при загрузке страницы
window.addEventListener('load', function () {
    loadUsersFromLocalStorage();
});
