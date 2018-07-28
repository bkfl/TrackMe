const API_URL = 'https://217603898-sit-209.now.sh/api';
const MQTT_URL = 'https://217603898-sit-209.now.sh-mqtt';

// devices.html
const currentUser = localStorage.getItem('user');

if (currentUser) {
    $.get(`${API_URL}/users/${currentUser}/devices`)
        .then(response => {
            response.forEach((device) => {
                $('#devices tbody').append(`
                    <tr data-device-id=${device._id}>
                        <td>${device.user}</td>
                        <td>${device.name}</td>
                    </tr>`
                );
            });
            $('#devices tbody tr').on('click', (e) => {
                const deviceId = e.currentTarget.getAttribute('data-device-id');
                $.get(`${API_URL}/devices/${deviceId}/device-history`)
                    .then(response => {
                        response.map(sensorData => {
                            $('#historyContent').append(`
                                <tr>
                                    <td>${sensorData.ts}</td>
                                    <td>${sensorData.temp}</td>
                                    <td>${sensorData.loc.lat}</td>
                                    <td>${sensorData.loc.lon}</td>
                                </tr>`
                            );
                        });
                        $('#historyModal').modal('show');
                    });
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
} else {
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/registration') {
        location.href = '/login';
    }
}

// navbar.html
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
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
    $.post(`${API_URL}/devices`, body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
});

// send-command.html
$('#send-command').on('click', () => {
    const deviceId = $("#device-id").val();
    const command = $('#command').val();
    const body = {
        deviceId,
        command
    };
    $.post(`${MQTT_URL}/send-command`, body);
});

// registration.html
$('#register').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val();
    const confirm_password = $('#confirm-password').val();
    const isAdmin = false;
    if (password != confirm_password) {
        $('#message').empty();
        $('#message').append('<p class="alert alert-danger">The passwords do not match</p>');
    } else {
        $.post(`${API_URL}/register`, { user, password, isAdmin })
            .then(response => {
                if (response.success) {
                    location.href = '/login';
                } else {
                    $('#message').empty();
                    $('#message').append(`<p class="alert alert-danger">${response.message}</p>`);
                }
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }
});

// login.html
$('#login').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val();
    $.post(`${API_URL}/authenticate`, { user, password })
        .then(response => {
            if (response.success) {
                localStorage.setItem('user', user);
                localStorage.setItem('isAdmin', response.isAdmin);
                location.href = '/';
            } else {
                $('#message').empty();
                $('#message').append(`<p class="alert alert-danger">${response.message}</p>`);
            }
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
});