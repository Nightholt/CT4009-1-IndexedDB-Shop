//mapCenter located in Cheltenham
var mapCenter = new google.maps.LatLng(51.8979988098144, -2.0838599205017);
//geocoder converts coords to readable address
var geocoder = new google.maps.Geocoder();
//InfoWindow displays content in a popup above map
var InfoWindow = new google.maps.InfoWindow();

function initialise() {
    //initial map properties
    var mapOptions = {
        zoom: 15,
        center: mapCenter
    };

    //creates map in div placeholder
    myMap = new google.maps.Map(document.getElementById('mapInput'), mapOptions);

    //create draggable marker icon in map
    marker = new google.maps.Marker({
        map: myMap,
        position: mapCenter,
        draggable: true
    });


}

//addDomListener triggered when html page loaded
//executes initialise function
google.maps.event.addDomListener(window, 'load', initialise);

//event handler for html form submit
//calls insertEvent function given in the DAO js
//stores data into indexeddb
$('#formInsertEvent').submit(function() {
    event.preventDefault();
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('events');
    startDB(function() {
        insertEvent(marker);
        //insertEvent(markerUpdate);
        alert("New location successfully added");
        //loadMarkerValues();
        location.reload();

    });
});

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('events');
    startDB(function() {
        showAllMarkers();
    });

function showAllMarkers() {
    selectAll(function (results) {
        var len = results.length;

        var html = '',
            i;
        
        //new div is created for each item in the events table in loop
        for (i = 0; i < len; i++) {
            var marker_id = results[i].id;
            html += "<div id='" + marker_id + "'>";
            html += '<h3>' + results[i].eventName + "</h3>";
            html += "<h5>" + results[i].eventLat + "</h5>";
            html += "<h5>" + results[i].eventLng + "</h5>";
            html += "<button type='button' class='btn btn-danger mapActionDelete'>Delete</button><br/>"; //delete function
            html += "<button type='button' class='btn btn-info mapActionUpdate'>Update</button><br/>"; //update function
            html += "</div>";
        }

        $('#markerList').html(html); //div that the newly created divs will go into

        //function to delete entry in table
        $('.mapActionDelete').click(function () {
            var markerID = parseInt($(this).parent().attr('id'));

            deleteOne(markerID, function () {
                alert("Store marker " + markerID + " was deleted successfully");
                location.reload();
            })
            return false;
        });

        //function to update entry
        $('.mapActionUpdate').click(function () {
            var markerID = parseInt($(this).parent().attr('id'));
            window.open("../Update/updateMap.html?markerID=" + markerID, "_self");

            return false;
        });
    });
}