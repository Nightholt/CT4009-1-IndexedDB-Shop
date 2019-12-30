$('#formAddCat').submit(function(event) { //function fires when form is submitted
    event.preventDefault();
    console.log("formAddCat submit:");

    //sets correct db and store of categories
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    setCurrObjectStoreName('categories');
    startDB(function() {
        saveCatData();
        alert("Category has been saved successfully");
        location.reload();
    });
});

var newCategoryID = 0;

//saves form data into categories table
function saveCatData() {
    var name = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    //format of table
    var data = {
        'name': name,
        'catDesc': catDesc
    };

    //saves new category in db
    insertOne(data, function(lastID) {
        event.preventDefault();
        console.log("saveCatData lastID:" + lastID);
        return false;
    });
}