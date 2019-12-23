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
            html = html + '<div id="' + cat_id + '">';
            html = html + '<h3>' + results[i].name + '</h3>';

            html = html + '<h5>' + results[i].catDesc + '</h5>';

            html = html + '<a href="#" class="actionDelete">Delete</a><br>';
            html = html + '<a href="#" class="actionUpdate">Update</a>';
            html = html + '</div>';
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