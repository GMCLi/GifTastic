//On document ready
    //a list of buttons present
        //click any of these buttons 
            //runs the AJAX GET method based on the words 
            //the function returns objects
                //sort out the title, ID and language
            //display the gifs and show the title, ID and language for each
    //fill in the form and click submit
        //gets pushed into the array
        //button is rendered

// Initial array of movies
var array = ["Tokyo", "Japanese News", "Takeshi's Castle", "Sushi", "Samurai"];
var searching = "Germany";
var timesclicked = 0
$('document').ready(function(){
    renderButtons();
// Calling the renderButtons function to display the intial buttonsrenderButtons();
console.log(array);
//RENDERBUTTONS() IS NOT BEING CALLED WHEN THE DOCUMENT LOADS


// displayButtnInfo function re-renders the HTML to display the appropriate content
function displayButtonInfo() {
    // var searchbutton = $(this).attr("data-info");//SEARCHBUTTON IS DECLARED, BUT NEVER CALLED
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searching + "&api_key=mOHwmsfvB4F0OExkl6KfsvNjDQTd0l8s&limit=10&offset=" + timesclicked;
    var omdbURL = "https://www.omdbapi.com/?t=" + searching + "&y=&plot=short&apikey=trilogy"
    // Creating an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        //after data comes back from the API as the response
        .then(function(response) {

            for(var i=0; i<response.data.length; i++){

                console.log(response);
  

                // creating a div to place the gifs
                var gifDiv = $("<div class='gif'>");
                // creating a div to hold the info
                var infodiv = $("<div class='info'>");
                // store the rating metadata
                var title = response.data[i].title;
                //store the language metadata
                var rating = response.data[i].rating;
                //store title metadata
                var id = response.data[i].id;
                //store the url for STILLED gifs
                var datastill = response.data[i].images.downsized_still.url;
                //store the url for ANIMATED gifs
                var dataanimate = response.data[i].images.downsized.url;
                // creating an element to display the title metadata
                var pTitle = $("<p>").text("Title: " + title);
                // creating an element to display the rating metadata
                var pRating = $("<p>").text("Rating: " + rating);
                // creating an element to display the id metadata
                var pID = $("<p>").text("ID: " + id);
                //attributing class="imgclass" and data-state="still" to img
                var img = $("<img class='imgclass' data-state='still'>");

                img.attr("data-animate", response.data[i].images.downsized.url);

                img.attr("data-still", response.data[i].images.downsized_still.url);
                //attributing url path to img
                img.attr("src",datastill);

                $("#dumpdiv").append(img);
                // displaying the title by appending it to the gifDiv
                $("#dumpdiv").append(pTitle);
                // displaying the rating by appending it to the gifDiv
                $("#dumpdiv").append(pRating);
                // displaying the id by appending it to the gifDiv
                $("#dumpdiv").append(pID);


            }
            //When any element with .imgclass is clicked
            $(document).on("click", ".imgclass", function() {
                //attribute data-state to img as state
                var state = $(this).attr("data-state");
                console.log("clicked");//CONFIRMED OPERATIONAL
                //if the state is still
                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    //then set the state to animate
                    $(this).attr("data-state", "animate");
                    console.log("animated");
                }
                //if the state is not still
                else {
                    //change the gif to still
                    $(this).attr("src", $(this).data("still"));
                    //change the state to still
                    $(this).attr("data-state", "still");
                    console.log("stilled");
                }
            })
        });    
                
}



function renderButtons() {

    // Deleting the gifs prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-display").empty();

        // Looping through the array of gifs
        for (var i = 0; i < array.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-info", array[i]);
            // Providing the initial button text
            a.text(array[i]);
            // Adding the button to the buttons-view div
            $("#buttons-display").append(a);
        }
};

// This function handles events where a movie button is clicked
$("#add-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#button-input").val().trim();
    
    array.push(gif);
    console.log(array);
    
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", function(){
    $("#dumpdiv").append();//adds more gifs BUT NEED DIFFERENT GIFS NOT THE FIRST 10 ALL THE TIME
    timesclicked+=10;
    searching = $(this).text();
    displayButtonInfo();
    console.log("check");
});



});