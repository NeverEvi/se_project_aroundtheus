import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closeModal, openModal } from "./utils.js";

const initialCards = [
	{
		name: "Portland (Portland, Maine, USA)",
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

const cardsContainer = document.querySelector(".content__card-list");
const cardTemplate = document.querySelector("#card-template").content;

//modal for profile editing
const profileModal = document.querySelector(".modal_type_edit");
const profileEditButton = document.querySelector(".profile__edit");
const profileCloseButton = profileModal.querySelector(".modal__closeButton");
const profileForm = document.querySelector(".form");
const profileName = document.querySelector(".profile__name");
const profileNameNew = document.querySelector(".input-name");
const profileTitle = document.querySelector(".profile__title");
const profileTitleNew = document.querySelector(".input-title");

//modal for adding cards
const addModal = document.querySelector(".modal_type_add");
const addButton = document.querySelector(".profile__add");
const addCloseButton = addModal.querySelector(".close-edit");
const addForm = document.querySelector(".add-form");

//Validaton
const validationSettings = {
	modalInput: ".form__input",
	invalidInput: "form__input-invalid",
	activateError: "form__input-error_active",
	formTypeError: "form__input_type_error",
	inactiveButton: "button_inactive",
	modalInput: ".form__input",
	modalButton: ".form__submission",
};
const editFormElement = profileModal.querySelector(".form");
const addFormElement = addModal.querySelector(".add-form");

const editFormValidator = new FormValidator(
	validationSettings,
	editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
///

const renderCard = (data, wrap) => {
	const card = new Card(data, wrap);
	cardsContainer.prepend(card.initCard());
};

const submitEdits = (evt) => {
	evt.preventDefault();
	profileName.textContent = profileNameNew.value;
	profileTitle.textContent = profileTitleNew.value;
	closeModal(profileModal);
};
const submitCreate = (event) => {
	event.preventDefault();
	renderCard({
		name: event.target.title.value,
		link: event.target.link.value,
	}),
		cardTemplate;
	closeModal(addModal);
	addForm.reset();
};

function fillProfileForm() {
	profileNameNew.value = profileName.textContent;
	profileTitleNew.value = profileTitle.textContent;
}

profileEditButton.addEventListener("click", () => {
	fillProfileForm();
	openModal(profileModal);
});
addButton.addEventListener("click", () => {
	openModal(addModal);
});
profileCloseButton.addEventListener("click", () => {
	closeModal(profileModal);
});
addCloseButton.addEventListener("click", () => {
	closeModal(addModal);
});

profileForm.addEventListener("submit", submitEdits);
addForm.addEventListener("submit", submitCreate);

initialCards.forEach((data) => {
	renderCard(data, cardsContainer);
});
