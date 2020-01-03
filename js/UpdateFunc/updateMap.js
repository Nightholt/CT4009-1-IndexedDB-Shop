var urlParams = new URLSearchParams(window.location.search);
var markerID = urlParams.get('markerID');
$('#markerID').html("Marker ID: " + markerID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('events');
var data;
startDB(function () {
    selectOne(markerID, function(result) {
        $('#txtMarkerName').val(result.eventName);
        $('#txtLatitude').val(result.eventLat);
        $('#txtLongitude').val(result.eventLng);

        data = result;

    })
})

$('#formUpdateMarker').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('events');
    startDB(function () {
        updateMarkerData(data);
        alert("Map has been updated successfully");
    });
});