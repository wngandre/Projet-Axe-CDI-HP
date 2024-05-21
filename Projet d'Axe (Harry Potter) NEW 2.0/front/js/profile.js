const userId = localStorage.getItem("userId");

if (userId) {
  fetch(`http://localhost:3000/auth/users/${userId}`)
    .then((response) => response.json())
    .then((userInfo) => {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      const pseudoElement = document.getElementById("pseudo");
      const emailElement = document.getElementById("email");

      pseudoElement.textContent = userInfo.pseudo;
      emailElement.textContent = userInfo.email;
    })
    .catch((error) => console.error("Erreur:", error));
} else {
  console.error("no userID");
}
