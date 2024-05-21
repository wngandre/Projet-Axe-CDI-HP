function fetchCharacter() {
    let url = window.location.search
    let slug = new URLSearchParams(url).get('slug')
    return fetch('https://hp-api.lainocs.fr/characters/' + slug)
        .then((response) => response.json())
}

async function displayCharacter() {
    const data = await fetchCharacter()
    document.querySelector('#character').innerHTML = `
        <h1 class="name">${data.name}</h1>
        <img class="characters" src="${data.image}" alt="${data.name}">
        <p class="desc-character">Eyes : ${data.eyes}</p>
        <p class="desc-character">Hairs : ${data.hairs}</p>
        <p class="desc-character">${data.birthday}</p>
        <p class="desc-character">Patronus : ${data.patronus}</p>
        <p class="desc-character">Role : ${data.role}</p>
        <p class="desc-character">House : ${data.house}</p>
        <p class="desc-character">Actor : ${data.actor}</p>
        <a class="back-btn" href="hp.html">Back</a>
    `
}

displayCharacter()