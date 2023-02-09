import { openModal } from "./utils.js";
import { previewModal } from "./index.js";

//modal for card previews

const previewImage = document.querySelector(".modal__preview-image");
const previewText = document.querySelector(".modal__preview-text");

class Card {
	constructor(data, selector) {
		this._name = data.name;
		this._link = data.link;
		this._selector = selector;
	}

	_setEventListeners() {
		this.heartButton = this._element.querySelector(".content__heart-button");
		this.heartButton.addEventListener("click", () => this._handleHeartButton());

		this.deleteButton = this._element.querySelector(".content__delete-button");
		this.deleteButton.addEventListener("click", () =>
			this._handleDeleteButton()
		);

		this._element
			.querySelector(".content__image")
			.addEventListener("click", () => this._handleCardImage());
	}
	_handleHeartButton() {
		this.heartButton.classList.toggle("heart-on");
	}
	_handleDeleteButton = () => {
		this._element.remove();
	};
	_handleCardImage() {
		previewImage.src = this._link;
		previewText.textContent = this._name;
		previewImage.alt = `Picture of ${this._name}`;
		openModal(previewModal);
	}

	_getTemplate() {
		const cardElement = document
			.querySelector("#card-template")
			.content.querySelector("#card")
			.cloneNode(true);
		return cardElement;
	}

	initCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector(".content__image");
		this._cardImage.src = this._link;
		this._cardImage.alt = `Picture of ${this._name}`;
		this._element.querySelector(".content__name").textContent = this._name;

		this._setEventListeners();

		return this._element;
	}
}

export default Card;
