$('#formAddCat').submit(function(event) {
    event.preventDefault();
    console.log("formAddCat submit:");

    setDatabaseName('dbCat', ['users', 'items', 'categories']);
    setCurrObjectStoreName('categories');


    startDB(function() {
        saveCatData();
        alert("Item has been saved successfully!");
    });
});

var newCategoryID = 0;

function saveCatData() {
    var name = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    var data = {
        'name': name,
        'catDesc': catDesc
            // 'id':""

    };

    //create new category in db
    insertOne(data, function(lastID) {
        event.preventDefault();

        console.log("saveCatData lastID:" + lastID);

        return false;
    });
}