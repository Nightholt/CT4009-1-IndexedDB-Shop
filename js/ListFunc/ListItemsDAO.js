function showAllItems() {
    selectAll(function (results) {
        var len = results.length;

        var html = '',
            i;

        for (i = 0; i < len; i++) { //loops for all values in store
            var item_id = results[i].id; //gets item id
            //builds div and populates with corresponding data
            html += '<div id="watchItem">';
            html += '   <div id="' + item_id + '">';
            html += '   <h3> Name: ' + results[i].itemName + '</h3>';
            var img_id = "image-" + item_id;
            html += '   <h5> Price: £' + results[i].itemPrice + '</h5>';
            html += '   <h5> Description: ' + results[i].itemDesc + '</h5>';
            html += '   <h5> Subcategory: ' + results[i].itemSubcategory + '</h5>';
            html += '   <img src="../images' + results[i].itemImage + '" id=' + img_id + ' height="100" width="100"/><br/>';
            html += '   <a href="#" class="actionDelete">Remove</a><br/>'; //option to remove from watchlist
            html += '   </div>';
            html += '</div>';
        }

        $('#divItemList').html(html);

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

    });
}


// function showAllItemsForCategory(categoryId) {

//     var res = selectAll(function (results) {
//         var len = results.length;
//         var html = '', i;
//         for (i = 0; i < len; i++) {

//             var itemCategoryId = results[i].itemCategory;
//             if ((itemCategoryId === undefined || itemCategoryId === "") 
//                     && (itemCategoryId !== categoryId)) {
//                 //skip any category that does not match
//                 continue;
//             }
//             var item_id = results[i].id;
//             html += "<div id='" + item_id + "'>"
//             html += "<h3>" + results[i].itemName + "</h3>";
//             var img_id = "image-" + item_id;
//             html += "<h5>" + results[i].itemPrice + "</h5>";
//             html += "<h5>" + results[i].itemDesc + "</h5>";
//             html += "<label>CategoryId:" + results[i].itemCategory + "</label>";
//             //alert(img_id);
//             html += "<img id='" + img_id + "' height='100' width='100'/><br/>";
//             html += "<a href='#' class='actionDelete'>Delete</a><br/>";
//             html += "<a href='#' class='actionUpdate'>Update</a>";
//             html += "</div>";

//         }
        
        
//         $("#UpdateFunc").hide(); 
//         $('#hiddenCategoryItemList').val(html);
        

//         for (i = 0; i < len; i++) {
//             var obj_url = window.URL.createObjectURL(results[i].itemImage);
//             var item_id = results[i].id;
//             var img_id = "image-" + item_id;
//             //alert(img_id);
//             $('#' + img_id).attr('src', obj_url);
//         }

//         $('.actionDelete').click(function() {
//             var itemID = parseInt($(this).parent().attr('id'));

//             deleteOne(itemID, function() {
//                 alert("Item " + itemID + " was deleted successfully");
//                 location.reload();
//             })
//             return false;
//         });

//         $('.actionUpdate').click(function() {
//             //$("#UpdateFunc").toggle();
//             var itemID = parseInt($(this).parent().attr('id'));
//             window.open("../Update/Update.html?itemID=" + itemID, "_self");
//             return false;
//         });
//     });

  
// }