class FormValidator {
	constructor(settings, formElement) {
		this._input = settings.modalInput;
		this._submitButton = settings.modalButton;
		this._inactiveButton = settings.inactiveButton;
		this._inputErrorClass = settings.formTypeError;
		this._errorClass = settings.activateError;

		this._form = formElement;
	}

	_showInputError(formElement, inputElement, errorMessage) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}
	_hideInputError(inputElement) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = "";
	}

	_toggleButtonState(inputList, button) {
		if (this._hasInvalidInput(inputList)) {
			button.classList.add(this._inactiveButton);
			button.disabled = true;
		} else {
			button.disabled = false;
			button.classList.remove(this._inactiveButton);
		}
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_checkInputValidity(formElement, inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(
				formElement,
				inputElement,
				inputElement.validationMessage
			);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_setEventListeners() {
		this._inputList = Array.from(this._form.querySelectorAll(this._input));
		this._submitButton = this._form.querySelector(this._submitButton);

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(this._form, inputElement);
				this._toggleButtonState(this._inputList, this._submitButton);
			});
		});
	}

	enableValidation() {
		this._form.addEventListener("submit", (event) => {
			event.preventDefault();
		});
		this._setEventListeners();
	}
}

export default FormValidator;
