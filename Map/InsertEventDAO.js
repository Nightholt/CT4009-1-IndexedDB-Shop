function insertEvent(marker) {
    //get event data user input
    var eventName = $('#txtEvent').val();
    //get lat and long of current marker position
    var eventLat = marker.getPosition().lat();
    var eventLng = marker.getPosition().lng();

    //create object combining inputs
    var data = {
        'eventName' : eventName,
        'eventLat' : eventLat,
        'eventLng' : eventLng
    }

    //insert data into indexeddb dbCat
    insertOne(data, function() {
        return false;
    })
}
