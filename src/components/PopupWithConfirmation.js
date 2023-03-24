import Popup from "./Popup.js"; //bring Popup parent class

export default class PopupWithConfirmation extends Popup {
	//create child class
	constructor(selector) {
		//give it an object with the Selector (to find it) and the function to handle
		super(selector);
		this._popupForm = this._popup.querySelector(".form"); //define the form itself
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
}
