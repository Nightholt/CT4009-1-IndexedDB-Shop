var urlParams = new URLSearchParams(window.location.search); //retrieves id in the window to select which entry to display
var markerID = urlParams.get('markerID');
$('#markerID').html("Marker ID: " + markerID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('events');
var data;
startDB(function () {
    selectOne(markerID, function(result) { //fills in form with current values
        $('#txtMarkerName').val(result.eventName);
        $('#txtLatitude').val(result.eventLat);
        $('#txtLongitude').val(result.eventLng);

        data = result;

    })
})

//new values replace old when form submitted
$('#formUpdateMarker').submit(function(event)  {
    event.preventDefault();

    //sets correct obj store
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('events');
    startDB(function () {
        updateMarkerData(data); //call func from DAO
        alert("Map has been updated successfully");
    });
});