const initialCards = [
  {
    name: "Portland (Portland, Oregon, USA)",
    link: "./images/portland.png",
  },
  {
    name: "Floating City (Floating City, Republic of Maldives)",
    link: "./images/floating city.png",
  },
  {
    name: "Rainbow Mountain (Vinicunca, Peru)",
    link: "./images/vinicunca.png",
  },
  {
    name: "New York City (New York City, New York, USA)",
    link: "./images/newyork.png",
  },
  {
    name: "Aokigahara (青木ヶ原、山梨県、日本)",
    link: "./images/aokigahara.png",
  },
  {
    name: "Berlin (Berlin, Germany)",
    link: "./images/berlin.png",
  },
];
const modal = document.querySelector('.modal_type_edit');

const editButton = document.querySelector('.profile__edit');
const closeButton = modal.querySelector('.modal__closeButton');
const profileForm = document.querySelector('.modal__form');
const profileName = document.querySelector('.profile__name');
const profileNameNew = document.querySelector('.input-name');
const profileTitle = document.querySelector('.profile__title');
const profileTitleNew = document.querySelector('.input-title');

const addModal = document.querySelector('.modal_type_add');
const addButton = document.querySelector('.profile__add');
const addCloseButton = addModal.querySelector('.close-edit');
const addForm = document.querySelector('.add-form');
const addTitle = document.querySelector('.input-addTitle');
const addLink = document.querySelector('.input-addLink');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.content__card-list');

const previewModal = document.querySelector('.modal_type_preview');
const previewCloseButton = previewModal.querySelector('.close-preview');

function renderCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.content__image');
  const cardName = cardElement.querySelector('.content__name');
  
  const heartButton = cardElement.querySelector('.content__heart-button');
  const deleteButton = cardElement.querySelector('.content__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;

  heartButton.addEventListener('click', () => {
    heartButton.classList.toggle('heart-on');
    console.log("HEART");
  });
  deleteButton.addEventListener('click', () => {
    const parent = deleteButton.closest("#card")
    parent.remove()
  });
  cardImage.addEventListener('click', () => {
    const previewImage = document.querySelector('.modal__preview-image');
    previewImage.src= cardData.link;
    previewModal.style = "overflow: visible;"
    const previewText = document.querySelector('.modal__preview-text');
    previewText.textContent = cardData.name;
    const closeButton = document.querySelector('.close-preview')
    

    openModal(previewModal);
  }); 
  cardsContainer.prepend(cardElement);
}

function openModal(elem) {
  elem.classList.add('modal_opened');
  elem.style = "animation: fadeIn 1s;"
};
function closeModal(elem) {
  elem.style = "animation: fadeOut 1s;"
  setTimeout(() => {  elem.classList.remove('modal_opened'); }, 900);
  
};
function submitEdits(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameNew.value;
  profileTitle.textContent = profileTitleNew.value;
  closeModal(modal);
}
function submitCreate(evt) {
  evt.preventDefault();
  closeModal(addModal);
}

editButton.addEventListener('click', () => {
  profileNameNew.value = profileName.textContent;
  profileTitleNew.value = profileTitle.textContent;
  openModal(modal);
}); 
addButton.addEventListener('click', () => {openModal(addModal);}); 

closeButton.addEventListener('click', () => {closeModal(modal);});
addCloseButton.addEventListener('click', () => {closeModal(addModal);});
previewCloseButton.addEventListener('click', () => {closeModal(previewModal);});

profileForm.addEventListener('submit', submitEdits);
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  renderCard({
    name: title,
    link: link
  });
  closeModal(addModal);
});

initialCards.forEach(function (cardData) {
  renderCard(cardData);
});