$(document).ready(() => {
	const API_URL = getUrl();
	getBooks(API_URL);
});


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


function renderBook(book) {
	console.log(book);
	let context = {
		cover_url: book.cover_url,
		title: book.title,
		author: [],
		genre: book.genre,
		description: book.description
	}
	book.authors.forEach(author => {
		context.author.push(`${author.first_name} ${author.last_name}`);
	});
  	const source = $("#book-template").html();
  	const template = Handlebars.compile(source);
  	const html = template(context);
  	$('.books-main').append(html);
}
