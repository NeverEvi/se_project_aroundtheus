import { previewModal } from "../pages/index.js";

class Card {
	constructor(data, selector) {
		this._name = data.name;
		this._link = data.link;
		this._selector = selector;
	}

	_setEventListeners(data) {
		this.heartButton = this._element.querySelector(".content__heart-button");
		this.heartButton.addEventListener("click", () => this._handleHeartButton());

		this.deleteButton = this._element.querySelector(".content__delete-button");
		this.deleteButton.addEventListener("click", () =>
			this._handleDeleteButton()
		);

		this._element
			.querySelector(".content__image")
			.addEventListener("click", () => previewModal.open({ data }));
	}
	_handleHeartButton() {
		this.heartButton.classList.toggle("heart-on");
	}
	_handleDeleteButton = () => {
		this._element.remove();
	};
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

		this._setEventListeners({ name: this._name, link: this._link });

		return this._element;
	}
}

export default Card;
