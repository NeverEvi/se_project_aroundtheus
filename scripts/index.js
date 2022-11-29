const initialCards = [{
    name: "Portland (Portland, Maine, USA)",
    link: "./images/portland.png",
  },{
    name: "Floating City (Floating City, Republic of Maldives)",
    link: "./images/floating city.png",
  },{
    name: "Rainbow Mountain (Vinicunca, Peru)",
    link: "./images/vinicunca.png",
  },{
    name: "New York City (New York City, New York, USA)",
    link: "./images/newyork.png",
  },{
    name: "Aokigahara (青木ヶ原、山梨県、日本)",
    link: "./images/aokigahara.png",
  },{
    name: "Berlin (Berlin, Germany)",
    link: "./images/berlin.png",
  },];
const profileModal = document.querySelector('.modal_type_edit');
const profileEditButton = document.querySelector('.profile__edit');
const profileCloseButton = profileModal.querySelector('.modal__closeButton');
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
const previewImage = document.querySelector('.modal__preview-image');

function createCard(cardData) {
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
  });
  deleteButton.addEventListener('click', () => {
    const parent = deleteButton.closest("#card")
    parent.remove()
  });
  cardImage.addEventListener('click', () => {
    previewImage.src= cardData.link;
    const previewText = document.querySelector('.modal__preview-text');
    previewText.textContent = cardData.name;
    openModal(previewModal);
  }); 
  return cardElement;
};

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);
};
function openModal(elem) {
  elem.classList.add('modal_opened');
};
function closeModal(elem) {
  elem.classList.remove('modal_opened'); 
};
function submitEdits(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameNew.value;
  profileTitle.textContent = profileTitleNew.value;
  closeModal(profileModal);
};
function submitCreate(evt) {
  evt.preventDefault();
  closeModal(addModal);
};
function fillProfileForm() {
  profileNameNew.value = profileName.textContent;
  profileTitleNew.value = profileTitle.textContent;
};

profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(profileModal);
}); 
addButton.addEventListener('click', () => {openModal(addModal);}); 
profileCloseButton.addEventListener('click', () => {closeModal(profileModal);});
addCloseButton.addEventListener('click', () => {closeModal(addModal);});
previewCloseButton.addEventListener('click', () => {closeModal(previewModal);});
profileForm.addEventListener('submit', submitEdits);
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  renderCard({name: title,link: link});
  closeModal(addModal);
  addForm.reset()
});

initialCards.forEach(renderCard);