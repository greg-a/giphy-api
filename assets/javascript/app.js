$(document).on("click", ".list-group-item", function(event) {
    event.preventDefault();
    
    var searchName = this.innerHTML;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=5v4rQS10XtSYgP0Dv4jnobu5HtcEQDWA";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $(".gif-container").prepend(gifDiv);
        }
    })
})
