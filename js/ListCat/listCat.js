setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('categories');
startDB(function() {
    showAllCategories();
});

function showAllCategories() {
    selectAll(function(results) {
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
            html += GetCategoryItems(cat_id);
            html += '</div>';
        }

        $('#divCatList').html(html);

        $('.actionDelete').click(function() {
            var cat_id = parseInt($(this).parent().attr('id'));

            deleteOne(cat_id, function() {
                alert("Category " + cat_id + " was deleted successfully");
                location.reload();
            })
            return false;
        });

        $('.actionUpdate').click(function() {
            var cat_id = parseInt($(this).parent().attr('id'));
            window.open("../Update/Update.html?cat_id=" + cat_id, "_self");

            return false;
        });
    });
}

function GetCategoryItems(categoryId) {
    // setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    // setCurrObjectStoreName('items');
    // startDB(function() {
    //     getAllItemsByCategory();
    // });
    getAllItemsByCategory();

    function getAllItemsByCategory() {
        selectAll(function(results) {
            var len = results.length;
            var html = '',
                i;
            for (i = 0; i < len; i++) {
                var itemCat_id = results[i].id;
                itemCat_id = itemCategory == cat_id;
            }
        });

        return "<br/>this wil be an item for the categoryID: " + categoryId;
    };
};