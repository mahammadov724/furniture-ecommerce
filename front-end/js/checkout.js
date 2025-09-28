
const token = localStorage.getItem('token');

document.getElementById('orderBtn').addEventListener('click', () => {

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let state = document.getElementById('country').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let cartNumber = document.getElementById('cartNumber').value;
    let zipCode = document.getElementById('zipCode').value;
    let expiryMonth = document.getElementById('expiryMonth').value;
    let expiryYear = document.getElementById('expiryYear').value;

    let cartIds = JSON.parse(localStorage.getItem('cartIdss'));

    if (cartIds) {
        let promises = cartIds.map(cartId => {
            const order = {
                cartId: cartId,
                firstName: firstName,
                lastName: lastName,
                country: state,
                address: address,
                city: city,
                phone: phone,
                email: email,
                cartNumber: cartNumber,
                zipCode: zipCode,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear
            }
            return fetch(`http://localhost:8086/orders/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })

        });

        Promise.all(promises)
            .then(async responses => {
                let response = responses.find(resp => resp.ok);
                if (response) {
                    let message = await response.text();
                    // alert(message);
                    Swal.fire({
                        title: message,
                        icon: "success",
                        width: '300px',
                        position: 'bottom-end',
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        background: '#d4edda',
                        color: '#155724',
                    });

                    document.getElementById('firstName').value = "";
                    document.getElementById('lastName').value = "";
                    document.getElementById('country').value = "";
                    document.getElementById('address').value = "";
                    document.getElementById('city').value = "";
                    document.getElementById('phone').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('cartNumber').value = "";
                    document.getElementById('zipCode').value = "";
                    document.getElementById('expiryMonth').value = "";
                    document.getElementById('expiryYear').value = "";

                    localStorage.removeItem('cartIdss');
                } else {
                    for (let res of responses) {
                        let data = await res.json();
                        console.log(data);

                        if (data.message) {
                            Swal.fire({
                                title: data.message,
                                icon: 'error',
                                width: '300px',
                                position: 'bottom-end',
                                toast: true,
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                background: '#f8d7da',
                                color: '#721c24',
                            });
                        }

                        document.querySelectorAll('.error-message').forEach(error => error.remove());
                        document.querySelectorAll('input, select').forEach(input => {
                            input.style.borderColor = "";
                        })

                        if (data.validations) {
                            data.validations.forEach(error => {
                                let field = error.field;
                                let message = error.defaultMessage;

                                let inputField = document.getElementById(field);

                                if (inputField) {
                                    inputField.style.borderColor = "red";
                                    let errorMessage = document.createElement('div');
                                    errorMessage.classList.add('error-message');
                                    errorMessage.innerText = message;
                                    errorMessage.style.color = "red";
                                    errorMessage.style.fontSize = "12px";

                                    inputField.parentElement.appendChild(errorMessage);
                                }
                            });
                        }
                    }
                }
            })
    }

})

function getSubTotal() {
    fetch(`http://localhost:8086/cart/getCart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            let data = await response.json();
            console.log(data);

            let cartIds = JSON.parse(localStorage.getItem('cartIdss'));

            if (cartIds) {
                let total = 0;

                cartIds.forEach(cartId => {
                    let item = data.find(cart => cart.id === cartId);
                    if (item) {
                        total += item.subTotal;
                    }
                });

                document.getElementById('sub-total').textContent = total + " AZN";
                document.getElementById('total').textContent = total + " AZN";

            }


        })
}

getSubTotal()

document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})