let menuHamburger = document.querySelector(".menu-burger")
let navLinks = document.querySelector(".header-center")

menuHamburger.addEventListener('click', function() {
navLinks.classList.toggle('mobile-menu')
})