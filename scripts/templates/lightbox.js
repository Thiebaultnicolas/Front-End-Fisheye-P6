/* eslint no-unused-vars: "off" */
/* global Media */
class Lightbox {
  constructor(nbSlides) {
    this.initEvents();
    this.index = 0;
    this.nbSlides = nbSlides;
  }

  /**
   * Initialisation des événements pour la lightbox
   */
  initEvents() {
    const btnPrev = document.querySelector(".btn.prev");
    const btnNext = document.querySelector(".btn.next");
    const carousel = document.querySelector(".carousel");
    const overlay = document.querySelector(".overlay");
    const closeLightboxButton = document.querySelector('.close-lightbox-modal');

    // Rendre les boutons focusables
    btnPrev.setAttribute('tabindex', '0');
    btnNext.setAttribute('tabindex', '0');
    closeLightboxButton.setAttribute('tabindex', '0');

    btnNext.addEventListener("click", () => {
      this.nextSlide();
    });

    btnNext.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.nextSlide();
      }
    });

    btnPrev.addEventListener("click", () => {
      this.prevSlide();
    });

    btnPrev.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.prevSlide();
      }
    });

    overlay.addEventListener("click", () => {
      this.close();
    });

    closeLightboxButton.addEventListener('click', () => this.close());
    closeLightboxButton.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.close();
      }
    });

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

    // Focus trapping
    carousel.addEventListener("keydown", this.trapFocus.bind(this));
  }

  nextSlide() {
    if (this.index == this.nbSlides - 1) {
      this.index = 0;
      this.changeSlide(false);
    } else {
      this.index += 1;
      this.changeSlide(true);
    }
  }

  prevSlide() {
    if (this.index == 0) {
      this.index = this.nbSlides - 1;
      this.changeSlide(false);
    } else {
      this.index -= 1;
      this.changeSlide(true);
    }
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
    this.changeSlide(true);
    sliderContainer.style.opacity = "1";

    // Focus the first focusable element in the carousel
    const firstFocusableElement = carousel.querySelector('[tabindex="0"]');
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
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
  changeSlide(animated = true) {
    const slider = document.querySelector(".slider");
    const slide = document.querySelector(".slide");
    const slideWidth = slide.getBoundingClientRect().width;
    if (animated) {
      slider.style.transition = 'transform 0.5s ease';
    } else {
      slider.style.transition = 'none';
    }
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

  /**
   * Piéger le focus dans la lightbox
   */
  trapFocus(event) {
    const carousel = document.querySelector(".carousel");
    const focusableElements = carousel.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey) { // Tab + Shift moves focus backwards
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else { // Tab moves focus forward
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
}
