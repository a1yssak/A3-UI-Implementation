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

function addItemToCart(productData) {
    const cartItems = document.getElementById('cartItems');
    const newItem = document.createElement('div');
    newItem.classList.add('cart-item');

    newItem.innerHTML = `
        <img src="${productData.img}" alt="${productData.name}" class="cart-item-image" />
        <div class="cart-item-details">
            <p class="cart-item-name">${productData.name}</p>
            <p class="cart-item-price">$${productData.price}</p>
        </div>
    `;

    cartItems.appendChild(newItem);
}