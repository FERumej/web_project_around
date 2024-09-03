document.getElementById("openEditModal").addEventListener("click", function () {
  document.getElementById("editModal").style.display = "block";
});

document.querySelectorAll(".close").forEach(function (element) {
  element.addEventListener("click", function () {
    element.closest(".modal").style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("aboutMe").value = "";

    checkInputs();
  });
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

function checkInputs() {
  const nameInput = document.getElementById("name").value;
  const aboutMe = document.getElementById("aboutMe").value;
  const buttonEdit = document.getElementById("buttonEdit");
  const nameStyle = document.getElementById("name");
  const aboutStyle = document.getElementById("aboutMe");

  // Función para ajustar la opacidad
  const setOpacity = (element, value) => {
    element.style.opacity = value ? "1" : "0.2";
  };

  // Ajustar opacidad de los inputs
  setOpacity(nameStyle, nameInput);
  setOpacity(aboutStyle, aboutMe);

  // Ajustar estado del botón
  if (nameInput && aboutMe) {
    buttonEdit.style.backgroundColor = "#000";
    buttonEdit.disabled = false;
  } else {
    buttonEdit.style.backgroundColor = "";
    buttonEdit.disabled = true;
  }
}

// Escuchar eventos en los campos
document.getElementById("name").addEventListener("input", checkInputs);
document.getElementById("aboutMe").addEventListener("input", checkInputs);

document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let nameInput = document.getElementById("name").value;
    let aboutMe = document.getElementById("aboutMe").value;
    console.log("Nombre:", nameInput);
    console.log("Sobre mí:", aboutMe);

    document.getElementById("editModal").style.display = "none";
  });

document.querySelectorAll(".elements__item-footer-button").forEach((button) => {
  button.addEventListener("click", function (event) {
    const likeIcon = event.currentTarget.querySelector(
      ".elements__item-footer-icon"
    );
    if (likeIcon.src.includes("like.svg")) {
      likeIcon.src = "./images/union.svg";
    } else {
      likeIcon.src = "./images/like.svg";
    }
  });
});
