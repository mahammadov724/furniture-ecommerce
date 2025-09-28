function loadOnTable() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8086/cart/getCart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            let data = await response.json();
            console.log(data);

            let tableContent = '';

            let total = 0;

            data.forEach(cart => {
                total += cart.subTotal;
                tableContent += `
                <tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${cart.product.image}" style="width:80px; height:70px;object-fit:cover;"/ >
                            ${cart.product.name}
                        </div>
                    </td>
                     <td>
                        <div style="display:flex; justify-content:center;">
                          ${cart.product.price} AZN
                        </div>
                    </td>
                     <td>
                        <div style="display:flex; justify-content:center;">
                          <input type="number" min="1" value="${cart.quantity}" class="quantity-input" data-cart-id="${cart.id}" style="width: 50px;">
                        </div>
                    </td>
                     <td>
                        <div style="display:flex; justify-content:center;">
                          ${cart.subTotal} AZN
                        </div>
                    </td>
                    <td>
                        <div>
                            <img src="./image/bin.png" class="delete-btn" data-id="${cart.id}" style="width:25px; height:25px; object-fir:cover; cursor:pointer;" />
                        </div>
                    </td>
                </tr>
            `
            });

            document.getElementById('tbody').innerHTML = tableContent;
            document.querySelector('.subtotal p').textContent = total;
            document.querySelector('.total p').textContent = total;

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    let newQuantity = e.target.value;
                    let cartId = e.target.getAttribute('data-cart-id');

                    const cart = {
                        id: cartId,
                        quantity: newQuantity
                    }

                    fetch(`http://localhost:8086/cart/update`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cart)
                    })
                        .then(msj => {
                            loadOnTable();
                        })
                })
            })

        })
}

loadOnTable();

function deleteFromCart() {

    const token = localStorage.getItem('token');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            let cartId = e.target.getAttribute('data-id');

            if (confirm("Are you sure?")) {

                fetch(`http://localhost:8086/cart/delete/${cartId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(resp => {
                        e.target.closest("tr").remove();
                        loadOnTable();
                    })
            }
        }
    })
}

deleteFromCart();

document.querySelector(".btn button").addEventListener('click', () => {

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8086/cart/getCart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        let data = await response.json();
        
        let cartIds = data.map(cart => cart.id);
        console.log(cartIds);
       
        localStorage.setItem('cartIdss', JSON.stringify(cartIds));
        window.location.href = "checkout.html";
    })
})

document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})