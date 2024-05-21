async function draw() {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            throw new Error('User is not authenticated');
        }

        const response = await fetch(`http://localhost:3000/draw/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const draw = data.draw;
        console.log(draw)

        const fetchCard = async () => {
            const response = await fetch("https://hp-api.lainocs.fr/characters");
            return response.json();
        }

        const card = await fetchCard();

        for (let c = 0; c < 5; c++) {
            document.querySelector(".carte").innerHTML += `
                <div class="character-card">
                    <h2 class="name">${card[draw[c]].name}</h2>
                    <img class="characters" src="${card[draw[c]].image}" alt="${card[draw[c]].name}">
                </div>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}

