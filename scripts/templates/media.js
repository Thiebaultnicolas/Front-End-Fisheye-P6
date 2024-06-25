/* eslint no-unused-vars: "off" */
class Media {
  /**
   * Constructeur de la classe Media
   * @param {Object} mediaObject - Les données du média
   * @param {Object} options - Les options pour le média
   */
  constructor(mediaObject, options) {
    if (mediaObject.image) {
      this.media = new MediaImage(mediaObject, options);
    } else {
      this.media = new MediaVideo(mediaObject, options);
    }
  }
  /**
   * Méthode pour obtenir l'élément DOM du média
   * @returns {HTMLElement} - L'élément DOM du média 
   */
  getMediaDOM() {
    return this.media.getMediaDOM();
  }
}

class MediaImage {
  /**
   * Constructeur de la classe MediaImage
   * @param {Object} media - Les données du média
   * @param {Object} options - Les options pour le média
   */
  constructor(media, options) {
    this.media = media;
    this.options = options;
  }
  /**
   * Méthode pour obtenir l'élément DOM de l'image
   * @returns {HTMLElement} - L'élément DOM de l'image
   */
  getMediaDOM() {
    const image = document.createElement("img");
    image.setAttribute('alt', this.media.title)
    image.setAttribute(
      "src",
      `assets/media/${this.media.photographerId}/${this.media.image}`
    );

    return image;
  }
}

class MediaVideo {
  /**
   * Constructeur de la classe MediaVideo
   * @param {Object} media - Les données du média
   * @param {Object} options - Les options pour le média
   */
  constructor(media, options) {
    this.media = media;
    this.options = options;
  }
  /**
   * Méthode pour obtenir l'élément DOM de la vidéo
   * @returns {HTMLElement} - L'élément DOM de la vidéo
   */
  getMediaDOM() {
    const video = document.createElement("video");
    const src = document.createElement("source");
    if (this.options && this.options.controls) {
      video.setAttribute("controls", "");
    }
    src.setAttribute(
      "src",
      `assets/media/${this.media.photographerId}/${this.media.video}`
    );
    video.appendChild(src);

    return video;
  }
}