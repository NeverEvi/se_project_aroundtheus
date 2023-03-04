export default class Section {
	constructor({ renderer }, selector) {
		this._renderer = renderer; //. The renderer() function will render each element on a page
		this._container = document.querySelector(selector);
	}

	renderItems(items) {
		items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		this._container.prepend(element);
	}
}

//The Section class doesn't have markup. It receives
//markup through the callback function and inserts it in the container.

/*const renderCard = (data, wrap) => {
	//when rendering get data and wrap
	const card = new Card(data, wrap); //use that to create new instance of Card
	cardsContainer.prepend(card.initCard()); //add initialization of card at beginning of container
};

initialCards.forEach((data) => {
	//render each card in list
	renderCard(data, cardsContainer);
});*/
