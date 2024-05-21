document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  function fetchCharacter(slug) {
    fetch(`https://hp-api.lainocs.fr/characters/${encodeURIComponent(slug)}`)
      .then((response) => response.json())
      .then((data) => displayCharacter(data))
      .catch((error) => console.log(error));
  }

  function displayCharacter(character) {
    document.querySelector("#name").textContent = character.name;
    document.querySelector("#image").src = character.image;
    document.querySelector("#eyes").textContent = character.eyes;
    document.querySelector("#birthday").textContent = character.birthday;
    document.querySelector("#blood").textContent = character.blood;
    document.querySelector("#house").textContent = character.house;
  }

  fetchCharacter(slug);

  fetch(`https://hp-api.lainocs.fr/characters/${encodeURIComponent(slug)}`)
    .then((response) => response.json())
    .then((character) => {
      fetch("http://172.20.10.3:3000/maisons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ house: character.house }),
      });
    })
    .catch((error) => console.log(error));
});
