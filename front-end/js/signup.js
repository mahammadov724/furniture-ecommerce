const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    fetch('http://localhost:8086/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(async response => {
            if (response.ok) {
                alert('User Registed Successfully');
                name: document.getElementById('name').value = '';
                surname: document.getElementById('surname').value = '';
                email: document.getElementById('email').value = '';
                username: document.getElementById('username').value = '';
                password: document.getElementById('password').valu = '';
            }else{
                const data = await response.json();
                alert(data.message);
            }
        })
})