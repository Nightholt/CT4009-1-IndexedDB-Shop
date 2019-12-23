function showAllItems() {
    selectAll(function(results) {
        var len = results.length;
        var html = '',
            i;
        for (i = 0; i < len; i++) {
            var item_id = results[i].id;
            html = html + '<div id="' + item_id + '">';
            html = html + '<h3>' + results[i].itemName + '</h3>';
            var img_id = "image-" + item_id;
            html = html + '<h5>' + results[i].itemPrice + '</h5>';
            html = html + '<h5>' + results[i].itemDesc + '</h5>';
            //alert(img_id);
            html = html + '<img id=' + img_id + ' height="100" width="100"/><br>';
            html = html + '<a href="#" class="actionDelete">Delete</a><br>';
            html = html + '<a href="#" class="actionUpdate">Update</a>';
            html = html + '</div>';
        }

        // $("#UpdateFunc").hide(); 

        $('#divItemList').html(html);

        for (i = 0; i < len; i++) {
            var obj_url = window.URL.createObjectURL(results[i].itemImage);
            var item_id = results[i].id;
            var img_id = "image-" + item_id;
            //alert(img_id);
            $('#' + img_id).attr('src', obj_url);
        }

        $('.actionDelete').click(function() {
            var itemID = parseInt($(this).parent().attr('id'));

            deleteOne(itemID, function() {
                alert("Item " + itemID + " was deleted successfully");
                location.reload();
            })
            return false;
        });

        $('.actionUpdate').click(function() {
            //$("#UpdateFunc").toggle();
            var itemID = parseInt($(this).parent().attr('id'));
            window.open("../Update/Update.html?itemID=" + itemID, "_self");


            return false;
        });
    });
}