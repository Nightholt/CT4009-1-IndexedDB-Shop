function updateMarkerData(data) { //func gets input values and replaces old ones with them when called
    var markerName = $('#txtMarkerName').val();
    var markerLat = $('#txtLatitude').val();
    var markerLong = $('#txtLongitude').val();

    data.eventName = markerName;
    data.eventLat = markerLat;
    data.eventLng = markerLong;
    
    updateOne(data, function(lastID) { //uses updateOne from indexeddb wrapper
        event.preventDefault();
        return false;
    });
}