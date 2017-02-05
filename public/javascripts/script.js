$(document).ready(function(){
      $('.slider').slider({full_width: true});
      $(".button-collapse").sideNav({
      	menuWidth: 200
      });
});

 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 100 // Creates a dropdown of 15 years to control year
  });
 
 $(document).ready(function() {
    Materialize.updateTextFields();
  });

function validateForm() {

	var checkCount = 0;

	var getTitle = document.getElementById('title').value;
	var getName = document.getElementById('name').value;
	var getProfile = document.getElementById('profile').value;
	var getVideoLink = document.getElementById('videoLink').value;
	var getDescription = document.getElementById('description').value;
	var getPublishDate = document.getElementById('publishDate').value;
	var getCategory = document.getElementById('category').value;
	var getViews = document.getElementById('views').value;
	var getLikes = document.getElementById('likes').value

	var errorMessage = "The following field/s are required, should not be empty, or should be corrected: \n\n"

	if (getTitle === "") {
		errorMessage += "Title\n";
	}
	else {
		checkCount++;
	}

	if (getName === "") {
		errorMessage += "Uploader\'s Name\n";
	}
	else {
		checkCount++;
	}

	if (getProfile === "") {
		errorMessage += "Uploader's YouTube Link\n";
	}
	else {
		checkCount++;
	}

	if (getVideoLink === "") {
		errorMessage += "YouTube Link of the Video\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "The following field/s are required and should not be empty: \n\n";
	}
}

function confirmDelete() {
	alert("This entry wil be deleted. Once deleted it can never be retrieved. Do you want to continue?")
}

function fieldValidate() {
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value
	var email = document.getElementById('email').value;

	var checkCount = 0;

	var errorMessage = "The following field/s are required, should not be empty, or should be corrected: \n\n";

	if(username === "") {
		errorMessage += "Username - should not be empty\n"
	}
	else if(username.length < 8) {
		errorMessage += "Username - Should contain 8 characters or more!\n"
	}
	else {
		checkCount++;
	}

	if (username != "") {
		if(checkUserName() === false) {
			errorMessage += "Username - should not contain any numbers or special characters!\n";
		}
		else {
			checkCount++;	
		}	
	}
	else {
		checkCount++;
	}

	if(email === "") {
		errorMessage += "Email - should not be empty!\n"
	}
	else {
		checkCount++
	}

	if(password === "") {
		errorMessage += "Password - should not be empty!\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "The following field/s are required, should not be empty, or should be corrected: \n\n";
	}
}

function checkUserName() {
    var username = document.getElementById("username").value;
    var pattern = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/); //unacceptable chars
    if (pattern.test(username)) {
        return false;
    }
    return true; //good user input
}

//This function gets the value of searchbox and store it in the web browser's storage
function getSearch() {
	localStorage.setItem("search", document.getElementById('search').value);
}

if (window.location.pathname === '/tutorials') {
	
	/*
	 * By default the value of search box is null
	 * When it is null, it will load the database fetch using the API and then sort it by
	 * the oldest date of the entry created.
	 */

	if (localStorage.getItem("search") === 'null') {
		fetch('api/v1/entry?sort=created').then(function(res) {
			res.json().then(function(entry) {
				console.log('entry', entry);
				var tbody = document.getElementById('data');
				entry.forEach(function(entry) {
	        		tbody.insertAdjacentHTML('beforeend', '<tr><td>' + entry.uploadersName + '</td>' +
	        		'<td><a href="/tutorials/' + entry._id + '", class= "red-text">' + entry.title + '</td><td>' +
	        		entry.description + '</td><td>' + entry.created + '</td><td>' +
	        		entry.updated + '</td></tr>');
	      		});
	    	});
	 	});

	 	/*
		 * Get the total count of the database
	 	 */

	 	fetch('api/v1/entry/count').then(function(res){
			res.json().then(function(count){
				console.log('count', count)
				var banner = document.getElementById('banner-description');
				banner.innerHTML = 'There are ' + count.count + ' tutorials available to watch!';
			});
		});
	}

	/*
	 * If the searchbox is not empty it will get the value then display all the entry
	 * related on what the user type in.
	 */

	else {
		fetch('api/v1/entry?query={"title":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
			res.json().then(function(result) {

				if (result.length === 0) {
					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href="/tutorials"' +
						' style= "text-transform: capitalize" class= "waves-effect waves-light btn-flat center black' +
						' white-text">See all tutorials</a>')

					document.getElementById('banner-description').innerHTML = "No entry found related to " + 
					localStorage.getItem("search");

					document.getElementById('result').style.display = "none";
				}
				else if (result.length === 1) {

					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href="/tutorials"' +
						' style= "text-transform: capitalize" class= "waves-effect waves-light btn-flat center black' +
						' white-text">See all tutorials</a>')

					document.getElementById('banner-description').innerHTML = "Found " + result.length +
					" entry related to " + localStorage.getItem("search");
				}
				else {

					document.getElementById('allLinks').insertAdjacentHTML('beforeend', '<a href="/tutorials"' +
						' style= "text-transform: capitalize" class= "waves-effect waves-light btn-flat center black' +
						' white-text">See all tutorials</a>')

					document.getElementById('banner-description').innerHTML = "Found " + result.length +
					" entries related to " + localStorage.getItem("search");
				}
				
				var tbody = document.getElementById('data');
				result.forEach(function(result) {
					tbody.insertAdjacentHTML('beforeend', '<tr><td>' + result.uploadersName + '</td>' +
	        		'<td><a href="/tutorials/' + result._id + '", class= "red-text">' + result.title + '</td><td>' +
	        		result.description + '</td><td>' + result.created + '</td><td>' +
	        		result.updated + '</td></tr>');
				});
				localStorage.setItem("search", null);
			});
		});
	}
}