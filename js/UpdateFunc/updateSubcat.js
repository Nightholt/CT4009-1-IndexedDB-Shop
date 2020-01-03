var urlParams = new URLSearchParams(window.location.search);
var subcatID = urlParams.get('subcatID');
$('#subcatID').html("Subcategory ID: " + subcatID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('subcategories');
var data;
startDB(function () {
    selectOne(subcatID, function(result) {
        $('#txtSubcatName').val(result.subcatName);
        $('#txtSubcatDesc').val(result.subcatDesc);
        data = result;

    })
})

$('#formUpdateSubcategory').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('categories');
    
    startDB(function () {
        updateSubcatData(data);
        alert("Category has been updated successfully");
    });
});