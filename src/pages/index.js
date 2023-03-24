/////////////////////////
///////  IMPORTS  ///////
/////////////////////////

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../utils/Api.js";
import {
	validationSettings,
	cardElement,
	previewModalSelector,
	profileModal,
	addModal,
	profileName,
	profileAbout,
	profilePhoto,
	profilePhotoNew,
	editFormElement,
	addFormElement,
	profileNameNew,
	profileAboutNew,
	profileEditButton,
	profilePhotoEditButton,
	addButton,
	profilePhotoModal,
	deletionModal,
	////////////////////////
	profileEditSubmitButton,
	profilePhotoEditSubmitButton,
	addNewCardSubmitButton,
	deleteCardSubmitButton,
	////////////////////////
	profileEditSubmitButtonText,
	profilePhotoEditSubmitButtonText,
	addNewCardSubmitButtonText,
	deleteCardSubmitButtonText,
} from "../utils/constants.js";
////////////////////////////////////
///////       API            ///////
////////////////////////////////////
const api = new Api({
	baseUrl: "https://around.nomoreparties.co/v1/group-12",
	headers: {
		authorization: "a3e42676-9ad6-4a69-a06d-44c082af0568",
		"Content-Type": "application/json",
	},
});
let userId;

api
	.getAppInfo()
	.then(([userData, cards]) => {
		userInfo.setUserInfo(userData);
		userInfo.setAvatar(userData.avatar);
		userId = userData._id;
		cardSection.renderItems(cards);
	})
	.catch((err) => console.error(err));

////////////////////////////////////
///////  card preview popup  ///////
////////////////////////////////////

export const previewModal = new PopupWithImage(previewModalSelector);

/////////////////////////////////
///////       cards       ///////
/////////////////////////////////

const createCard = (data) => {
	const card = new Card(
		{
			data,
			selector: cardElement,
			template: "#card-template",
			userId,
		},
		() => {
			//click
			previewModal.open({ data });
		},
		() => {
			//heart
			//heart.classList.toggle("heart-on");

			if (card.isLiked()) {
				api
					.removeLike(data._id)
					.then((res) => {
						card.updateLikes(res.likes);
					})
					.catch((err) => console.error(err));
			} else {
				api
					.addLike(data._id)
					.then((res) => {
						card.updateLikes(res.likes);
					})
					.catch((err) => console.error(err));
			}
		},
		(cardId) => {
			//delete
			deleteCardPopup.setAction(() => {
				deleteCardSubmitButton.textContent = "Saving...";
				api
					.removeCard(cardId)
					.then(() => {
						deleteCardPopup.close();
						card.deleteCard();
						deleteCardSubmitButton.textContent = deleteCardSubmitButtonText;
					})
					.catch((err) => {
						console.error(err);
					});
			});
			deleteCardPopup.open();
		}
	);

	return card.initCard();
};
const deleteCardPopup = new PopupWithConfirmation(deletionModal);

const cardSection = new Section(
	{
		renderer: (data) => {
			const newCardElement = createCard(data);
			cardSection.addItem(newCardElement);
		},
	},
	".content__card-list"
);

const newCardPopup = new PopupWithForm(addModal, (values) => {
	addNewCardSubmitButton.textContent = "Saving...";
	api
		.addNewCard(values.name, values.link)
		.then((res) => {
			const newCardElement = createCard(res);
			cardSection.addItem(newCardElement);
			newCardPopup.close();
			addNewCardSubmitButton.textContent = addNewCardSubmitButtonText;
		})
		.catch((err) => {
			console.error(err);
		});
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
	profileEditSubmitButton.textContent = "Saving...";
	api
		.updateProfileInfo(values.name, values.about)
		.then(() => {
			userInfo.setUserInfo(values);
			profilePopup.close();
			profileEditSubmitButton.textContent = profileEditSubmitButtonText;
		})
		.catch((err) => {
			console.error(err);
		});
});
const profilePhotoPopup = new PopupWithForm(profilePhotoModal, (values) => {
	console.log(values.link);
	profilePhotoEditSubmitButton.textContent = "Saving...";
	api
		.updateProfilePhoto(values.link)
		.then(() => {
			userInfo.setAvatar(values.link);
			profilePhotoPopup.close();
			profilePhotoEditSubmitButton.textContent =
				profilePhotoEditSubmitButtonText;
		})
		.catch((err) => {
			console.error(err);
		});
});
/////////////////////////////////////
/////////  Profile Info  ////////////
/////////////////////////////////////

const userInfo = new UserInfo({
	userName: profileName,
	userAbout: profileAbout,
	userAvatar: profilePhoto,
});

////////////////////////////////////////
///////  button event listeners  ///////
////////////////////////////////////////

const openProfileEditor = () => {
	const { name, about } = userInfo.getUserInfo();
	profileNameNew.value = name;
	profileAboutNew.value = about;
	profilePopup.open();
};
const openProfilePhotoEditor = () => {
	const { avatar } = userInfo.getAvatar();
	profilePhotoNew.value = avatar.src;
	profilePhotoPopup.open();
};
profileEditButton.addEventListener("click", openProfileEditor);
profilePhotoEditButton.addEventListener("click", openProfilePhotoEditor);

addButton.addEventListener("click", () => {
	addFormValidator.toggleButtonState();
	newCardPopup.open();
});
