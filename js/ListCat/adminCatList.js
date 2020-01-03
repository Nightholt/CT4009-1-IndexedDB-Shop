setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('categories');
startDB(function() {
    //showAllCategories();
    getAllCategories(FormatCategoriesAndItemsAsHtml);

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
            html += '<a href="#" class="deleteAction">Delete</a><br/>';
            html += '<a href="#" class="updateAction">Update</a>';
            html += '</div>';
        }

        $('#divCategoryList').html(html);

        $('.deleteAction').click(function () {
            var catID = parseInt($(this).parent().attr('id'));
            if (!confirm("Are you sure you want to delete this Category with its items?")){
                return;
            };

            

            deleteOne(catID, function () {
                alert("Category " + catID + " was deleted successfully");
                location.reload();
            })
            return false;
        });

        $('.updateAction').click(function () {
            var catID = parseInt($(this).parent().attr('id'));
            window.open("../Update/updateCat.html?catID=" + catID, "_self");

            return false;
        });
    });
}