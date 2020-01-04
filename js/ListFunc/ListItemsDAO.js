function showAllItems() {
    selectAll(function (results) {
        var len = results.length;

        var html = '',
            i;

        for (i = 0; i < len; i++) { //loops for all values in store
            $('#divEmpty').hide();
            var item_id = results[i].id; //gets item id
            //builds div and populates with corresponding data
            html += '<div id="watchItem">';
            html += '   <div id="' + item_id + '">';
            html += '   <h3> Name: ' + results[i].itemName + '</h3>';
            var img_id = "image-" + item_id;
            html += '   <h5> Price: £' + results[i].itemPrice + '</h5>';
            html += '   <h5> Description: ' + results[i].itemDesc + '</h5>';
            html += '   <h5> Subcategory: ' + results[i].itemSubcategory + '</h5>';
            html += '   <img src="../images' + results[i].itemImage.name + '" id=' + img_id + ' height="100" width="100"/><br/><br/>';
            html += "   <button type='button' class='btn btn-danger actionDelete'>Remove</button><br/>"; //option to remove from watchlist
            html += "   <div class='buyItem'><button id='buy' class='btn btn-success buy' value='Buy'>Buy</button></div>";
            html += '   </div>';
            html += '</div>';
        }

        $('#divItemList').html(html); //div js populates

        for (i = 0; i < len; i++) {
            var obj_url = window.URL.createObjectURL(results[i].itemImage);
            var item_id = results[i].id;
            var img_id = "image-" + item_id;
            $('#' + img_id).attr('src', obj_url);
        }

        //func to delete item with id matching parent of the button click
        $('.actionDelete').click(function () {
            var itemID = parseInt($(this).parent().attr('id'));

            deleteOne(itemID, function () {
                alert("Item " + itemID + " was deleted from your watchlist");
                location.reload();
            })
            return false;
        });

        $(".buy").click(function () { //redirects to under construction page when buy button clicked
            window.open('../Search/results.html');
        })

    });
}