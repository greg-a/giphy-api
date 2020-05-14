var topics = ["Arrested Development", "Breaking Bad", "Burn After Reading", "Bojack Horseman"];
var used = [];

function addTopics() {
    for (var i = 0; i < topics.length; i++) {
        var lineItem = $("<li>");
        var delTopic = $("<span>").text("X").addClass("list-group-item").attr("id", "x-button");

        lineItem.text(topics[i]).addClass("list-group-item line-item").attr("data-name", topics[i]);
        lineItem.append(delTopic);
        $(".list-group").prepend(lineItem);
    }
}

function clearList() {
    $(".list-group").empty();
}

$(document).on("click", ".list-group-item", function(event) {
    event.preventDefault();
    
    var searchName = this.dataset.name;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=5v4rQS10XtSYgP0Dv4jnobu5HtcEQDWA";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        console.log(queryURL);

        for (var w = 0; w < 10; w++) {
            if (results[w].id != used[w]) {

                // for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").addClass("gif-div");
                    var rating = results[w].rating;
                    var p = $("<p>").text("Rating: " + rating.toUpperCase()).addClass("rating under");
                    var fav = $("<p>").text("Add Fav").addClass("fav-button under");
                    var del = $("<p>").text("Delete").addClass("del-button under");
                    var underGif = $("<div>").addClass("under-gif");
                    var personImage = $("<img>");
                    
                    personImage.attr("src", results[w].images.fixed_height_still.url).attr("data-status", "still").attr("data-still", results[w].images.fixed_height_still.url).attr("data-active", results[w].images.fixed_height.url).addClass("this-gif");
                    
                    
                    underGif.prepend(p, fav, del);
                    gifDiv.prepend(personImage);
                    gifDiv.append(underGif);
                    
                    $(".gif-container").prepend(gifDiv);
                    
                    used.push(results[w].id);
                    
                // }
            }
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
