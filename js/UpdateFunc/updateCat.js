var urlParams = new URLSearchParams(window.location.search);
var catID = urlParams.get('catID');
$('#catID').html("Category ID: " + catID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('categories');
var data;
startDB(function () {
    selectOne(catID, function(result) {
        $('#txtCatName').val(result.name);
        $('#txtCatDesc').val(result.catDesc);
        data = result;

    })
})

$('#formUpdateCategory').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('categories');
    
    startDB(function () {
        updateCatData(data);
        alert("Category has been updated successfully");
    });
});