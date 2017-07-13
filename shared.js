function getUrl() {
	API_URL = 'https://mbp-greads.herokuapp.com/api/v1';
	if(window.location.origin == 'http://127.0.0.1:8080') {
		API_URL = 'http://localhost:3000/api/v1';
	}
	return API_URL;
}

function getId() {
	return window.location.href.split('=')[1];
}


function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}

function validBook(book) {
	if(book.title.trim() == '') {
		alert('Please enter a title');
		return false;
	}
	if(book.genre.trim() == '') {
		alert('Please enter a genre');
		return false;
	}
	if(book.description.trim() == '') {
		alert('Please enter a description');
		return false;
	}
	return true;
}


function validAuthor(author) {
	if(author.first_name.trim() == '') {
		alert('Please enter a first name');
		return false;
	}
	if(author.last_name.trim() == '') {
		alert('Please enter a genre');
		return false;
	}
	if(author.biography.trim() == '') {
		alert('Please enter a description');
		return false;
	}
	return true;
}
