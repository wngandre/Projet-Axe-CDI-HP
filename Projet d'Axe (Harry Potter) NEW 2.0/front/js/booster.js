let button = document.getElementById('openBooster');

button.addEventListener('click', function() {
    button.disabled = true;

    let endTime = new Date().getTime() + 86400000; // 24 heures

    // Commencez le compte à rebours
    let interval = setInterval(function() {
        let now = new Date().getTime();
        let distance = endTime - now;

        // Calcul des heures, minutes et secondes
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mettez à jour le texte du bouton
        button.innerText = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(interval);
            button.disabled = false;
            button.innerText = "Déballer";
        }
    });
});