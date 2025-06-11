const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const overlayTitle = document.getElementById('overlayTitle');
const overlayImage = document.getElementById('overlayImage');
const overlayDescription = document.getElementById('overlayDescription');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const buyBtn = document.getElementById('buyBtn');

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
        <span class="remove-item">✕</span>
    `;

    // remove item
    const removeBtn = item.querySelector('.remove-item');
    removeBtn.addEventListener('click', () => {
        item.remove();
        updateCartTotal();
    });

    cartItems.appendChild(item);
    updateCartTotal();
}

//calculate total
function updateCartTotal() {
    let total = 0;
    let prices = document.querySelectorAll('.cart-item-price');

    for (let i = 0; i < prices.length; i++) {
        let price = parseFloat(prices[i].dataset.price);
        total = total + price;
    }

    let totalText = document.getElementById('cartTotal');
    totalText.textContent = 'total: $' + total.toFixed(2);
}


const newItem = document.createElement('div');
newItem.classList.add('cart-item');

// image
const img = document.createElement('img');
img.src = productData.img;
img.alt = productData.name;
img.classList.add('cart-item-image');

// details container
const details = document.createElement('div');
details.classList.add('cart-item-details');

// name and price
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