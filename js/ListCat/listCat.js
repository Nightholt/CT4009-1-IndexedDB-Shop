setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('categories');
startDB(function () {
    showAllCategories();
});

function showAllCategories() {
    selectAll(function (results) {
        var len = results.length;
        var html = '',
            i;
        for (i = 0; i < len; i++) {
            var cat_id = results[i].id;
            html += '<div id="' + cat_id + '">';
            html += '<h3>' + results[i].name + '</h3>';

            html += '<h5>' + results[i].catDesc + '</h5>';

            html += '<a href="#" class="actionDelete">Delete</a><br>';
            html += '<a href="#" class="actionUpdate">Update</a>';

            // add here code to go and get all the items for this category cat_id
            html += GetCategoryItems(cat_id, CallBackUpdatePage);

            html += '</div>';
        }

        $('#divCatList').html(html);

        $('.actionDelete').click(function () {
            var cat_id = parseInt($(this).parent().attr('id'));

            deleteOne(cat_id, function () {
                alert("Category " + cat_id + " was deleted successfully");
                location.reload();
            })
            return false;
        });

        $('.actionUpdate').click(function () {
            var cat_id = parseInt($(this).parent().attr('id'));
            window.open("../Update/Update.html?cat_id=" + cat_id, "_self");

            return false;
        });
    });
}



function GetCategoryItems(itemCategory, callback) {

    // $.indexeddb("dbCat")
    //     .objectStore("categories")
    //     .openCursor()
    //     .each(function () {
    //         //Got Artist
    //         //Enumerate for Albums

    //         $.indexeddb("dbCat")
    //             .objectStore("items")
    //             .openCursor()
    //             .each(function () {
    //                 //Check for matching artist.Id
    //                 //if this albums's artist matches artist
    //                 //then do something
    //             });
    //     });
    const items = await db.transaction(storeName).objectStore(storeName).getAll()
    
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    setCurrObjectStoreName('items');
    startDB(function () {
        // showAllItemsForCategory(categoryId);
        // return $('#hiddenCategoryItemList').val();
        // data = {
        //     'itemName': itemName,
        //     'itemDesc': itemDesc,
        //     'itemPrice': itemPrice,
        //     'itemCategory': itemCategory
        // };
        selectOne(itemCategory, function (result) {

            var data = result;
            //console.log("GetCategoryItems data.itemName:" + data.itemName);
            //$("#categoryDiv").html("category: " + data.name);
            //return callback("<p>ITEM:" + data.itemName +"</p>");
            return "<p>ITEM:" + data.itemName + "</p>";
        });

    }, "");
}

function CallBackUpdatePage(html) {
    console.log("CallBackUpdatePage html:" + html);
    return html;
}