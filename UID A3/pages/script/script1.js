const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const overlayTitle = document.getElementById('overlayTitle');
const overlayImage = document.getElementById('overlayImage');
const overlayDescription = document.getElementById('overlayDescription');

document.querySelectorAll('.product').forEach(button => {
    button.addEventListener('click', () => {
        const title = button.dataset.title;
        const desc = button.dataset.desc;
        const img = button.dataset.img;

        overlayTitle.textContent = title;
        overlayDescription.textContent = desc;
        overlayImage.src = img;
        overlayImage.alt = title;

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

//need to add images, prices, remove button, align elements better
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const buyBtn = document.getElementById('buyBtn');

buyBtn.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    addItemToCart('product');
});

closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
});

function addItemToCart(itemName) {
    const cartItems = document.getElementById('cartItems');
    const newItem = document.createElement('div');
    newItem.textContent = itemName;
    cartItems.appendChild(newItem);
}