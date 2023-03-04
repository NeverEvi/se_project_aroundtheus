import { profileName, profileTitle } from "./constants";

export default class UserInfo {
	constructor(userName, userTitle) {
		this._userName = userName;
		this._userTitle = userTitle;
	}

	getUserInfo() {
		return {
			name: this._userName,
			title: this._userTitle,
		};
	}

	setUserInfo(value) {
		this._userName = value.name;
		profileName.textContent = value.name;
		this._userTitle = value.title;
		profileTitle.textContent = value.title;
	}
}
