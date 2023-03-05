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

const cardSection = new Section(
	{
		renderer: (data) => {
			console.log(data);
			const card = new Card(
				{ data, selector: cardElement, template: "#card-template" },
				() => {
					previewModal.open({ data });
				}
			);
			cardSection.addItem(card.initCard());
		},
	},
	".content__card-list"
);
cardSection.renderItems(initialCards);

////////////////////////////////////
///////  add new card popup  ///////
////////////////////////////////////

const newCardPopup = new PopupWithForm(addModal, (event) => {
	event.preventDefault();
	console.log(newCardPopup._getInputValues());
	const newData = newCardPopup._getInputValues();
	const newCard = new Card(
		{
			data: newData,
			selector: cardElement,
			template: "#card-template",
		},
		() => {
			previewModal.open({ data: newData }); // {name: '', link: ''}
		}
	);
	cardSection.addItem(newCard.initCard());
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

const profilePopup = new PopupWithForm(profileModal, (event) => {
	event.preventDefault();
	userInfo.setUserInfo(profilePopup._getInputValues());
	profilePopup.close();
});

/////////////////////////////////////
/////////  Profile Info  ////////////
/////////////////////////////////////

const userInfo = new UserInfo(
	{ userName: profileName.textContent, userJob: profileJob.textContent },
	() => {
		profileName.textContent = userInfo.getUserInfo().name;
		profileJob.textContent = userInfo.getUserInfo().job;
	}
);

////////////////////////////////////////
///////  button event listeners  ///////
////////////////////////////////////////

profileEditButton.addEventListener("click", () => {
	profileNameNew.value = userInfo.getUserInfo().name;
	profileJobNew.value = userInfo.getUserInfo().job;
	profilePopup.open();
});

addButton.addEventListener("click", () => {
	newCardPopup.open();
});
