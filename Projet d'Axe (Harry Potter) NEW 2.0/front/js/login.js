const logIn = async () => {
  let email = document.querySelector('input[name="email"]').value;
  let password = document.querySelector('input[name="password"]').value;

  let response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(data);

  let token = data.token;
  let userId = data.user.id;

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);

  window.location.href = "homePage2.html";
};
