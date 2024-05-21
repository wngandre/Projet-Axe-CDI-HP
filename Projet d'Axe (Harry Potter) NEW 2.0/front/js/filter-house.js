document.getElementById("houseFilter").addEventListener("change", function (e) {
  var house = e.target.value;
  fetchCards(house);
});

function fetchCards(hp) {
  fetch("https://hp-api.lainocs.fr/characters")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(hp);
      if (hp !== "all") {
        data = data.filter((characters) => characters.house === hp);
      }
      console.log(data);
      displayCards(data);
    })
    .catch((error) => console.log(error));
}

function displayCards(cards) {
  let cardContainer = document.getElementById("characters");
  cardContainer.innerHTML = "";
  cards.forEach(function (card) {
    let cardElement = document.createElement("div");
    cardElement.classList.add("character-card");
    let cardLink = document.createElement("a");
    cardLink.href =
    "single-hp.html?slug=" +
    encodeURIComponent(card.slug) +
    "&image=" +
    encodeURIComponent(card.image);
    let cardImage = document.createElement("img");
    cardImage.classList.add("characters");
    cardImage.src = card.image;
    cardLink.appendChild(cardImage);

    let cardName = document.createElement("h2");
    cardName.classList.add("character-name");

    cardName.textContent = card.name;
    cardLink.appendChild(cardName);
    cardElement.appendChild(cardLink);
    cardContainer.appendChild(cardElement);
  });
}