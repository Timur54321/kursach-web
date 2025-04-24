$(document).ready(function() {
    $("#create").click(async function() {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val()
        const email = $("#email").val();
        const password = $("#password").val();

        if (!email || !password) return alert("Укажите логин и пароль!");
        await fetch('/api/v1/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => console.log('Успех:', data))
        .catch(error => console.error('Ошибка:', error));

        // window.location = "/";
    });
});