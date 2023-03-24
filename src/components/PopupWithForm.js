import Popup from "./Popup.js"; //bring Popup parent class

export default class PopupWithForm extends Popup {
	//create child class
	constructor(selector, handleFormSubmit) {
		//give it an object with the Selector (to find it) and the function to handle
		super(selector);
		this._popupForm = this._popup.querySelector(".form"); //define the form itself
		this._handleFormSubmit = handleFormSubmit; //define which method to use
	}
	setNewInstance(callback) {
		this._handleFormSubmit = callback;
	}
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener("submit", this._handleSubmit);
	}
	_handleSubmit = (event) => {
		event.preventDefault();
		if (this.data) {
			return this._handleFormSubmit(this.data);
		}
		const inputValues = this._getInputValues();
		this._handleFormSubmit(inputValues);
	};
	_getInputValues() {
		//return values for the form's input fields
		const inputs = this._popupForm.querySelectorAll(".form__input"); //collect all of the input fields
		const inputValues = {}; //create an empty object to hold the input fields' values
		inputs.forEach((input) => {
			//loop through the inputs
			inputValues[input.name] = input.value;
		});
		return inputValues; //give the list object
	}
	close() {
		if (this._popupForm) {
			this._popupForm.reset();
		}
		super.close();
	}
}
