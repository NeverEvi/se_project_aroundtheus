import Popup from "./Popup.js"; //bring Popup parent class

export default class PopupWithImage extends Popup {
	constructor(selector) {
		super(selector);
		this._image = document.querySelector(".modal__preview-image");
		this._text = document.querySelector(".modal__preview-text");
	}
	open({ data }) {
		this._image.src = data.link;
		this._text.textContent = data.name;
		this._image.alt = `Picture of ${data.name}`;
		super.open();
	}
}
