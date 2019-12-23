setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('categories');
startDB(function() {
    showAllCategories();
});

function showAllCategories() {
    selectAll(function(results) {

        //url  ../../catTemplate.html#2
        

        var len = results.length;
        var html = '',
            i;
        for (i = 0; i < len; i++) {
            var cat_id = results[i].id;
            html = html + '<div id="' + cat_id + '">';
            html = html + '<h3>' + results[i].name + '</h3>';

            html = html + '<h5>' + results[i].catDesc + '</h5>';

            //alert(img_id);
            html = html + '<a href="#" class="actionDelete">Delete</a><br>';
            //html = html + '<a href="#" class="actionUpdate">Update</a>';
            html = html + '</div>';
        }

        $('#divCatList').html(html);

        $('.actionDelete').click(function() {
            var cat_id = parseInt($(this).parent().attr('id'));

            deleteOne(cat_id, function() {
                alert("Item " + cat_id + " was deleted successfully");
                location.reload();
            })
            return false;
        });
    });
}