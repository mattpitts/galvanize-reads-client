$(document).ready(() => {
	const API_URL = getUrl();
	getBooks(API_URL);
});


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
