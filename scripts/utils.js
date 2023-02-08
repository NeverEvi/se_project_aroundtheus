const openModal = (target) => {
	target.classList.add("modal_opened");
	target.addEventListener("click", handleClickOut);
	document.addEventListener("keyup", handleEscUp);
};
const closeModal = (target) => {
	target.classList.remove("modal_opened");
	document.removeEventListener("keyup", handleEscUp);
};

const handleEscUp = (event) => {
	event.preventDefault();
	isEscEvent(event, closeModal);
};
const handleClickOut = (event) => {
	if (event.currentTarget !== event.target) return;
	closeModal(event.currentTarget);
};
const isEscEvent = (event, action) => {
	const activeModal = document.querySelector(".modal_opened");
	if (event.key === "Escape") {
		action(activeModal);
	}
};

export { closeModal, openModal, handleEscUp, handleClickOut, isEscEvent };
