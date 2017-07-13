$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getAuthors(API_URL, id).then(authors => {
		if(id) {
			renderAuthor(authors);
			$('.author-button').attr('href', '/authors')
		} else {
			authors.forEach(author => {
				if(author !== null) {
					renderAuthor(author);
				}
			})
		}
	});
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
	if(author.books[0] != null) {
		author.books.forEach(book => {
			context.books.push(`${book.title}`);
		});
	}
  	const source = $("#author-template").html();
  	const template = Handlebars.compile(source);
  	const html = template(context);
  	$('.authors-main').append(html);
}


function getAuthors(API_URL, id) {
	if(id) {
		return $.get(`${API_URL}/authors/${id}`);
	} else {
		return $.get(`${API_URL}/authors`);
	}
}
