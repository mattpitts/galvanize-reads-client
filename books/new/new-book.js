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
		let authors = getSelectedAuthorIds();;
		if(authors.length < 1) {
			alert('Please add at least one author.');
			return;
		}
		if(isValidBook(newBook)) {
			postNewBook(newBook).then(book => {
				createAssociations(book[0].id,authors)
			});
		}
	});
}


function getBookFormData() {
	return {
		title		: $('#book-title').val(),
		genre		: $('#book-genre').val(),
		description	: $('#book-description').val(),
		cover_url	: $('#book-cover-url').val()
	}
}

function getSelectedAuthorIds() {
	let authors = [];
	$('#book-authors').children('p').each(function(p) {
		authors.push($(this).attr('data-id'));
	});
	return authors;
}


function postNewBook(book) {
	let url = getUrl();
	return $.post(`${url}/books`, book)
}

function isValidBook(book) {
	return true;
}


function createAssociations(id, authors) {
	for (var i = 0; i < authors.length; i++) {
		let book_author = {
			book_id: id,
			author_id: authors[i].id
		}
		postAssociation(book_author).then(response => {
			if(i = authors.length-1) {
				window.location.href = '../index.html'
			}
		}
	}
	authors.forEach(authorId => {


	})

}

function postAssociation(book_author) {
	let url = getUrl();
	return $.post(`${url}/books/authors`, book_author)
}
