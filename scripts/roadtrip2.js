var dataSet = [];


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
            dataSet.push([results[i].title, localTime, results[i].venue.city + ", " + results[i].venue.state, results[i].venue.name, results[i].stats.lowest_price, results[i].url, response.meta.geolocation.display_name]);

        }
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
            
        });


    });
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