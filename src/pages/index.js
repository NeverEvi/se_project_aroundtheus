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
import Api from "../components/Api.js";
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
//api.getAPiInfo().then((res) => {
//	console.log(res);
//});
let userId;

api.getUserInfo().then((res) => {
	userInfo.setUserInfo(res);
	userId = res._id;
});
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
			previewModal.open({ data });
		},
		() => {
			//heart.classList.toggle("heart-on");

			if (card.isLiked()) {
				api.removeLike(data._id).then((res) => {
					card.setLikesInfo(res.likes);
				});
			} else {
				api.addLike(data._id).then((res) => {
					card.setLikesInfo(res.likes);
				});
			}
		},
		(cardId) => {
			deleteCardPopup.setNewInstance(() => {
				api
					.removeCard(cardId)
					.then(() => {
						//console.log("OK");
						deleteCardPopup.close();
						card.deleteCard();
					})
					.catch((err) => {
						console.error(err);
					});
			});
			deleteCardPopup.open();
		}
	);
	if (data.likes) {
		return card.initCard(data.likes.length);
	} else return card.initCard(0);
};
const deleteCardPopup = new PopupWithForm(deletionModal);

const cardSection = new Section(
	{
		renderer: (data) => {
			const newCardElement = createCard(data);
			cardSection.addItem(newCardElement);
		},
	},
	".content__card-list"
);

api
	.getInitialCards()
	.then((res) => {
		cardSection.renderItems(res);
	})
	.catch((err) => {
		console.error(err);
	});

const newCardPopup = new PopupWithForm(addModal, (values) => {
	api
		.addNewCard(values.name, values.link)
		.then((res) => {
			const newCardElement = createCard(res);
			cardSection.addItem(newCardElement);
		})
		.catch((err) => {
			console.error(err);
		});

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
	//userInfo.setUserInfo(values);
	api
		.updateProfileInfo(values.name, values.about)
		.then(userInfo.setUserInfo(values))
		.catch((err) => {
			console.error(err);
		});

	profilePopup.close();
});
const profilePhotoPopup = new PopupWithForm(profilePhotoModal, (values) => {
	api
		.updateProfilePhoto(values.link)
		.then((res) => {
			profilePhoto.src = res.avatar;
		})
		.catch((err) => {
			console.error(err);
		});
	profilePhotoPopup.close();
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
	const { avatar } = userInfo.getUserInfo();
	console.log(avatar);
	profilePhotoNew.value = avatar.src;
	profilePhotoPopup.open();
};
profileEditButton.addEventListener("click", openProfileEditor);
profilePhotoEditButton.addEventListener("click", openProfilePhotoEditor);

addButton.addEventListener("click", () => {
	newCardPopup.open();
});

console.log(api.getUserInfo());
