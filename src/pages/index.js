/////////////////////////
///////  IMPORTS  ///////
/////////////////////////

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
	initialCards,
	validationSettings,
	cardElement,
	previewModalSelector,
	profileModal,
	addModal,
	profileName,
	profileJob,
	editFormElement,
	addFormElement,
	profileNameNew,
	profileJobNew,
	profileEditButton,
	addButton,
} from "../utils/constants.js";

////////////////////////////////////
///////  card preview popup  ///////
////////////////////////////////////

export const previewModal = new PopupWithImage(previewModalSelector);

/////////////////////////////////
///////  rendering cards  ///////
/////////////////////////////////

const createCard = (data) => {
	const card = new Card(
		{ data, selector: cardElement, template: "#card-template" },
		() => {
			previewModal.open({ data });
		}
	);
	return card.initCard();
};

const cardSection = new Section(
	{
		renderer: (data) => {
			const newCardElement = createCard(data);
			cardSection.addItem(newCardElement);
		},
	},
	".content__card-list"
);
cardSection.renderItems(initialCards);

////////////////////////////////////
///////  add new card popup  ///////
////////////////////////////////////

const newCardPopup = new PopupWithForm(addModal, (event) => {
	const newData = newCardPopup._getInputValues();
	const newCardElement = createCard(newData);
	cardSection.addItem(newCardElement);
	newCardPopup.close();
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

const profilePopup = new PopupWithForm(profileModal, (values) => {
	userInfo.setUserInfo(values);
	profilePopup.close();
});

/////////////////////////////////////
/////////  Profile Info  ////////////
/////////////////////////////////////

const userInfo = new UserInfo({ userName: profileName, userJob: profileJob });

////////////////////////////////////////
///////  button event listeners  ///////
////////////////////////////////////////

const openProfileEditor = () => {
	profileNameNew.value = userInfo.getUserInfo().name;
	profileJobNew.value = userInfo.getUserInfo().job;
	profilePopup.open();
};

profileEditButton.addEventListener("click", openProfileEditor);

addButton.addEventListener("click", () => {
	newCardPopup.open();
});
