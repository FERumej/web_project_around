/* -------------------------------------------------------------------------- */
/*                      Renderizado del contenido inicial                     */
/* -------------------------------------------------------------------------- */

// Datos iniciales
let profileData = {
  name: "Jacques Cousteau",
  description: "Explorador",
};

//Tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createInitialCards(card) {
  const cardElement = document.createElement("card");
  cardElement.classList.add("elements__item");

  cardElement.innerHTML = `
    <img class="elements__img" alt="image grid item" src="${card.link}" />
    <div class="elements__footer">
      <h4>${card.name}</h4>
      <button class="elements__footer-button">
        <img src="./images/like.svg" alt="icono de like" class="elements__footer-icon" id="likeIcon" />
      </button>
    </div>
    <button class="elements__delete-button"><img src="./images/trash.svg" alt="trash icon" class="elements__delete-trash" /></button>
  `;

  // Añadir evento para eliminar la tarjeta
  cardElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  // Añadir evento para abrir el lightbox
  cardElement.querySelector(".elements__img").addEventListener("click", () => {
    openLightbox(card.link);
  });

  return cardElement;
}

//Funcion para renderizar cards
function renderCards() {
  const elementsContainer = document.getElementById("elements");

  initialCards.forEach((card) => {
    const cardElement = createInitialCards(card);
    elementsContainer.appendChild(cardElement);
  });
}

// Llama a la función para renderizar las tarjetas
renderCards();

/* -------------- Finaliza el renderizado del contenido inicial ------------- */

/* -------------------------------------------------------------------------- */
/*                     Funciones para modificar el perfil                     */
/* -------------------------------------------------------------------------- */
// Función para pintar los datos en el HTML
function renderProfile() {
  document.getElementById("profileName").textContent = profileData.name;
  document.getElementById("profileDescription").textContent =
    profileData.description;
}

// Pintar los datos iniciales
renderProfile();

// Función para inicializar los valores del modal
function initializeModal() {
  const nameInput = document.getElementById("name");
  const aboutMeInput = document.getElementById("aboutMe");
  nameInput.value = profileData.name;
  aboutMeInput.value = profileData.description;
  nameInput.style.opacity = "1";
  aboutMeInput.style.opacity = "1";
  checkInputs();
}

// Abrir modal de edición
document.getElementById("openEditModal").addEventListener("click", function () {
  document.getElementById("editModal").style.display = "block";
  initializeModal();
});

// Función para verificar los inputs
function checkInputs() {
  const nameInput = document.getElementById("name").value;
  const aboutMeInput = document.getElementById("aboutMe").value;
  const buttonEdit = document.getElementById("buttonEdit");
  const nameStyle = document.getElementById("name");
  const aboutStyle = document.getElementById("aboutMe");

  // Función para ajustar la opacidad
  const setOpacity = (element, value) => {
    element.style.opacity = value ? "1" : "0.2";
  };

  // Ajustar opacidad de los inputs
  setOpacity(nameStyle, nameInput);
  setOpacity(aboutStyle, aboutMeInput);

  // Ajustar estado del botón
  if (nameInput && aboutMeInput) {
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

// Actualizar datos al enviar el formulario
document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    profileData.name = document.getElementById("name").value;
    profileData.description = document.getElementById("aboutMe").value;
    renderProfile();
    document.getElementById("editModal").style.display = "none";
  });

/* ---------------- Finalizan funciones para modificar el perfil ---------------- */

/* -------------------------------------------------------------------------- */
/*                       Funciones para añadir tarjetas                       */
/* -------------------------------------------------------------------------- */
// Abrir modal de añadir tarjeta
document.getElementById("openAddModal").addEventListener("click", function () {
  document.getElementById("addModal").style.display = "block";
  initializeElementModal();
});

// Función para inicializar los valores del modal
function initializeElementModal() {
  const titleInput = document.getElementById("title");
  const placeimageInput = document.getElementById("placeimage");
  titleInput.style.opacity = "1";
  placeimageInput.style.opacity = "1";
  checkElementsInputs();
}

// Función para validar URL y extensión de imagen
function isValidURL(string) {
  try {
    const url = new URL(string);
    return /\.(jpg|jpeg|png)$/.test(url.pathname);
  } catch (_) {
    return false;
  }
}

// Función para verificar los inputs de Elementos
function checkElementsInputs() {
  const titleInput = document.getElementById("title").value;
  const placeimageInput = document.getElementById("placeimage").value;
  const buttonAdd = document.getElementById("buttonAdd");

  // Ajustar estado del botón
  if (titleInput && isValidURL(placeimageInput)) {
    buttonAdd.style.backgroundColor = "#000";
    buttonAdd.disabled = false;
  } else {
    buttonAdd.style.backgroundColor = "";
    buttonAdd.disabled = true;
  }
}

// Escuchar eventos en los campos de Elementos
document.getElementById("title").addEventListener("input", checkElementsInputs);
document
  .getElementById("placeimage")
  .addEventListener("input", checkElementsInputs);

// Función para crear una tarjeta
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("elements__item");

  cardElement.innerHTML = `
    <img class="elements__img" alt="image grid item" src="${card.link}" />
    <div class="elements__footer">
      <h4>${card.name}</h4>
      <button class="elements__footer-button">
        <img src="./images/like.svg" alt="icono de like" class="elements__footer-icon" />
      </button>
    </div>
    <button class="elements__delete-button">X</button>
  `;

  // Añadir evento para eliminar la tarjeta
  cardElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  // Añadir evento para abrir el lightbox
  cardElement.querySelector(".elements__img").addEventListener("click", () => {
    openLightbox(card.link);
  });

  return cardElement;
}

// Manejar el evento submit del formulario
document
  .getElementById("addCardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title").value;
    const placeimageInput = document.getElementById("placeimage").value;

    const newCard = {
      name: titleInput,
      link: placeimageInput,
    };

    const cardElement = createCard(newCard);
    document.getElementById("elements").appendChild(cardElement);

    // Limpiar el formulario
    document.getElementById("addCardForm").reset();
    checkElementsInputs();

    // Cerrar el modal
    document.getElementById("addModal").style.display = "none";
  });

// Función para abrir el lightbox
function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  lightboxImage.src = imageSrc;
  lightbox.style.display = "flex";
}

// Función para cerrar el lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

// Añadir evento para cerrar el lightbox
document
  .querySelector(".lightbox__close")
  .addEventListener("click", closeLightbox);

/* ---------------- Finalizan funciones para añadir tarjetas ---------------- */

/* -------------------------------------------------------------------------- */
/*                             Funciones en comun                             */
/* -------------------------------------------------------------------------- */
// Cerrar modal al hacer clic en la 'x'
document.querySelectorAll(".close").forEach((span) => {
  span.addEventListener("click", function (event) {
    event.currentTarget.parentElement.parentElement.style.display = "none";
  });
});

document.querySelectorAll(".elements__footer-button").forEach((button) => {
  button.addEventListener("click", function (event) {
    const likeIcon = event.currentTarget.querySelector(
      ".elements__footer-icon"
    );
    if (likeIcon.src.includes("like.svg")) {
      likeIcon.src = "./images/union.svg";
    } else {
      likeIcon.src = "./images/like.svg";
    }
  });
});
/* -------------------------------------------------------------------------- */
