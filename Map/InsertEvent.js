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
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    setCurrObjectStoreName('events');
    startDB(function() {
        insertEvent(marker);

        alert("New location successfully added");
    })
})