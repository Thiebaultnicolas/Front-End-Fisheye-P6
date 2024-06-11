/* global photographerTemplate */
/**
 * Fonction qui permet de récupérer la liste des photographes
 * @returns {Promise}
 */
async function getPhotographers() {
  return fetch("data/photographers.json").then((res) => res.json());
}

/**
 * Fonction qui permet d'afficher les données des photographes
 * @param {Array} photographers - La liste des photographes
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    const locationParagraph = document.createElement("h4");
    locationParagraph.textContent = `${photographer.city}, ${photographer.country}`;
    userCardDOM.appendChild(locationParagraph);

    const taglineParagraph = document.createElement("p");
    taglineParagraph.textContent = photographer.tagline;
    taglineParagraph.classList.add("p1");
    userCardDOM.appendChild(taglineParagraph);

    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `Price: ${photographer.price} €`;
    priceParagraph.classList.add("p2");
    userCardDOM.appendChild(priceParagraph);

    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Fonction d'initialisation
 */

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();