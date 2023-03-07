export default class Popup {
	constructor(selector) {
		this._popup = selector;
		this._closeButton = this._popup.querySelector(".modal__closeButton");
	}
	open() {
		this._popup.classList.add("modal_opened");
		this.setEventListeners();
	}
	close() {
		this._popup.classList.remove("modal_opened");
		this._popup.removeEventListener("mousedown", this.handleClickOut);
		this._closeButton.removeEventListener("mousedown", this.handleButtonClose);
		document.removeEventListener("keyup", this._handleEscClose);
	}
	_handleEscClose = (event) => {
		if (event.key === "Escape") {
			this.close();
		}
	};
	handleClickOut = (event) => {
		if (event.currentTarget !== event.target) return;
		this.close();
	};

	handleButtonClose = () => {
		this.close();
	};

	setEventListeners() {
		this._closeButton.addEventListener("mousedown", this.handleButtonClose);
		document.addEventListener("keyup", this._handleEscClose);
		this._popup.addEventListener("mousedown", this.handleClickOut);
	}
}
