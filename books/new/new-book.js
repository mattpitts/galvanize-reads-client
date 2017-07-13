$(document).ready(() => {
	const API_URL = getUrl();

	getAuthors(API_URL).then(authors => {
		updateSelect(authors);
	});
	initFormSubmit();

});

function getAuthors(API_URL) {
	return $.get(`${API_URL}/authors`);
}


function updateSelect(authors) {
	let $select = $('select')
	authors.forEach(author => {
		if(author) {
			let authorName = `${author.first_name} ${author.last_name}`
			$select.append($(`<option value="${authorName}||${author.id}">${authorName}</option>`))
		}
		
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
	let newAuthor = $(`<div><i class="fa fa-trash-o remove-add-author" aria-hidden="true"></i><p data-id="${author[1]}">${author[0]}</p></div>`);
	$('#book-authors').append(newAuthor);
	initRemoveButton(newAuthor);
}


function initRemoveButton(item) {
	$(item).find('i').click(() => {
		item.remove();
	});
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
	$('#book-authors').find('div').children('p').each(function(p) {
		console.log($(this).attr('data-id'));
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
	Promise.all(
		authors.map(author => {
			let book_author = {
				book_id: id,
				author_id: author
			}
			console.log(book_author);
			return postAssociation(book_author);
		})
	).then(result => {
		console.log(result);
		window.location.href = '/books'
	})

}

function postAssociation(book_author) {
	let url = getUrl();
	return $.post(`${url}/books/authors`, book_author)
}
