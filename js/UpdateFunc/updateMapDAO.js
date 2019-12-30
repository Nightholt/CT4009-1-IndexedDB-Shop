function updateMarkerData(data) {
    var markerName = $('#txtMarkerName').val();

    data.eventName = markerName;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}