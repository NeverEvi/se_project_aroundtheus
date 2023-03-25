import Popup from "./Popup.js"; //bring Popup parent class

export default class PopupWithConfirmation extends Popup {
	//create child class
	constructor(selector) {
		//give it an object with the Selector (to find it) and the function to handle
		super(selector);
		this._popupForm = this._popup.querySelector(".form"); //define the form itself
		this._submitButton = this._popup.querySelector(".form__submission");
		this._buttonText = this._submitButton.textContent;
	}
	showLoading() {
		this._submitButton.textContent = "Saving...";
	}
	hideLoading() {
		this._submitButton.textContent = this._buttonText;
	}
	setAction(callback) {
		this._handleFormSubmit = callback;
	}
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener("submit", this._handleSubmit);
	}
	_handleSubmit = (event) => {
		event.preventDefault();
		this._handleFormSubmit();
	};
}
