$(document).ready(() => {
	const API_URL = getUrl();
	getBooks(API_URL).then(books => {
		books.forEach(book => {
			console.log(book);
			if(book !== null) {
				renderBook(book);
			}
		})
	})
});


function renderBook(book) {
	// console.log(book);
	if(!book.cover_url) {
		book.cover_url = "https://placeholdit.co//i/250x250?bg=111111"
	}
	let context = {
		cover_url: book.cover_url,
		title: book.title,
		author: [],
		genre: book.genre,
		description: book.description,
		id: book.id
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


function getBooks(API_URL) {
	return $.get(`${API_URL}/books`);
}
