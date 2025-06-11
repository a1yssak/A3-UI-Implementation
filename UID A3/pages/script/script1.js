const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const overlayTitle = document.getElementById('overlayTitle');
const overlayImage = document.getElementById('overlayImage');
const overlayDescription = document.getElementById('overlayDescription');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const buyBtn = document.getElementById('buyBtn');

/* VIEW PRODUCT OVERLAY */
document.querySelectorAll('.product').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = button.dataset.price;
        const desc = button.dataset.desc;
        const img = button.dataset.img;

        overlayTitle.textContent = name;
        overlayDescription.textContent = desc;
        overlayImage.src = img;
        overlayImage.alt = name;

        buyBtn.dataset.price = price;

        overlay.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

/* CART OVERLAY */
buyBtn.addEventListener('click', () => {
    cartOverlay.classList.add('active');

    const productData = {
        name: overlayTitle.textContent,
        price: buyBtn.dataset.price,
        img: overlayImage.src
    };

    addItemToCart(productData);
});

closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
});

function addItemToCart(product) {
    const cartItems = document.getElementById('cartItems');

    const item = document.createElement('div');
    item.className = 'cart-item';

    item.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-details">
            <p class="cart-item-name">${product.name}</p>
            <p class="cart-item-price" data-price="${product.price}">$${product.price}</p>
        </div>
        <span class="remove-item">x</span>
    `;

    // remove item
    const removeBtn = item.querySelector('.remove-item');
    removeBtn.addEventListener('click', () => {
        item.remove();
        updateCartTotal();
    });

    cartItems.appendChild(item);
    updateCartTotal();

    //where is this info going 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // add the new product
    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
}

//calculate total
function updateCartTotal() {
    let total = 0;
    const prices = document.querySelectorAll('.cart-item-price');

    for (let i = 0; i < prices.length; i++) {
        total += parseFloat(prices[i].dataset.price);
    }

    const totalText = document.getElementById('cartTotal');
    totalText.textContent = 'total: $' + total.toFixed(2);

    localStorage.setItem('cartTotal', total.toFixed(2));
}

const newItem = document.createElement('div');
newItem.classList.add('cart-item');
const img = document.createElement('img');

img.src = productData.img;
img.alt = productData.name;
img.classList.add('cart-item-image');

const details = document.createElement('div');

details.classList.add('cart-item-details');

const name = document.createElement('p');
name.classList.add('cart-item-name');
name.textContent = productData.name;

const price = document.createElement('p');
price.classList.add('cart-item-price');
price.textContent = '$' + productData.price;
price.dataset.price = productData.price;

details.appendChild(name);
details.appendChild(price);

newItem.appendChild(img);
newItem.appendChild(details);

// add to the cart
cartItems.appendChild(newItem);

/* FINAL CHECK OUT */
// get stored data
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const finalCart = document.getElementById('finalCart');
const totalDisplay = document.getElementById('finalTotal');

let total = 0;

for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.className = 'cart-item-image';

    const name = document.createElement('div');
    name.className = 'cart-item-name';
    name.textContent = item.name;

    const price = document.createElement('div');
    price.className = 'cart-item-price';
    price.textContent = '$' + parseFloat(item.price).toFixed(2);

    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);

    finalCart.appendChild(itemDiv);

    total += parseFloat(item.price);
}

totalDisplay.textContent = 'total: $' + total.toFixed(2);