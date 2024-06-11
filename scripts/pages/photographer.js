/* global Media, Lightbox, totalLikes */

let maxLikes = 0;
let media = [];
let mediaLiked = [];
let lightbox = null;

/**
 * Fonction pour récupérer les données d'un photographe à partir de son identifiant
 * @param {int} photographerId - L'identifiant du photographe
 * @returns {Promise} - Une promesse qui résout les données du photographe
 */
const fetchPhotographer = async (photographerId) => {
  return fetch("data/photographers.json")
    .then((res) => res.json())
    .then(({ photographers }) =>
      photographers.find((p) => p.id === photographerId)
    );
};

/**
 * Fonction pour récupérer les médias d'un photographe à partir de son identifiant
 * @param {int} photographerId - L'identifiant du photographe
 * @returns {Promise<Array>} - Une promesse qui résout avec une liste de médias
 */
const fetchMedia = async (photographerId) => {
  return fetch("data/photographers.json")
    .then((res) => res.json())
    .then(({ media }) =>
      media.filter((m) => m.photographerId === photographerId)
    );
};

/**
 * Fonction pour afficher les informations d'un photographe
 * @param {Object} photographer - Les données du photographe
 */
const displayPhotographerInfo = (photographer) => {
  const header = document.querySelector(".photograph-header");
  const namePhotographer = document.querySelector("#namePhotographer");

  const name = document.createElement("h2");
  name.textContent = photographer.name;
  namePhotographer.appendChild(name);

  const location = document.createElement("h3");
  location.textContent = `${photographer.city}, ${photographer.country}`;
  namePhotographer.appendChild(location);

  const tagline = document.createElement("p");
  tagline.textContent = photographer.tagline;
  namePhotographer.appendChild(tagline);

  const img = document.createElement("img");
  img.src = `assets/photographers/${photographer.portrait}`;
  img.alt = photographer.name;
  header.appendChild(img);
};

/**
 * Fonction pour afficher la galerie de médias
 * @param {Array} media - Une liste de médias à afficher
 */
const displayGallery = (media) => {
  console.log(lightbox);
  const gallery = document.querySelector("#gallery");
  gallery.innerHTML = "";
  lightbox.clearSlides();
  media.forEach((element, index) => {
    const mediaObj = new Media(element);
    const mediaDOM = mediaObj.getMediaDOM();
    mediaDOM.tabIndex = 0; // Ajout du tabindex pour rendre les médias focusables

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const title = document.createElement("p");
    title.textContent = element.title;
    // Ajout du stopPropagation pour éviter l'ouverture du carrousel lors du clic sur le titre
    title.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche l'événement de se propager au conteneur de média
    });

    const likes = document.createElement("p");
    likes.classList.add("likes");
    likes.innerHTML = `${element.likes}`;
    // Ajout du stopPropagation pour éviter l'ouverture du carrousel lors du clic sur les likes
    likes.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche l'événement de se propager au conteneur de média
    });

    const heartMedia = document.createElement("i");
    heartMedia.classList.add("heart", "fa-heart");
    heartMedia.tabIndex = 0; // Ajout du tabindex pour rendre les cœurs focusables
    if (mediaLiked.includes(element.id)) {
      heartMedia.classList.add("heart-full", "fas");
    } else {
      heartMedia.classList.add("heart-empty", "far");
    }

    mediaContainer.addEventListener("click", () => {
      lightbox.open(index);
    });

    mediaDOM.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        lightbox.open(index);
      }
    });

    heartMedia.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLike(element, heartMedia, likes);
    });

    heartMedia.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        toggleLike(element, heartMedia, likes);
      }
    });

    infoContainer.appendChild(title);
    infoContainer.appendChild(likes);
    infoContainer.appendChild(heartMedia);

    mediaContainer.appendChild(mediaDOM);
    mediaContainer.appendChild(infoContainer);

    gallery.appendChild(mediaContainer);
    lightbox.addSlide(element);
  });
};

/**
 * Fonction pour basculer le like d'un média
 * @param {Object} element - L'objet média
 * @param {HTMLElement} heartMedia - L'élément DOM du cœur
 * @param {HTMLElement} likes - L'élément DOM des likes
 */

const toggleLike = (element, heartMedia, likes) => {
  const isLiked = heartMedia.classList.contains("heart-full");

  // Mettre à jour le nombre de likes
  if (isLiked) {
    maxLikes -= 1;
    element.likes -= 1;
    mediaLiked = mediaLiked.filter((id) => id !== element.id);
  } else {
    maxLikes += 1;
    element.likes += 1;
    mediaLiked.push(element.id);
  }

  // Mettre à jour l'affichage
  likes.innerHTML = `${element.likes}`;
  displayTotalLikes(maxLikes);

  // Basculer la classe du cœur
  heartMedia.classList.toggle("heart-empty", isLiked);
  heartMedia.classList.toggle("heart-full", !isLiked);
  heartMedia.classList.toggle("far", isLiked);
  heartMedia.classList.toggle("fas", !isLiked);
};

/**
 * Fonction pour afficher le nombre total de likes
 * @param {number} totalLikes - Le nombre total de likes
 */
const displayTotalLikes = (totalLikes) => {
  const totalLikesElement = document.getElementById("totalLikes");
  totalLikesElement.textContent = `${totalLikes}`;
};

/**
 * Fonction pour afficher la fenêtre d'informations
 * @param {number} totalLikes - Le nombre total de likes
 * @param {number} pricePerDay - Le prix par jour
 */
const displayInfoWindow = (totalLikes, pricePerDay) => {
  const infoWindow = document.getElementById("infoWindow");
  const totalLikesElement = document.getElementById("totalLikes");
  const pricePerDayElement = document.getElementById("pricePerDay");

  totalLikesElement.textContent = totalLikes;
  pricePerDayElement.textContent = `${pricePerDay}€ / jour`;

  infoWindow.style.display = "block";
};

/**
 * Fonction pour afficher la modal
 */
function displayModal(photographer) {  
  const photographerNameElement = document.createElement("h3");

  photographerNameElement.textContent = photographer.name;

  const testDiv = document.querySelector(".info-form");

  testDiv.appendChild(photographerNameElement);
}


/**
 * Fonction qui permet d'afficher la modal de contact
 */
function showContactModal() {
  const modal = document.getElementById("contact_modal");
  const form = document.querySelector('#contact-form')  
  // Afficher la modal
  modal.style.display = "block";
  form.first_name.focus(); // Focus le premier champs du formulaire
}

/**
 * Fonction permettant de masquer la modale de contact
 */
function hideContactModal() {
  const modal = document.getElementById("contact_modal");
  const contactButton = document.querySelector('.contact_button')
  modal.style.display = "none"; 

  contactButton.focus() //Permet de remettre le focus sur le bouton contact afin de permettre la suite de la navigation
}

/**
 * Fonction pour fermer la modal avec la touche Échap
 * @param {KeyboardEvent} event - L'événement clavier
 */
function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    hideContactModal();
  }
}

/**
 * Initialiser les évènements de la modal de contact
 */
function initEventContactModal() {
  // Ajoutez un écouteur d'événements sur le bouton "Contactez-moi"
  const contactButton = document.querySelector(".contact_button");  
  contactButton.addEventListener("click", showContactModal);


  // Ajouter un écouteur d'événements pour fermer la modal lorsque la touche Échap est pressée
  document.addEventListener("keydown", closeModalOnEscape);

  // Mettre le focus sur le champ "Prénom"
  document.getElementById("first_name").focus();

  // Ajouter un gestionnaire d'événements pour la touche "Entrée" sur la croix de fermeture
  const closeButton = document.querySelector('.close-contact-modal');
  closeButton.addEventListener("click", () => {
      hideContactModal();
  });

  // Au click sur l'overlay, permet de fermer la modale
  const contactOverlay = document.querySelector('.contact-overlay')
  contactOverlay.addEventListener('click', () => {
    hideContactModal()
  })

  const contactForm = document.querySelector("#contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("First Name: ", e.target.first_name.value);
    console.log("Last Name: ", e.target.last_name.value);
    console.log("Email: ", e.target.email.value);
    console.log("Message: ", e.target.message.value);
    contactForm.reset()
    hideContactModal()
  });
}




/**
 * Trier le tableau de media en fonction de la valeur donnée
 * @param {String} value 
 */
const sortMedia = (value) => {
  if (value === "popularity") {
    media.sort((a, b) => b.likes - a.likes);
  } else if (value === "title") {
    media.sort((a, b) => a.title.localeCompare(b.title));
  } else if (value === "date") {
    media.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

/**
 * Fonction permettant d'initialiser les évènements du tri
 */
const initSortEvent = () => {
    // Écouteur d'événements pour le menu déroulant, triant et mettant à jour
  // la galerie en fonction du critère sélectionné (popularité, titre, date).
  document.getElementById("sorting").addEventListener("change", function () {
    sortMedia(this.value);
    displayGallery(media);
  });
}

/**
 * Fonction pour initialiser la page : récupère les médias et les informations du photographe, puis affiche la galerie et les informations
 */

const init = async () => {
  let params = new URL(document.location.toString()).searchParams;
  let id = params.get("id"); // Identifiant que query de la requête

  // On récupère d'abord les infos du photographe
  const photographer = await fetchPhotographer(parseInt(id));
  displayPhotographerInfo(photographer);
  displayModal(photographer)
  initEventContactModal()

  // On récupère les médias du photographe
  media = await fetchMedia(parseInt(id));
  lightbox = new Lightbox(media.length);
  initSortEvent()
  sortMedia("popularity");
  displayGallery(media);

  maxLikes = totalLikes(media);
  displayTotalLikes(maxLikes);
  displayInfoWindow(maxLikes, photographer.price);  
};

/**
 *Appelle la fonction d'initialisation
 */
init();