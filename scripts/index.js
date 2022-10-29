let initialCards = [
    object_1 = {
        name: "Yosemite Valley",
        link: "../images/yosemite-valley.jpg"
    },
    object_2 = {
        name: "Lake Louise",
        link: "../images/lake-louise.png"
    },
    object_3 = {
        name: "Bald Mountains",
        link: "../images/bald-mountains.png"
    },
    object_4 = {
        name: "Latemar",
        link: "../images/latemar.jpg"
    },
    object_5 = {
        name: "Vanoise National Park",
        link: "../images/vanoise-national-park.png"
    },
    object_6 = {
        name: "Lago di Braies",
        link: "../images/lago-di-braies.png"
    },
]
let modal = document.querySelector('.modal');
let heart = document.querySelectorAll('.content__heart-button');
let editButton = document.querySelector('.profile__edit')
let closeButton = document.querySelector('.modal__closeButton')

function editProfile() {
    modal.classList.toggle('modal_opened')
}

editButton.addEventListener('click', editProfile)
closeButton.addEventListener('click', editProfile)