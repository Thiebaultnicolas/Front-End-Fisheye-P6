/**
 * Fonction pour calculer le nombre total de likes
 * @param {Array} media - Une liste de médias
 * @returns {number} - Le nombre total de likes
 */
const totalLikes = (media) => {
  let total = 0;
  media.forEach((element) => {
    total += element.likes;
  });
  return total;
};