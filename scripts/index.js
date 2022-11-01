let initialCards = [
    object_1 = {
        name: "Yosemite Valley",
        link: "../images/yosemite-valley.jpg",
        altText: "A river in Yosemite Valley"
    },
    object_2 = {
        name: "Lake Louise",
        link: "../images/lake-louise.png",
        altText: "A view of the mountains and Lake Louise"
    },
    object_3 = {
        name: "Bald Mountains",
        link: "../images/bald-mountains.png",
        altText: "A sunset in the Bald Mountains"
    },
    object_4 = {
        name: "Latemar",
        link: "../images/latemar.png",
        altText: "The night sky in Latemar"
    },
    object_5 = {
        name: "Vanoise National Park",
        link: "../images/vanoise-national-park.png",
        altText: "A mountain reflected in the water at Vanoise National Park"
    },
    object_6 = {
        name: "Lago di Braies",
        link: "../images/lago-di-braies.png",
        altText: "Boats docked in Lago di Braies"
    },
];
let modal = document.querySelector('.modal');
let heart = document.querySelectorAll('.content__heart-button');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.modal__closeButton');
let submitButton = document.querySelector('.modal__submission');
let profileName = document.querySelector('.profile__name');
let profileNameNew = document.querySelector('.input-name');
let profileTitle = document.querySelector('.profile__title');
let profileTitleNew = document.querySelector('.input-title');

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

function editProfile() {
    profileNameNew.value = profileName.textContent;
    profileTitleNew.value = profileTitle.textContent;
    modal.classList.toggle('modal_opened');
}
function submitEdits(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameNew.value;
    profileTitle.textContent = profileTitleNew.value;
    modal.classList.toggle('modal_opened');
}


editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', editProfile);
submitButton.addEventListener('click', submitEdits);