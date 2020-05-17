var defaultTopics = ["Arrested Development", "Breaking Bad", "Burn After Reading", "Bojack Horseman"];
var used = [];
var userTopics = [];

function addTopics() {
    for (var i = 0; i < topics.length; i++) {
        var lineItemContainer = $("<span>").addClass("li-span").attr("data-name", topics[i]);
        var lineItem = $("<li>").text(topics[i]).addClass("list-group-item line-item").attr("data-name", topics[i]);
        var delTopic = $("<span>").text("X").addClass("list-group-item").attr("id", "x-button").attr("data-name", topics[i]);

        lineItem.append(delTopic, lineItemContainer);
        $(".list-group").prepend(lineItem);
    }
}

function clearList() {
    $(".list-group").empty();
}

$(document).on("click", ".li-span", function (event) {
    event.preventDefault();

    var searchName = this.dataset.name;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=5v4rQS10XtSYgP0Dv4jnobu5HtcEQDWA";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>").addClass("gif-div").attr("id", results[i].id);
                var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase()).addClass("rating under");
                var fav = $("<p>").text("Add Fav").addClass("fav-button under").attr("data-name", results[i].id);
                var del = $("<p>").text("Delete").addClass("del-button under").attr("data-delete", results[i].id);
                var underGif = $("<div>").addClass("under-gif");
                var personImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-status", "still").attr("data-still", results[i].images.fixed_height_still.url).attr("data-active", results[i].images.fixed_height.url).addClass("this-gif");

                underGif.prepend(p, fav, del);
                gifDiv.prepend(personImage);
                gifDiv.append(underGif);

                $(".gif-container").prepend(gifDiv);

                used.push(results[i]);
            }
            $(".gif-container").prepend("<h2>New GIFs</h2>");
        })
})

$(document).on("click", ".fav-button", function (event) {

    for (var i = 0; i < used.length; i++) {
        if ($(this).attr("data-name") === used[i].id) {
            var favGifDiv = $("<div>").addClass("gif-div").attr("id", used[i].id);
            var favGif = $("<img>").attr("src", used[i].images.fixed_height_still.url).attr("data-status", "still").attr("data-still", used[i].images.fixed_height_still.url).attr("data-active", used[i].images.fixed_height.url).addClass("this-gif");
            var p = $("<p>").text("Rating: " + used[i].rating.toUpperCase()).addClass("rating under");
            var del = $("<p>").text("Delete").addClass("del-button under").attr("data-delete", used[i].id);
            var underGif = $("<div>").addClass("under-gif");

            underGif.prepend(p, del);
            favGifDiv.append(favGif);
            favGifDiv.append(underGif);
            $(".fav-gifs").prepend(favGifDiv);
            $("#" + used[i].id).remove();
        }
    }
    $(".fav-gifs h2").remove();
    $(".fav-gifs").prepend("<h2>Fav GIFs</h2>");
})

$(document).on("click", ".del-button", function (event) {
    for (var i = 0; i < used.length; i++) {
        if ($(this).attr("data-delete") === used[i].id) {
            $("#" + used[i].id).remove();
        }
    }
    console.log($(this).attr("data-delete"))
})

$(document).on("click", ".this-gif", function (event) {
    var status = $(this).attr("data-status");

    if (status === "still") {
        $(this).attr("src", $(this).attr("data-active")).attr("data-status", "active")
    }
    else {
        $(this).attr("src", $(this).attr("data-still")).attr("data-status", "still")
    }
})

$(document).on("click", "#x-button", function (event) {
    topics = topics.filter(e => e !== $(this).attr("data-name"));
    userTopics = topics.filter(e => e !== $(this).attr("data-name"));
    clearList();
    addTopics();
    localStorage.setItem("user topics", JSON.stringify(userTopics));
    $(".gif-container").empty();
})

$("#button-addon2").on("click", function (event) {
    var newTopic = $(".form-control").val().trim();

    $(".form-control").val("");

    topics.push(newTopic);
    clearList();
    addTopics();
    userTopics.push(newTopic);

    localStorage.setItem("user topics", JSON.stringify(userTopics));
})

$("#form-id").on("keyup", function (event) {
    if (event.keyCode === 13) {
        var newTopic = $(".form-control").val().trim();

        $(".form-control").val("");

        topics.push(newTopic);
        clearList();
        addTopics();
        userTopics.push(newTopic);

        localStorage.setItem("user topics", JSON.stringify(userTopics));
    }
})

$("#button-addon3").on("click", function (event) {
    topics = [];
    clearList();
    $(".gif-container").empty();
    $(".fav-gifs").empty();
})

var topics = JSON.parse(localStorage.getItem("user topics"));

if (!Array.isArray(topics) || topics.length === 0) {
    topics = defaultTopics;
}
else {
    userTopics = JSON.parse(localStorage.getItem("user topics"))
}

addTopics();
