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
			avatar: this._userAvatar,
		};
	}
	setUserInfo(value) {
		this._userName.textContent = value.name;
		this._userAbout.textContent = value.about;
		if (value.avatar) {
			this._userAvatar.src = value.avatar;
		}
	}
}
