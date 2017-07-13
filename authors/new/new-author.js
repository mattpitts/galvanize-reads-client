$(document).ready(() => {
	initFormSubmit();
});

function initFormSubmit() {
	$('form').submit(event => {
		event.preventDefault();
		let newAuthor = getAuthorFormData();
		if(isValidAuthor(newAuthor)) {
			postNewAuthor(newAuthor).then(author => {
				console.log(author);
				// window.location.href = "/authors";
			});
		}
	});
}


function getAuthorFormData() {
	return {
		first_name		: $('#author-fname').val(),
		last_name		: $('#author-lname').val(),
		biography		: $('#author-biography').val(),
		portrait_url	: $('#portrait-url').val()
	}
}


function postNewAuthor(author) {
	let url = getUrl();
	return $.post(`${url}/authors`, author)
}

function isValidAuthor(author) {
	return true;
}
