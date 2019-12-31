var urlParams = new URLSearchParams(window.location.search);
var markerID = urlParams.get('markerID');
$('#markerID').html("Marker ID: " + markerID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('events');
var data;
startDB(function () {
    selectOne(markerID, function(result) {
        $('#txtMarkerName').val(result.eventName);
        
        data = result;

    })
})

$('#formUpdateMarker').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('categories');
    startDB(function () {
        updateMarkerData(data);
        alert("Map has been updated successfully");
    });
});