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

const previewModalSelector = document.querySelector(".modal_type_preview");

const profileModal = document.querySelector(".modal_type_edit");
const profilePhotoModal = document.querySelector(".modal_type_edit-photo");
const deletionModal = document.querySelector(".modal_type_delete");
const addModal = document.querySelector(".modal_type_add");

const addForm = document.querySelector(".add-form");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__title");
const profilePhoto = document.querySelector(".profile__avatar");

const editFormElement = profileModal.querySelector(".form");
const addFormElement = addModal.querySelector(".add-form");

const profileNameNew = document.querySelector(".input-name");
const profileAboutNew = document.querySelector(".input-title");
const profilePhotoNew = document.querySelector(".input-photo");

const profileEditButton = document.querySelector(".profile__edit");
const profilePhotoEditButton = document.querySelector(".profile__avatar-edit");
const addButton = document.querySelector(".profile__add");

const profileEditSubmitButton = profileModal.querySelector(".form__submission");
const profilePhotoEditSubmitButton =
	profilePhotoModal.querySelector(".form__submission");
const addNewCardSubmitButton = addModal.querySelector(".form__submission");
const deleteCardSubmitButton = deletionModal.querySelector(".form__submission");

const profileEditSubmitButtonText = profileEditSubmitButton.textContent;
const profilePhotoEditSubmitButtonText =
	profilePhotoEditSubmitButton.textContent;
const addNewCardSubmitButtonText = addNewCardSubmitButton.textContent;
const deleteCardSubmitButtonText = deleteCardSubmitButton.textContent;

export {
	validationSettings,
	cardElement,
	previewModalSelector,
	profileModal,
	addModal,
	profileName,
	profileAbout,
	profilePhoto,
	profilePhotoNew,
	addForm,
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
};
