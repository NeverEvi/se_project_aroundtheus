export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	_getResponse(res) {
		//wait for response
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error ${res.status}`);
	}
	getAPiInfo() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}
	////////////////////////
	////     CARDS      ////
	////////////////////////

	getInitialCards() {
		//retrieve Card list from server
		return fetch(`${this._baseUrl}/cards`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	addNewCard(name, link) {
		//"post" new card to server
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name,
				link,
			}),
		}).then((res) => this._getResponse(res));
	}
	removeCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	getLikes(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	addLike(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: "PUT",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	removeLike(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
	////////////////////////
	////    PROFILE     ////
	////////////////////////

	updateProfileInfo(name, about, avatar) {
		//patch new info through to the server
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name,
				about,
				avatar,
			}),
		}).then((res) => this._getResponse(res));
	}
	updateProfilePhoto(avatar) {
		//patch new info through to the server
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar,
			}),
		}).then((res) => this._getResponse(res));
	}
	getUserInfo() {
		//get user info from the server
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}
}
