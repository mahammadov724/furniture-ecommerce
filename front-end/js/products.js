function addProduct() {
    const token = localStorage.getItem('token');

    const productForm = document.querySelector('form');

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            image: document.getElementById('product-image').value
        }

        const productId = localStorage.getItem('productId');
        // localStorage.removeItem('productId');

        if (productId) {
            updateProduct(product,productId);
        } else {
            fetch('http://localhost:8086/products/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(response => {
                    if (response.ok) {
                        alert('Product added successfully');
                        document.getElementById('product-name').value = '';
                        document.getElementById('product-price').value = '';
                        document.getElementById('product-image').value = '';
                    }
                })
        }
    })
}

addProduct();

function editProduct() {
    const token = localStorage.getItem('token');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        localStorage.setItem('productId', productId);

        fetch(`http://localhost:8086/products/getById/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async response => {
                if (response.ok) {
                    const object = await response.json();
                    console.log(object);
                    document.getElementById('product-name').value = object.name;
                    document.getElementById('product-price').value = object.price;
                    document.getElementById('product-image').value = object.image;
                }
            })
    }

}

editProduct();

function updateProduct(product,productId) {

    const token = localStorage.getItem('token');

    const productForm = document.querySelector('form');

    // const productId = localStorage.getItem('productId');

    // const product = {
    //     id: productId,
    //     name: document.getElementById('product-name').value,
    //     price: document.getElementById('product-price').value,
    //     image: document.getElementById('product-image').value
    // }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch('http://localhost:8086/products/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:productId,
                name: product.name,
                price: product.price,
                image: product.image
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('product update successfully');
                    localStorage.removeItem('productId');
                    window.location.href = "myProducts.html";
                }
            })
    })
}

const myProductsBtn = document.querySelector('.my-products');

myProductsBtn.addEventListener('click', () => {
    window.location.href = "myProducts.html";
})


document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})