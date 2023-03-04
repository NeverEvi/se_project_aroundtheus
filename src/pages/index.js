/////////////////////////
///////  IMPORTS  ///////
/////////////////////////

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
	initialCards,
	validationSettings,
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
} from "../components/constants.js";

/////////////////////////////////
///////  rendering cards  ///////
/////////////////////////////////

const cardSection = new Section(
	{
		renderer: (data) => {
			const card = new Card(data, cardElement);
			cardSection.addItem(card.initCard());
		},
	},
	cardListSelector
);
cardSection.renderItems(initialCards);

////////////////////////////////////
///////  card preview popup  ///////
////////////////////////////////////

export const previewModal = new PopupWithImage(previewModalSelector);

////////////////////////////////////
///////  add new card popup  ///////
////////////////////////////////////

const newCardPopup = new PopupWithForm(addModal, (event) => {
	event.preventDefault();
	const card = new Card(
		{
			name: event.target.title.value,
			link: event.target.link.value,
		},
		cardElement
	);
	cardSection.addItem(card.initCard());
	newCardPopup.close();
	addForm.reset();
	addFormValidator.toggleButtonState();
});

/////////////////////////////////
///////  Form Validaton   ///////
/////////////////////////////////

const editFormValidator = new FormValidator(
	validationSettings,
	editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

///////////////////////////////////////
///////  profile editing popup  ///////
///////////////////////////////////////

const profilePopup = new PopupWithForm(profileModal, (event) => {
	event.preventDefault();
	const newUserInfo = {
		name: profileNameNew.value,
		title: profileTitleNew.value,
	};
	userInfo.setUserInfo(newUserInfo);
	profilePopup.close();
});

/////////////////////////////////////
/////////  Profile Info  ////////////
/////////////////////////////////////

const userInfo = new UserInfo(
	profileName.textContent,
	profileTitle.textContent
);

////////////////////////////////////////
///////  button event listeners  ///////
////////////////////////////////////////

profileEditButton.addEventListener("click", () => {
	profileNameNew.value = profileName.textContent;
	profileTitleNew.value = profileTitle.textContent;
	profilePopup.open();
});

addButton.addEventListener("click", () => {
	newCardPopup.open();
});
