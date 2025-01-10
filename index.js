/* -------------------------------------------------------------------------- */
/*                      Renderizado del contenido inicial                     */
/* -------------------------------------------------------------------------- */

// Datos iniciales
let profileData = {
  name: "Jacques Cousteau",
  description: "Explorador",
};

// Tarjetas iniciales
let cards = [
  { 
    index: 0,
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  { 
    index: 1,
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    index: 2,
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    index: 3,
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    index: 4,
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    index: 5,
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

let cardIndexCounter = cards.length;

function createCards(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("elements__item");

  const cardImage = document.createElement("img");
  cardImage.classList.add("elements__img");
  cardImage.alt = "image grid item";
  cardImage.src = card.link;

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("elements__footer");

  const cardTitle = document.createElement("h4");
  cardTitle.textContent = card.name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("elements__footer-button");

  const likeIcon = document.createElement("img");
  likeIcon.src = "./images/like.svg";
  likeIcon.alt = "icono de like";
  likeIcon.classList.add("elements__footer-icon");
  likeIcon.id = "likeIcon";

  likeButton.appendChild(likeIcon);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("elements__delete-button");
  deleteButton.setAttribute("data-index", card.index); 

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/trash.svg";
  deleteIcon.alt = "trash icon";
  deleteIcon.classList.add("elements__delete-trash");

  deleteButton.appendChild(deleteIcon);

  cardFooter.appendChild(cardTitle);
  cardFooter.appendChild(likeButton);

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardFooter);
  cardElement.appendChild(deleteButton);

  // Añadir evento para eliminar la tarjeta
  deleteButton.addEventListener("click", (event) => {
    const index = parseInt(event.target.closest("button").getAttribute("data-index"));
    cards = cards.filter(card => card.index !== index); 
    renderCards(); 
  });

  // Añadir evento para abrir el lightbox
  cardImage.addEventListener("click", () => {
    openLightbox(card.link);
  });

  return cardElement;
}
// Función para renderizar cards
function renderCards() {
  const elementsContainer = document.getElementById("elements");


  while (elementsContainer.firstChild) {
    elementsContainer.removeChild(elementsContainer.firstChild);
  }
  
  cards.forEach((card) => {
    const cardElement = createCards(card);
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

document.addEventListener("DOMContentLoaded", function () {
  const maxLength = 50; 
  const profileTextElements = document.querySelectorAll(".profile__text h1, .profile__text p");

  profileTextElements.forEach((element) => {
    if (element.textContent.length > maxLength) {
      element.textContent = element.textContent.slice(0, maxLength) + "...";
    }
  });
});

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
  const addModal = document.getElementById("addModal")
  console.log(addModal)
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


// Manejar el evento submit del formulario
document
  .getElementById("addCardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title").value;
    const placeimageInput = document.getElementById("placeimage").value;

    const newCard = {
      index: cardIndexCounter++,
      name: titleInput,
      link: placeimageInput,
    };

    cards.unshift(newCard); 
    renderCards(); 

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
