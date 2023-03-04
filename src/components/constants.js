import portland from "../images/portland.png";
import floatingCity from "../images/floating city.png";
import vinicunca from "../images/vinicunca.png";
import newYork from "../images/newyork.png";
import aokigahara from "../images/aokigahara.png";
import berlin from "../images/berlin.png";

const initialCards = [
	{
		name: "Portland (Portland, Maine, USA)",
		link: portland,
	},
	{
		name: "Floating City (Floating City, Republic of Maldives)",
		link: floatingCity,
	},
	{
		name: "Rainbow Mountain (Vinicunca, Peru)",
		link: vinicunca,
	},
	{
		name: "New York City (New York City, New York, USA)",
		link: newYork,
	},
	{
		name: "Aokigahara (青木ヶ原、山梨県、日本)",
		link: aokigahara,
	},
	{
		name: "Berlin (Berlin, Germany)",
		link: berlin,
	},
];

const validationSettings = {
	modalInput: ".form__input",
	invalidInput: "form__input-invalid",
	activateError: "form__input-error_active",
	formTypeError: "form__input_type_error",
	inactiveButton: "button_inactive",
	modalInput: ".form__input",
	modalButton: ".form__submission",
};

const cardElement = document
	.querySelector("#card-template")
	.content.querySelector("#card")
	.cloneNode(true);

const cardListSelector = ".content__card-list";
const previewModalSelector = document.querySelector(".modal_type_preview");

const profileModal = document.querySelector(".modal_type_edit");

const addModal = document.querySelector(".modal_type_add");
const addForm = document.querySelector(".add-form");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const editFormElement = profileModal.querySelector(".form");
const addFormElement = addModal.querySelector(".add-form");

const profileNameNew = document.querySelector(".input-name");
const profileTitleNew = document.querySelector(".input-title");

const profileEditButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");

export {
	validationSettings,
	initialCards,
	cardElement,
	cardListSelector,
	previewModalSelector,
	profileModal,
	addModal,
	profileName,
	profileTitle,
	addForm,
	editFormElement,
	addFormElement,
	profileNameNew,
	profileTitleNew,
	profileEditButton,
	addButton,
};
