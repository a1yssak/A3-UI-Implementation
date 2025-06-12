/* NAVIGATION MENU */
const navBtn = document.getElementById('navBtn');
const navOverlay = document.getElementById('navOverlay');

navBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
});


