var topics = ["Bojack Horseman", "Breaking Bad", "Burn After Reading", "The Office"];

function addTopics() {
    for (var i = 0; i < topics.length; i++) {
        var lineItem = $("<li>");

        lineItem.text(topics[i]).addClass("list-group-item");
        $(".list-group").prepend(lineItem);
    }
}

function clearList() {
    $(".list-group").empty();
}

$(document).on("click", ".list-group-item", function(event) {
    event.preventDefault();
    
    var searchName = this.innerHTML;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=5v4rQS10XtSYgP0Dv4jnobu5HtcEQDWA";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating.toUpperCase());

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url).attr("data-status", "still").attr("data-still", results[i].images.fixed_height_still.url).attr("data-active", results[i].images.fixed_height.url).addClass("this-gif");

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $(".gif-container").prepend(gifDiv);
        }
    })
})

$(document).on("click", ".this-gif", function(event){
    var status = $(this).attr("data-status");
    
    if (status === "still") {
        $(this).attr("src", $(this).attr("data-active")).attr("data-status", "active")
    }
    else {
        $(this).attr("src", $(this).attr("data-still")).attr("data-status", "still")
    }
})

$("#button-addon2").on("click", function(event) {
    var newTopic = $(".form-control").val().trim();
    $(".form-control").val("");
    topics.push(newTopic);
    clearList();
    addTopics();   
})

$("#button-addon3").on("click", function(event) {
    topics = [];
    clearList();
    console.log(topics);
})

addTopics();
