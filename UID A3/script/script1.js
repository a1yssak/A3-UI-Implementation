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