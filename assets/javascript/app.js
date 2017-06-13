//array holding the animal list to be displayed as buttons on our page
var topicsArray = ["penguin", "seal", "cat", "dolphin", "octopus", "whale", "albatross", "cuttlefish", "clam", "starfish"];

//function that prints buttons corresponding to each element our initial array
function initializePage() {

	for (i=0; i<topicsArray.length; i++){
		var animalName = topicsArray[i];
		var newButton = $("<button>");
		newButton.addClass("createGifsButton");
		newButton.attr("id", animalName);
		newButton.html(animalName);
		$("#buttons-div").append(newButton);
	}

};

function printGifs(topicWord){

	var APIkey = "dc6zaTOxFJmzC";
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + APIkey + "&tag=" + topicWord;
    var gifsTotalNum = 10;
    
    for (i=0; i<gifsTotalNum; i++){

		$.ajax({

	    	url: queryURL,
	    	method: "GET"

		}).done(function(response) {

			var newGifURL = response.data.fixed_height_small_url;
	    	var newGifDisplay = $("<img src='" + newGifURL + "'>");
	    	$("#gifs-div").append(newGifDisplay);

		});

	}

}

//run the initializePage function once the page loads
$(document).ready(function (){

	
	initializePage();

});


$(document).on("click", ".createGifsButton", function() {

	var animalButtonPressed = this.id;
	printGifs(animalButtonPressed);

});
