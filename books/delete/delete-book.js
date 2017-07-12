$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getBook(API_URL, id).then(book => {
		renderBook(book[0]);
	});
});


function renderBook(book) {
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

function getBook(url, id) {
	return $.get(`${url}/books/${id}`)
}
