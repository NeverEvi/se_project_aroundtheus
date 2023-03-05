export default class UserInfo {
	constructor({ userName, userJob }, setHandler) {
		this._userName = userName;
		this._userJob = userJob;
		this._setHandler = setHandler;
	}
	getUserInfo() {
		return {
			name: this._userName,
			job: this._userJob,
		};
	}
	setUserInfo(value) {
		this._userName = value.name;
		this._userJob = value.job;
		this._setHandler();
	}
}
