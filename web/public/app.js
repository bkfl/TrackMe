// General
const response = $.get('http://localhost:3001/devices')
    .then(response => {
        response.forEach(device => {
            $('#devices tbody').append(`
            <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
            </tr>`
            );
        });
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });

const users = JSON.parse(localStorage.getItem('users')) || [];

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
}

$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

// register-device.html
$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [];
    const body = {
        name,
        user,
        sensorData
    };
    $.post('http://localhost:3001/devices', body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
});

// send-command.html
$('#send-command').on('click', () => {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

// registration.html
$('#register').on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const confirm = $('#confirm-password').val();
    const exists = users.find(user => user.username === username);
    if (exists != undefined) {
        $('#message').empty();
        $('#message').append(`
        <div class="alert alert-danger">
            <strong>Error:</strong> That username already exists. Please enter a different username.
        </div>
        `);
    } else if (password != confirm) {
        $('#message').empty();
        $('#message').append(`
        <div class="alert alert-danger">
            <strong>Error:</strong> The entered passwords do not match.
        </div>
        `);
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        location.href = '/login';
    }
});

// login.html
$('#login').on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const exists = users.find(user => user.username === username);
    if (exists != undefined && password === exists.password) {
        localStorage.setItem('isAuthenticated', true);
        location.href = '/';
    } else {
        $('#message').empty();
        $('#message').append(`
        <div class="alert alert-danger">
            Incorrect username or password.
        </div>
        `);
    }
});