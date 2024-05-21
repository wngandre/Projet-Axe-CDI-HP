let accordeons = document.querySelectorAll('.accordeon')

accordeons.forEach(function (accordeon) {
    accordeon.addEventListener('click', function() {
        this.classList.toggle('open')
    })
})