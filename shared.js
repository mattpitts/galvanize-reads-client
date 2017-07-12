function getUrl() {
	API_URL = 'https://mbp-greads.herokuapp.com/api/v1';
	if(window.location.origin == 'http://127.0.0.1:8080') {
		API_URL = 'http://localhost:3000/api/v1';
	}
	return API_URL;
}


function getBooks(API_URL) {
	$.get(`${API_URL}/books`).then(books => {
		books.forEach(book => {
			renderBook(book);
		});
	});
}
