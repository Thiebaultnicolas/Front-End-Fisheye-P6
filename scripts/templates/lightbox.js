/* eslint no-unused-vars: "off" */
/* global Media */
class Lightbox {
  constructor(nbSlides) {
    this.initEvents();
    this.index = 0;
    this.nbSlides = nbSlides
  }
  /**
   * Initialisation des événements pour la lightbox
   */
  initEvents() {
    const btnPrev = document.querySelector(".btn.prev");
    const btnNext = document.querySelector(".btn.next");
    const carousel = document.querySelector(".carousel");
    const overlay = document.querySelector(".overlay");
    const closeLightboxButton = document.querySelector('.close-lightbox-modal')

    btnNext.addEventListener("click", () => {
      if (this.index == this.nbSlides - 1) {
        this.index = 0;
      } else {
        this.index += 1;
      }
      this.changeSlide();
    });

    btnPrev.addEventListener("click", () => {
      if (this.index == 0) {
        this.index = this.nbSlides - 1;
      } else {
        this.index -= 1;
      }
      this.changeSlide();
    });

    overlay.addEventListener("click", () => {
      this.close();
    });

    closeLightboxButton.addEventListener('click', () => this.close())

    document.addEventListener("keydown", (event) => {
      if (carousel.style.display === "flex") {
        if (event.key === "ArrowRight") {
          btnNext.click();
        } else if (event.key === "ArrowLeft") {
          btnPrev.click();
        } else if (event.key === "Escape") {
          this.close();
        }
      }
    });
  }
  /**
   * Ouvrir la lightbox à un index spécifique
   * @param {number} index - L'index du slide à afficher
   */
  open(index) {
    const sliderContainer = document.querySelector(".slider-container");
    this.index = index;
    const carousel = document.querySelector(".carousel");
    carousel.style.display = "flex";
    this.changeSlide();
    sliderContainer.style.opacity = "1";
  }
  /**
   * Fermer la lightbox
   */

  close() {
    const carousel = document.querySelector(".carousel");
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.style.opacity = "0";
    carousel.style.display = "none";
  }
  /**
   * Changer le slide affiché
   */
  changeSlide() {
    const slider = document.querySelector(".slider");
    const slide = document.querySelector(".slide");
    const slideWidth = slide.getBoundingClientRect().width;
    slider.style.transform = `translateX(-${this.index * slideWidth}px)`;
  }
  /**
   * Effacer tous les slides
   */

  clearSlides() {
    const slider = document.querySelector(".slider");
    slider.innerHTML = "";
    this.index = 0;
  }
  /**
   * Ajouter un slide à la lightbox
   * @param {Object} media - Les données du média à ajouter
   */
  addSlide(media) {
    const slider = document.querySelector(".slider");
    const slide = document.createElement("li");
    slide.classList.add("slide");

    const m = new Media(media, { controls: true }); // Utilisation de la factory Media
    const img = m.getMediaDOM();

    const title = document.createElement("p");
    title.innerHTML = media.title;

    slide.appendChild(img);
    slide.appendChild(title);
    slider.appendChild(slide);
  }
}