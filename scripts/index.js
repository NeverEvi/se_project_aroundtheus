const initialCards = [
  {
    name: "Yosemite Valley",
    link: "../images/yosemite-valley.jpg",
    altText: "A river in Yosemite Valley"
  },
  {
    name: "Lake Louise",
    link: "../images/lake-louise.png",
    altText: "A view of the mountains and Lake Louise"
  },
  {
    name: "Bald Mountains",
    link: "../images/bald-mountains.png",
    altText: "A sunset in the Bald Mountains"
  },
  {
    name: "Latemar",
    link: "../images/latemar.png",
    altText: "The night sky in Latemar"
  },
  {
    name: "Vanoise National Park",
    link: "../images/vanoise-national-park.png",
    altText: "A mountain reflected in the water at Vanoise National Park"
  },
  {
    name: "Lago di Braies",
    link: "../images/lago-di-braies.png",
    altText: "Boats docked in Lago di Braies"
  },
];
const modal = document.querySelector('.modal');
const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.modal__closeButton');
const profileForm = document.querySelector('.modal__form');//
const profileName = document.querySelector('.profile__name');
const profileNameNew = document.querySelector('.input-name');
const profileTitle = document.querySelector('.profile__title');
const profileTitleNew = document.querySelector('.input-title');

function createCard(data) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.content__card').cloneNode(true);
  const cardNameElement = cardElement.querySelector('.content__name');
  const cardImageElement = cardElement.querySelector('.content__image');
  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.altText;
  return cardElement;
}
const cardsContainer = document.querySelector('.content__card-list');
for (let i = 0; i <= initialCards.length - 1; i++) {
  const card = createCard(initialCards[i]); 
  cardsContainer.prepend(card); 
}
function openEditProfile() {
  profileNameNew.value = profileName.textContent;
  profileTitleNew.value = profileTitle.textContent;
  modal.classList.add('modal_opened');
}
function closeEditProfile() {
  modal.classList.remove('modal_opened');
}
function submitEdits(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameNew.value;
  profileTitle.textContent = profileTitleNew.value;
  closeEditProfile();
}
editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closeEditProfile);
profileForm.addEventListener('submit', submitEdits);