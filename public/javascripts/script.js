$(document).ready(function(){
      $('.slider').slider({full_width: true});
      $(".button-collapse").sideNav({
      	menuWidth: 200
      });
});

 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
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
	var getPublishDate = document.getElementById('publishDate').value
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

	if (getDescription === "") {
		errorMessage += "Description\n";
	}
	else {
		checkCount++;
	}

	if (getPublishDate === "") {
		errorMessage += "Publish Date\n";
	}
	else {
		checkCount++;
	}

	if (getCategory === "") {
		errorMessage += "Category\n";
	}
	else {
		checkCount++;
	}

	if (getViews === "") {
		errorMessage += "Number of Views\n";
	}
	else {
		checkCount++;
	}

	if (getLikes === "") {
		errorMessage += "Number of Likes\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 9) {
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