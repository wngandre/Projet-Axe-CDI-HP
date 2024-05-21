// Fonction si la page s'actualise
window.onload = function() {
    let inputEmail = document.getElementById('email');
    if(localStorage.getItem('email')) {     // Si 'email' est stockée dans le localStorage, la mettre dans l'input
        inputEmail.value = localStorage.getItem('email');
    }
    
    // Lorsque l'input change, mettre à jour la valeur dans le localStorage
    inputEmail.onchange = function() {
        localStorage.setItem('email', inputEmail.value);
    }
}