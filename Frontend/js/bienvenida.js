document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const nameInput = document.getElementById("nombre");
  const loginContainer = document.getElementById("login-container");
  const siteContent = document.getElementById("site-content");
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutButton = document.getElementById("logout-button");
  const btnAdmin = document.getElementById("btn-admin"); // botón "Acceder como admin"
  const campoAdmin = document.getElementById("campo-admin"); // div contenedor
  const inputAdmin = document.getElementById("contraseña"); // input real

  let modoAdmin = false;

  // Mostrar/ocultar campo de contraseña admin
  btnAdmin.addEventListener("click", () => {
    campoAdmin.classList.toggle("visible");
    modoAdmin = !modoAdmin;
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = nameInput.value.trim();
    const adminPass = inputAdmin.value.trim();

    if (modoAdmin) {
      if (adminPass === "admin123") {
        localStorage.setItem("isAdmin", true);
        alert("Acceso concedido como administrador.");
        window.location.href = "admin.html";
        return;
      } else {
        alert("Contraseña de administrador incorrecta.");
        return;
      }
    }

    // Modo usuario normal
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
    localStorage.removeItem("isAdmin");
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
