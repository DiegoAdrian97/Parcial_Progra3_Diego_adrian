document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const nameInput = document.getElementById("nombre");
  const loginContainer = document.getElementById("login-container");
  const siteContent = document.getElementById("site-content");
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutButton = document.getElementById("logout-button");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = nameInput.value.trim();

    if (userName) {
      localStorage.setItem("userName", userName);
      welcomeMessage.textContent = `¡Hola, ${userName}!`;
      loginContainer.classList.add("hidden");
      siteContent.classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      alert("Por favor, ingresa tu nombre.");
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("userName");
    siteContent.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    nameInput.value = "";
  });
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    welcomeMessage.textContent = `¡Hola de nuevo, ${storedName}!`;
    loginContainer.classList.add("hidden");
    siteContent.classList.remove("hidden");
  }
});
