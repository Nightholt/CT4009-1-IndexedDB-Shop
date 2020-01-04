var urlParams = new URLSearchParams(window.location.search); //retrieves id in the window to select which entry to display
var catID = urlParams.get('catID');
$('#catID').html("Category ID: " + catID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('categories');
var data;
startDB(function () {
    selectOne(catID, function(result) { //selects entry with id matching url to display
        $('#txtCatName').val(result.name);
        $('#txtCatDesc').val(result.catDesc);
        data = result;

    })
});

//new values replace old when form submitted
$('#formUpdateCategory').submit(function(event)  {
    event.preventDefault();
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('categories');
    startDB(function () {
        updateCatData(data); //calls from DAO
        alert("Category has been updated successfully");
    });
});