function insertEvent(marker) {
    //get event data user input
    var eventDate = $('#dateEvent').val();
    //get lat and long of current marker position
    var eventLat = marker.getPosition().lat();
    var eventLat = marker.getPosition().lng();

    //create object combining inputs
    var data = {
        'eventDate' : eventDate,
        'eventLat' : eventLat,
        'eventLng' : eventLng
    }

    //insert data into indexeddb dbCat
    insertOne(data, function() {
        return false;
    })
}