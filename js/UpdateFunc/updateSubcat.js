var urlParams = new URLSearchParams(window.location.search); //retrieves id in the window to select which entry to display
var subcatID = urlParams.get('subcatID');
$('#subcatID').html("Subcategory ID: " + subcatID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('subcategories');
var data;
startDB(function () {
    selectOne(subcatID, function(result) { //fills in form with current values
        $('#txtSubcatName').val(result.subcatName);
        $('#txtSubcatDesc').val(result.subcatDesc);
        data = result;

    })
})

//new values replace old when form submitted
$('#formUpdateSubcategory').submit(function(event)  {
    event.preventDefault();

    //sets correct obj store
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('subcategories');
    
    startDB(function () {
        updateSubcatData(data); //call func from DAO
        alert("Subcategory has been updated successfully");
    });
});