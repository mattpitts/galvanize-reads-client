$(document).ready(() => {
	const API_URL = getUrl();

	getAuthors(API_URL).then(authors => {
		updateSelect(authors);
	});
	initFormSubmit();

});

function getAuthors(API_URL) {
	return $.get(`${API_URL}/authors`)
}


function updateSelect(authors) {
	let $select = $('select')
	authors.forEach(author => {
		let authorName = `${author.first_name} ${author.last_name}`
		$select.append($(`<option value="${authorName}||${author.id}">${authorName}</option>`))
	})
	$select.material_select();
	initAddAuthorButton($select);
}


function initAddAuthorButton($select) {
	$('.add-book-author-button').click(() => {
		let addedAuthor = $select.val().split('||');
		// console.log($(`*[data-id="${addedAuthor[1]}"]`));
		if($(`*[data-id="${addedAuthor[1]}"]`).html() != addedAuthor[0]) {
			appendAuthor(addedAuthor);
		}
	});
}

function appendAuthor(author) {
	$('#book-authors').append($(`<p data-id="${author[1]}">${author[0]}</p>`));
}


function initFormSubmit() {
	$('form').submit(event => {
		event.preventDefault();
		let newBook = getBookFormData();
		console.log(newBook);
		if(isValidBook(newBook)) {
			postNewBook(newBook);
		}
	})
}


function getBookFormData() {
	return {
		title		: $('#book-title').val(),
		genre		: $('#book-genre').val(),
		description	: $('#book-description').val(),
		cover_url	: $('#book-cover-url').val()
	}
}

function postNewBook(book) {
	let url = getUrl();
	$.post(`${url}/books`, book).then(response => {
		console.log(response);
	});
}

function isValidBook(book) {
	return true;
}
