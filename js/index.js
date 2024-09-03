// Datos iniciales
let profileData = {
    name: "Jacques Cousteau",
    description: "Explorador"
};

// Función para pintar los datos en el HTML
function renderProfile() {
    document.getElementById('profileName').textContent = profileData.name;
    document.getElementById('profileDescription').textContent = profileData.description;
}

// Pintar los datos iniciales
renderProfile();

// Función para inicializar los valores del modal
function initializeModal() {
    const nameInput = document.getElementById('name');
    const aboutMeInput = document.getElementById('aboutMe');
    nameInput.value = profileData.name;
    aboutMeInput.value = profileData.description;
    nameInput.style.opacity = "1";
    aboutMeInput.style.opacity = "1";
    checkInputs();
}

// Abrir modal de edición
document.getElementById('openEditModal').addEventListener('click', function() {
    document.getElementById('editModal').style.display = 'block';
    initializeModal();
});

// Cerrar modal al hacer clic en la 'x'
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('editModal').style.display = 'none';
});

// Función para verificar los inputs
function checkInputs() {
    const nameInput = document.getElementById('name').value;
    const aboutMeInput = document.getElementById('aboutMe').value;
    const buttonEdit = document.getElementById('buttonEdit');
    const nameStyle = document.getElementById('name');
    const aboutStyle = document.getElementById('aboutMe');

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
document.getElementById('name').addEventListener('input', checkInputs);
document.getElementById('aboutMe').addEventListener('input', checkInputs);

// Actualizar datos al enviar el formulario
document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    profileData.name = document.getElementById('name').value;
    profileData.description = document.getElementById('aboutMe').value;
    renderProfile();
    document.getElementById('editModal').style.display = 'none';
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
