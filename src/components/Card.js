export default class Card {
	constructor(
		{ data, selector, template, userId },
		handleClick,
		handleHeart,
		handleDelete
	) {
		this._name = data.name;
		this._link = data.link;

		if (data.likes) {
			this._likesList = data.likes;
		}
		this._userId = userId;
		this._ownerId = data.owner._id;

		this._id = data._id;
		this._selector = selector;
		this._template = template;
		this._handleClick = handleClick;
		this._handleHeartButton = handleHeart;
		this._handleDeleteButton = handleDelete;
	}

	_setEventListeners({ data }) {
		this._heartButton = this._element.querySelector(".content__heart-button");
		this._heartButton.addEventListener("click", () =>
			this._handleHeartButton(this._heartButton)
		);

		this._deleteButton = this._element.querySelector(".content__delete-button");
		this._deleteButton.addEventListener("click", () =>
			this._handleDeleteButton(this._id)
		);
		this._element
			.querySelector(".content__image")
			.addEventListener("click", () => this._handleClick(data));
	}

	//selectedCard.remove(data); //selectedCard == this.element in
	//selectedCard = null;
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
		if (this._likesList) {
			this.setLikesInfo(this._likesList);
		}
		if (this._ownerId !== this._userId) {
			this._deleteButton.classList.add("no-delete");
		}
		return this._element;
	}
	setLikesInfo(likesList) {
		this._likesList = likesList;
		this.likes = this._element.querySelector(".content__likes");
		this.likes.textContent = likesList.length;
		if (this.isLiked()) {
			this._heartButton.classList.add("heart-on");
		} else {
			this._heartButton.classList.remove("heart-on");
		}
	}
	isLiked() {
		//returns true if something in the likesList has an _id that matches the _userId
		return this._likesList.some((like) => {
			return like._id === this._userId;
		});
	}
	deleteCard() {
		this._element.remove();
		this._element = null;
	}
}
