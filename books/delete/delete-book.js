$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getBook(API_URL, id).then(book => {
		renderBook(book[0]);
	});
	initDeleteButton(API_URL, id);
});


function renderBook(book) {
	let context = {
		cover_url: book.cover_url,
		title: book.title,
		author: [],
		genre: book.genre,
		description: book.description
	}
	if(book.authors[0] != null) {
		book.authors.forEach(author => {
			context.author.push(`${author.first_name} ${author.last_name}`);
		});
	}
  	const source = $("#book-template").html();
  	const template = Handlebars.compile(source);
  	const html = template(context);
  	$('.books-main').append(html);
}


function getBook(url, id) {
	return $.get(`${url}/books/${id}`)
}


function initDeleteButton(url, id) {
	$('.delete-book-button-container').click(() => {
		$.ajax({
			url: `${url}/books/${id}`,
			type: 'DELETE',
			success: function(result) {
				console.log("Book deleted");
				window.location.href = "/books/index.html";
			}
		});
	});
}
