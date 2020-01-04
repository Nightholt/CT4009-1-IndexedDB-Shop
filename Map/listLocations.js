setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('events');
    startDB(function() {
        showAllMarkers();
    });

function showAllMarkers() {
    selectAll(function (results) {
        var len = results.length;

        var html = '',
            i;
        
        //new div is created for each item in the events table in loop
        for (i = 0; i < len; i++) {
            var marker_id = results[i].id;
            html += "<div id='" + marker_id + "'>";
            html += '<h3>' + results[i].eventName + "</h3>";
            html += "<h5>" + results[i].eventLat + "</h5>";
            html += "<h5>" + results[i].eventLng + "</h5>";
            html += "<button type='button' class='btn btn-danger mapActionDelete'>Delete</button><br/>"; //delete function
            html += "<button type='button' class='btn btn-info mapActionUpdate'>Update</button><br/><br/>"; //update function
            html += "</div>";
        }

        $('#markerList').html(html); //div that the newly created divs will go into

        //function to delete entry in table
        $('.mapActionDelete').click(function () {
            var markerID = parseInt($(this).parent().attr('id'));
            console.log("markerID: " + markerID)
            setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
            setCurrObjectStoreName('events');
            startDB(function() {
                deleteOne(markerID, function () {
                    alert("Store marker " + markerID + " was deleted successfully");
                    location.reload();
                })
                return false;
            });
            
        });

        //function to update entry
        $('.mapActionUpdate').click(function () {
            var markerID = parseInt($(this).parent().attr('id'));
            window.open("../Update/updateMap.html?markerID=" + markerID, "_self");

            return false;
        });
    });
}