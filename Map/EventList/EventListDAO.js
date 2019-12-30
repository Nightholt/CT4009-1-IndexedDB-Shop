function showAllEvents() {
    //call indexeddb function to fetch all data from events obj store
    selectAll(function(results) {
        console.log(results.length);
        //iterating all the data
        for(i=0; i<results.length; i++) {
            //date, latitude and longitude of specific event
            var eventName = results[i].eventName;
            var eventLat = results[i].eventLat;
            var eventLng = results[i].eventLng;
            //create latlng obj which will passed to create marker
            var markerLatLng = new google.maps.LatLng(eventLat, eventLng);
            
            //create map marker
            marker = new google.maps.Marker({
                map: myMap,
                position: markerLatLng
            });
            var infowindow = new google.maps.InfoWindow();
            //set event date as content of the info window
            infowindow.setContent(eventName);
            infowindow.open(myMap, marker);

        }
    });
}