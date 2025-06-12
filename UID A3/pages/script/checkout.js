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