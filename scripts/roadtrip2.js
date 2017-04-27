var dataSet = [];
var flightData = [];
$("#search-button-submit").on("click", function(event) {
    event.preventDefault();
    var searchField = $("#search-term").val().trim();
    var queryURL = "https://api.seatgeek.com/2/events?listing_count.gt=0&per_page=1000&geoip=true&range=12500mi&q=" + searchField + "&client_id=NzM0Nzk1NHwxNDkyNDczMTg5LjEx";
    console.log(queryURL);
    $.ajax({
            url: queryURL,
            method: "GET",
        })
        // After data comes back from the request
        .done(function(response) {
            var results = response.events;
            var dataSet = [];
            var table = $('#myTable').DataTable();
            table.destroy();
            for (var i = 0; i < results.length; i++) {
                var local = results[i].datetime_local;
                var localTime = moment(local).format('MMM Do YY, h:mm a');
                var localTime2 = moment(local).format('YYYYMMDD');
                dataSet.push([results[i].title, localTime, results[i].venue.city + ", " + results[i].venue.state, results[i].venue.name, results[i].stats.lowest_price, results[i].url, response.meta.geolocation.city, results[i].venue.city, localTime2]);
            };
            console.log(dataSet);
            var table = $('#myTable').DataTable({
                responsive: true,
                "searching": false,
                data: dataSet,
                columns: [
                    { title: "Event" },
                    { title: "Date" },
                    { title: "City" },
                    { title: "Venue" },
                    { title: "Lowest Price" },
                    { title: "Purchase" },
                ],
                "columnDefs": [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button>Add to Cart</button>"
                }]
            });
            $('#myTable tbody').on('click', 'button', function() {
                console.log(table);
                var data = table.row($(this).parents('tr')).data();
                var departureDate = data[8];
                var destination = cities[data[7]];
                var departure = cities[data[6]];
                var queryURL = "http://developer.goibibo.com/api/search/?app_id=7ebce3b6&app_key=dfb5c7018de2ca739ed1cd79e8c6f793&format=json&source=" + departure + "&destination=" + destination + "&dateofdeparture=" + departureDate + "&seatingclass=E&adults=1&children=0&infants=0&counter=100";
                console.log(queryURL);
                $.ajax({
                        url: queryURL,
                        method: "GET",
                    })
                    .done(function(response) {
                        console.log(response);
                        var results = response.data.onwardflights;

                        for (var i = 0; i < results.length; i++) {
                            var fare = results[i].fare.totalfare * .016;
                            fare = Math.trunc(fare);
                            flightData.push([results[i].deptime, results[i].arrtime, results[i].CabinClass, results[i].airline, fare]);
                        };
                        console.log(flightData);
                        $("#myTable").hide();
                        $("#flightDiv").show();
                        var airTable = $('#flightTable').DataTable({
                            responsive: true,
                            "searching": false,
                            data: flightData,
                            columns: [
                                { title: "Depature Time" },
                                { title: "Arrival Time" },
                                { title: "Class" },
                                { title: "Airline" },
                                { title: "Price" },
                                { title: "Select Flight" }
                            ],
                            "columnDefs": [{
                                "targets": -1,
                                "data": null,
                                "defaultContent": "<button class ='flight'>Select</button>"
                            }]
                        });
                    })
                $('.flight').on('click', 'button', function() {
                    departureDate = moment(departureDate).add(1, "days");
                    console.log(departureDate);
                    queryURL = "http://developer.goibibo.com/api/search/?app_id=7ebce3b6&app_key=dfb5c7018de2ca739ed1cd79e8c6f793&format=json&source=" + destination + "&destination=" + departure + "&dateofdeparture=" + departureDate + "&seatingclass=E&adults=1&children=0&infants=0&counter=100";
                    $.ajax({
                        url: queryURL,
                        method: "GET",
                    })
                    .done(function(response) {
                        console.log(response);
                        var results = response.data.onwardflights;

                        for (var i = 0; i < results.length; i++) {
                            var fare = results[i].fare.totalfare * .016;
                            fare = Math.trunc(fare);
                            flightData.push([results[i].deptime, results[i].arrtime, results[i].CabinClass, results[i].airline, fare]);
                        };
                    });
                });
            });


        })
});
$('#myTable').DataTable({
    responsive: true,
    "searching": false,
    data: dataSet,
    columns: [
        { title: "Event" },
        { title: "Date" },
        { title: "City" },
        { title: "Venue" },
        { title: "Lowest Price" },
        { title: "Purchase" },
    ]
});
