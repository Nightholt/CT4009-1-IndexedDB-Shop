$('#formAddCat').submit(function(event) {
    event.preventDefault();
    console.log("formAddCat submit:");

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    setCurrObjectStoreName('categories');


    startDB(function() {
        saveCatData();
        alert("Category has been saved successfully");
        location.reload();
    });
});

var newCategoryID = 0;

function saveCatData() {
    var name = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    var data = {
        'name': name,
        'catDesc': catDesc
    };

    //create new category in db
    insertOne(data, function(lastID) {
        event.preventDefault();

        console.log("saveCatData lastID:" + lastID);

        return false;
    });
}