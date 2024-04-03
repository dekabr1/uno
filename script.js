let count = 2;

function addUser() {
    let div = document.createElement('div')
    div.className = "user";
    div.id = count++;

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
    divInput.value = '0';
    divInput.className = 'plus';

    div.appendChild(divName);
    div.appendChild(divCount);
    div.appendChild(divInput);

    document.querySelector('.column').appendChild(div);

    console.log('User added');

};

document.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('player_name')) {

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = event.target.textContent.trim();
        inputElement.classList.add('editable-name');

        event.target.replaceWith(inputElement);


        inputElement.focus();


        inputElement.addEventListener('blur', function () {

            let newName = inputElement.value.trim();
            if (newName.length > 0 && newName.length > 3) {
                event.target.textContent = newName;
            } else {
                event.target.textContent = 'введите имя';
            }
            inputElement.replaceWith(event.target);
        });
    }
});



document.querySelector('.uno-logo').addEventListener('click', function () {
    let users = document.querySelectorAll('.user');
    let scores = {};

    // Получаем текущие счета для каждого пользователя
    users.forEach(user => {
        let userId = user.id; // Получаем ID пользователя
        let currentCount = parseInt(user.querySelector('.current_count').textContent);
        scores[userId] = currentCount;
    });

    // Обновляем счет для каждого пользователя, добавляя значение из поля plus
    users.forEach(user => {
        let userId = user.id; // Получаем ID пользователя
        let inputValue = user.querySelector('.plus').value.trim(); // Получаем значение из поля plus и убираем пробелы по краям

        // Проверяем, является ли введенное значение числом
        if (!isNaN(inputValue) && inputValue !== '') {
            scores[userId] += parseInt(inputValue);
        } else {
            // Если значение не является числом или пустой строкой, устанавливаем его равным 0
            scores[userId] += 0;
        }

        user.querySelector('.current_count').textContent = scores[userId];
    });
});



document.querySelector('.uno-logo').addEventListener('click', function () {
    document.querySelectorAll('.plus').forEach(input => {
        input.value = '0'; // Устанавливаем значение '0' для каждого инпута
    });
});


document.querySelector('.uno-logo').addEventListener('click', function () {
    let users = document.querySelectorAll('.user');
    let maxScore = -Infinity;
    let championUsers = [];


    users.forEach(user => {
        let currentCount = parseInt(user.querySelector('.current_count').textContent);
        if (currentCount > maxScore) {
            maxScore = currentCount;
            championUsers = [user]; // Новый чемпион, очищаем предыдущий массив
        } else if (currentCount === maxScore) {
            championUsers.push(user); // Добавляем пользователя в массив чемпионов
        }
    });


    users.forEach(user => {
        user.classList.remove('fire-animation');
    });


    championUsers.forEach(user => {

        user.classList.add('fire-animation');
    });
});








document.querySelector('.new_user').onclick = addUser;
