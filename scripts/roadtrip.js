
$("#search-button-submit").on("click", function(event) {

    event.preventDefault();

    var topic = $("#search-term").val().trim();

    var queryURL = "https://api.seatgeek.com/2/events?listing_count.gt=0&q=" + topic + "&client_id=NzM0Nzk1NHwxNDkyNDczMTg5LjEx";

    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: "GET",

        })

        // After data comes back from the request

        .done(function(response) {

            var results = response.events;

            for (var i = 0; i < results.length; i++) {
                $("#myTable").append("<tr><td>" + results[i].title + "</td><td>" + results[i].datetime_local + "</td><td>" + results[i].venue.name + "</td><td>" + results[i].stats.lowest_price + "</td><td>" + results[i].url + "</tr>");

            }
        });
});