/*
Declare all of our variables and functions first
*/

//array holding the animal list to be displayed as buttons on our page
var topicsArray = ["penguin", "seal", "cat", "dolphin", "octopus", "whale", "albatross", "cuttlefish", "clam", "starfish"];

//function that prints buttons corresponding to each element our initial array
function initializePage() {

	for (i=0; i<topicsArray.length; i++){
		var animalName = topicsArray[i];
		
		createButton(animalName);

	}

};

function createButton(inputString){

	var newButton = $("<button>");
	newButton.addClass("createGifsButton");
	newButton.attr("id", inputString);
	newButton.html(inputString);
	$("#buttons-div").prepend(newButton);

}

//function that creates a set number of GIFs containing a random GIF each from GIPHY
function printGifs(topicWord){

	//variables to set the URL for our API call
	var APIkey = "dc6zaTOxFJmzC";
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + APIkey + "&tag=" + topicWord;
    
    //variable that sets how many gifs we want to print to the page at once
    var gifsTotalNum = 10;
    
    
    for (i=0; i<gifsTotalNum; i++){

    	//querying the Giphy API
		$.ajax({

	    	url: queryURL,
	    	method: "GET"

		}).done(function(response) {

			//creates a new div to hold each random gif
			var newGifDiv = $("<div>");
			newGifDiv.addClass("pull-left");

			//puts a new img element for a random gif still 
	    	var newGifImg = $("<img>", {
	    		"src": response.data.fixed_height_small_still_url,
	    		"data-still": response.data.fixed_height_small_still_url,
	    		"data-gif": response.data.fixed_height_small_url,
	    		"data-state": "inactive",
	    		"class": "topic-gif"
	    	});
	    	newGifImg.attr("id", "new-gif-" + i);
	    	newGifDiv.append(newGifImg);
	    	
	    	//appends each new div to our page
	    	$("#gifs-container").append(newGifDiv);

		});

	}

}


/*
Run our functions, waiting for load or click events
*/

//when the page load, run the initializePage function
$(document).ready(function (){
	
	initializePage();

});


//when the user clicks an topic button, delete all the gifs from the page and run printGifs function to repopulate it
$(document).on("click", ".createGifsButton", function() {

	$("#gifs-container").empty();

	//run the PrintGifs function to print gifs corresponding to the button pressed
	var animalButtonPressed = this.id;
	printGifs(animalButtonPressed);

});

//when the user clicks on a gif, switch it to its opposite state (active or inactive)
$(document).on("click", ".topic-gif", function() {

	if( $(this).data("state") === "inactive" ){

		$(this).data( "state", "active");
		$(this).attr("src", $(this).data("gif"));

	}

	else if ( $(this).data("state") === "active" ){

		$(this).data( "state", "inactive");
		$(this).attr("src", $(this).data("still"));

	}

});

$(document).on("click", "#makeBtnButton", function() {

	var newGifTopic = $("#user-input-form").val();
	createButton(newGifTopic);

});