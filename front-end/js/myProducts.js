
function loadOnProducts() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8086/products/getAll', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(async response => {
            if (response.ok) {
                let data = await response.json();
                console.log(data);

                let products_tbody = document.getElementById("products-tbody");

                let tableContent = '';
                data.products.forEach(element => {
                    tableContent += `
                <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.price} AZN</td>
                <td>
                    <img src="${element.image}" style="width: 100px"; height: 80px; object-fit:cover; />
                </td>
                <td><button type="button" class="btn btn-primary edit-btn" data-id="${element.id}">Edit</td>
                <td><button type="button" class="btn btn-danger delete-btn" data-id="${element.id}">Delete</td>
                </tr>
                
                `
                })

                products_tbody.innerHTML += tableContent;
            }
        })
}

loadOnProducts();

let newProductButton = document.querySelector(".sub-main button");

newProductButton.addEventListener('click', (e) => {
    window.location.href = "products.html";
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const productId = e.target.getAttribute('data-id');
        console.log(productId);

        window.location.href = `products.html?id=${productId}`;
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.getAttribute('data-id');
        console.log(productId);

        const token = localStorage.getItem('token');

        if (confirm('Silmek istediyinize eminsinizmi?')) {
            fetch(`http://localhost:8086/products/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Product delete successfully');
                    e.target.closest('tr').remove();
                }
            })
        }

    }
})

document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})