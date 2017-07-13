$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getAuthor(API_URL, id).then(author => {
		renderAuthor(author[0]);
	});
	initDeleteButton(API_URL, id);
});


function renderAuthor(author) {
	if(!author.portrait_url) {
		author.portrait_url = "https://placeholdit.co//i/250x250?bg=111111"
	}
	let context = {
		portrait_url: author.portrait_url,
		name: `${author.first_name} ${author.last_name}`,
		biography: author.biography,
		id: author.id,
		books: []
	}
	if(author.books.length > 0) {
		author.books.forEach(book => {
			context.books.push(`${book.title}`);
		});
	}
  	const source = $("#author-template").html();
  	const template = Handlebars.compile(source);
  	const html = template(context);
  	$('.authors-main').append(html);
}


function getAuthor(API_URL, id) {
	return $.get(`${API_URL}/authors/${id}`);
}


function initDeleteButton(url, id) {
	$('.delete-book-button-container').click(() => {
		$.ajax({
			url: `${url}/authors/${id}`,
			type: 'DELETE',
			success: function(result) {
				console.log("Author deleted");
				window.location.href = "/authors";
			}
		});
	});
}
