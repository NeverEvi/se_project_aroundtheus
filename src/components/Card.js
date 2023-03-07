export default class Card {
	constructor({ data, selector, template }, handleClick) {
		this._name = data.name;
		this._link = data.link;
		this._selector = selector;
		this._template = template;
		this._handleClick = handleClick;
	}

	_setEventListeners({ data }) {
		this._heartButton = this._element.querySelector(".content__heart-button");
		this._heartButton.addEventListener("click", () =>
			this._handleHeartButton()
		);

		this._deleteButton = this._element.querySelector(".content__delete-button");
		this._deleteButton.addEventListener("click", () =>
			this._handleDeleteButton()
		);

		this._element
			.querySelector(".content__image")
			.addEventListener("click", () => this._handleClick(data));
	}
	_handleHeartButton() {
		this._heartButton.classList.toggle("heart-on");
	}
	_handleDeleteButton = () => {
		this._element.remove();
		this._element = null;
	};
	_getTemplate() {
		const cardEl = document
			.querySelector(this._template)
			.content.querySelector("#card")
			.cloneNode(true);
		return cardEl;
	}

	initCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector(".content__image");
		this._cardImage.src = this._link;
		this._cardImage.alt = `Picture of ${this._name}`;
		const nameText = this._element.querySelector(".content__name");
		nameText.textContent = this._name;
		this._setEventListeners({ name: this._name, link: this._link });
		return this._element;
	}
}
