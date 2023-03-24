export default class UserInfo {
	constructor({ userName, userAbout, userAvatar }) {
		this._userName = userName;
		this._userAbout = userAbout;
		this._userAvatar = userAvatar;
	}
	getUserInfo() {
		return {
			name: this._userName.textContent,
			about: this._userAbout.textContent,
		};
	}
	setUserInfo(value) {
		this._userName.textContent = value.name;
		this._userAbout.textContent = value.about;
	}
	getAvatar() {
		return {
			avatar: this._userAvatar,
		};
	}
	setAvatar(link) {
		this._userAvatar.src = link;
	}
}
