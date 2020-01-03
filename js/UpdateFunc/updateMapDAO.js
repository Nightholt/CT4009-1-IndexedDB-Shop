function updateMarkerData(data) {
    var markerName = $('#txtMarkerName').val();
    var markerLat = $('#txtLatitude').val();
    var markerLong = $('#txtLongitude').val();

    data.eventName = markerName;
    data.eventLat = markerLat;
    data.eventLng = markerLong;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}