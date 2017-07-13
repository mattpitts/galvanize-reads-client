$(document).ready(() => {
	const API_URL = getUrl();
	let id = window.location.href.split('=')[1];
	getContent(API_URL,id).then(results => {
		console.log(results[1]);
		updateSelect(results[1]);
		updateValues(results[0][0][0]);
		updateBookField(results[0][0][0].books, id);
		initFormSubmit(id);
	})
});


function getContent(url, id) {
	return Promise.all([
		getAuthor(url,id),
		getBooks(url)
	])
}


function getAuthor(url, id) {
	return $.get(`${url}/authors/${id}`);
}

function getBooks(API_URL) {
	return $.get(`${API_URL}/books`)
}


function updateSelect(books) {
	let $select = $('select')
	books.forEach(book => {
		if(book) {
			$select.append($(`<option value="${book.title}||${book.id}">${book.title}</option>`))
		}
	})
	$select.material_select();
	initAddBookButton($select);
}


function initAddBookButton($select) {
	$('.add-book-author-button').click(() => {
		let addedBook = $select.val().split('||');
		if($(`*[data-id="${addedBook[1]}"]`).html() != addedBook[0]) {
			appendBook(addedBook);
		}
	});
}

function appendBook(book, author_id) {
	let newBook = $(`<div><i class="fa fa-trash-o remove-add-author" aria-hidden="true"></i><p data-id="${book[1]}">${book[0]}</p></div>`);
	$('#book-authors').append(newBook);
	initRemoveButton(newBook, author_id);
}


function initRemoveButton(item, author_id) {
	$(item).find('i').click(() => {
		let book_id = $(item).find('p').attr('data-id');
		removeBookFromAuthor(book_id, author_id);
		item.remove();
	});
}


function initFormSubmit(id) {
	$('form').submit(event => {
		event.preventDefault();
		let newAuthor = getAuthorFormData();
		let books = getSelectedBookIds();;
		// if(books.length < 1) {
		// 	alert('Please add at least one author.');
		// 	return;
		// }
		if(isValidAuthor(newAuthor)) {
			updateAuthor(id, newAuthor).then(author => {
				createAssociations(author[0].id,books)
			});
		}
	});
}


function updateAuthor(id, author) {
	let url = getUrl();
	return $.ajax({
		url: `${url}/authors/${id}`,
		method: 'PUT',
		data: author
	});
}


function updateValues(author) {
	$('#author-fname').val(author.first_name).focus()
	$('#author-lname').val(author.last_name).focus()
	$('#portrait_url').val(author.portrait_url).focus()
	$('#author-biography').val(author.biography).focus()
}


function updateBookField(books, author_id) {
	console.log('books');
	console.log(books);
	if(books !== undefined) {
		books.forEach(book => {
			appendBook([book.title, book.id], author_id);
		});
	}

}

function getAuthorFormData() {
	return {
		first_name		: $('#author-fname').val(),
		last_name		: $('#author-lname').val(),
		portrait_url	: $('#portrait_url').val(),
		biography		: $('#author-biography').val()
	}
}

function getSelectedBookIds() {
	let books= [];
	$('#book-authors').find('div').children('p').each(function(p) {
		books.push($(this).attr('data-id'));
	});
	return books;
}


// function postNewBook(book) {
// 	let url = getUrl();
// 	return $.post(`${url}/books`, book)
// }

function isValidAuthor(author) {
	return true;
}


function createAssociations(id, books) {
	Promise.all(
		books.map(book => {
			let book_author = {
				author_id: id,
				book_id: book
			}
			return postAssociation(book_author);
		})
	).then(result => {
		console.log(result);
		window.location.href = '/authors'
	})
}

function postAssociation(book_author) {
	let url = getUrl();
	return $.post(`${url}/books/authors`, book_author)
}


function removeBookFromAuthor(author, book) {
	let url = getUrl();
	$.ajax({
		url: `${url}/authors/${author}/books/${book}`,
		type: 'DELETE',
		success: function(result) {
			console.log("Author removed");
		}
	})
}
