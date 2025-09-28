
function showProducts(){

    const token = localStorage.getItem('token');

    fetch('http://localhost:8086/products/all', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            data.products.forEach(element => {

                let cardsDiv = document.querySelector('.cards');

                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.setAttribute('data-id',element.id);
                
                let imgDiv = document.createElement('div');

                let image = document.createElement('img');
                image.src = element.image;

                let h5 = document.createElement('h5');
                h5.textContent = element.name;

                let p = document.createElement('p');
                p.textContent = element.price + " AZN";

                let addToCardBtn = document.createElement('button');
                addToCardBtn.textContent = 'add to card';
                addToCardBtn.setAttribute('data-id', element.id);

                addToCardBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let productId = addToCardBtn.getAttribute('data-id');
                    console.log(productId);

                    addToCart(productId);
                    
                })

                addToCardBtn.style.backgroundColor = 'black';
                addToCardBtn.style.color = 'white';
                addToCardBtn.style.border = 'none';
                addToCardBtn.style.width = '100%';
                addToCardBtn.style.padding = '4px';
                addToCardBtn.style.cursor = 'pointer';

        

                imgDiv.append(image);
                cardDiv.append(imgDiv);
                cardDiv.append(h5);
                cardDiv.append(p);
                cardDiv.append(addToCardBtn);

                cardsDiv.append(cardDiv);
            });
        }
    })
}

showProducts();

function searchProduct(){
    const token = localStorage.getItem('token');

    const query = document.getElementById('searchInput').value;

    fetch(`http://localhost:8086/products/search?query=${query}`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        let data = await response.json();
        console.log(data);

        let cards = document.querySelector('.cards');
        cards.innerHTML = '';
        
        data.forEach(element => {

                let cardsDiv = document.querySelector('.cards');

                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                
                let imgDiv = document.createElement('div');

                let image = document.createElement('img');
                image.src = element.image;

                let h5 = document.createElement('h5');
                h5.textContent = element.name;

                let p = document.createElement('p');
                p.textContent = element.price + " AZN";

                let addToCardBtn = document.createElement('button');
                addToCardBtn.textContent = 'add to card';
                addToCardBtn.style.backgroundColor = 'black';
                addToCardBtn.style.color = 'white';
                addToCardBtn.style.border = 'none';
                addToCardBtn.style.width = '100%';
                addToCardBtn.style.padding = '4px';
                addToCardBtn.style.cursor = 'pointer';

        

                imgDiv.append(image);
                cardDiv.append(imgDiv);
                cardDiv.append(h5);
                cardDiv.append(p);
                cardDiv.append(addToCardBtn);

                cardsDiv.append(cardDiv);
            });
    })
}

function sortProducts(){

    const token = localStorage.getItem('token');

    let sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', () => {
        let sortValue = document.getElementById('sortSelect').value;

        fetch(`http://localhost:8086/products/sort?sort=${sortValue}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(async response => {
            let data = await response.json();
            console.log(data);

            let cards = document.querySelector('.cards');
            cards.innerHTML = '';

            data.forEach(element => {

                let cardsDiv = document.querySelector('.cards');

                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                
                let imgDiv = document.createElement('div');

                let image = document.createElement('img');
                image.src = element.image;

                let h5 = document.createElement('h5');
                h5.textContent = element.name;

                let p = document.createElement('p');
                p.textContent = element.price + " AZN";

                let addToCardBtn = document.createElement('button');
                addToCardBtn.textContent = 'add to card';
                addToCardBtn.style.backgroundColor = 'black';
                addToCardBtn.style.color = 'white';
                addToCardBtn.style.border = 'none';
                addToCardBtn.style.width = '100%';
                addToCardBtn.style.padding = '4px';
                addToCardBtn.style.cursor = 'pointer';

        
                imgDiv.append(image);
                cardDiv.append(imgDiv);
                cardDiv.append(h5);
                cardDiv.append(p);
                cardDiv.append(addToCardBtn);

                cardsDiv.append(cardDiv);
            });
                        
        })
    })
}

sortProducts();

document.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        let productId = e.target.closest('.card').getAttribute('data-id');
        console.log(productId);
        
        window.location.href = `productDetail.html?id=${productId}`;
    }
})

function addToCart(productId){

    const token = localStorage.getItem('token');

    const cart = {
        productId: productId
    }

    fetch(`http://localhost:8086/cart/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(async response => {
        let message = await response.text();
        alert(message);
    })
}

document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
})