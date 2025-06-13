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

function addItemToCart(product, saveToStorage = true) {
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

    const removeBtn = item.querySelector('.remove-item');
    removeBtn.addEventListener('click', () => {
        item.remove();
        updateCartTotal();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(p => p.name !== product.name || p.price !== product.price);
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    cartItems.appendChild(item);
    updateCartTotal();

    if (saveToStorage) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
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

//cart saved items 
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

for (let i = 0; i < savedCart.length; i++) {
    addItemToCart(savedCart[i], false);
}
