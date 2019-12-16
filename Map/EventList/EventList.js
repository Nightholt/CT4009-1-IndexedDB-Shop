//mapCenter located in Cheltenham
var mapCenter = new google.maps.LatLng(51.8979988098144, -2.0838599205017);
//geocoder converts coords to readable address
var geocoder = new google.maps.Geocoder();
//InfoWindow displays content in a popup above map
var InfoWindow = google.maps.InfoWindow();

function initialise() {
    //initial map properties
    var mapOptions = {
        zoom: 15,
        center: mapCenter
    };

    //creates map in div placeholder
    myMap = new google.maps.Map($("#mapInput"), mapOptions);


    //retrieve saved event list from indexeddb dbCat
    $('#formInsertEvent').submit(function () {
        event.preventDefault();
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
        setCurrObjectStoreName('events');
        startDB(function () {
            //call DAO showAllEvents() function to show save event data in map
           showAllEvents();
        })
    })
}

//addDomListener triggered when html page loaded
//executes initialise function
google.maps.event.addDomListener(window, 'load', initialise);