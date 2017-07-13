$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getContent(API_URL,id).then(results => {
		updateSelect(results[1]);
		updateValues(results[0][0]);
		updateAuthorField(results[0][0].authors, id);
		initFormSubmit(id);
	})
});


function getContent(url, id) {
	return Promise.all([
		getBook(url,id),
		getAuthors(url)
	])
}


function getBook(url, id) {
	return $.get(`${url}/books/${id}`);
}

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

function appendAuthor(author, book_id) {
	let newAuthor = $(`<div><i class="fa fa-trash-o remove-add-author" aria-hidden="true"></i><p data-id="${author[1]}">${author[0]}</p></div>`);
	$('#book-authors').append(newAuthor);
	initRemoveButton(newAuthor, book_id);
}


function initRemoveButton(item, book_id) {
	$(item).find('i').click(() => {
		let author_id = $(item).find('p').attr('data-id');
		removeAuthorFromBook(author_id, book_id);
		item.remove();
	});
}


function initFormSubmit(id) {
	$('form').submit(event => {
		event.preventDefault();
		let newBook = getBookFormData();
		let authors = getSelectedAuthorIds();;
		if(authors.length < 1) {
			alert('Please add at least one author.');
			return;
		}
		if(isValidBook(newBook)) {
			updateBook(id, newBook).then(book => {
				createAssociations(book[0].id,authors)
			});
		}
	});
}


function updateBook(id, book) {
	let url = getUrl();
	return $.ajax({
		url: `${url}/books/${id}`,
		method: 'PUT',
		data: book
	});
}


function updateValues(book) {
	$('#book-title').val(book.title).focus()
	$('#book-genre').val(book.genre).focus()
	$('#book-description').val(book.description).focus()
	$('#book-cover-url').val(book.cover_url).focus()
}


function updateAuthorField(authors, book_id) {
	authors.forEach(author => {
		let name = `${author.first_name} ${author.last_name}`;
		let id = author.id;
		appendAuthor([name, id], book_id);
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
		authors.push($(this).attr('data-id'));
	});
	return authors;
}


// function postNewBook(book) {
// 	let url = getUrl();
// 	return $.post(`${url}/books`, book)
// }

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


function removeAuthorFromBook(author, book) {
	let url = getUrl();
	console.log(url);
	$.ajax({
		url: `${url}/books/${book}/authors/${author}`,
		type: 'DELETE',
		success: function(result) {
			console.log("Author removed");
		}
	})
}
