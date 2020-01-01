$('#formAddSubcat').submit(function(event) { //function fires when form is submitted
    console.log("AdminDrop1: " + $('#AdminDrop1').val());
    event.preventDefault();
    if ($('#AdminDrop1').val() === '0'){
        alert("Please Select a Category");
        return false;
    }
    event.preventDefault();
    console.log("formAddSubat submit: ");

    //sets correct db and store of categories
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events']);
    setCurrObjectStoreName('subcategories');
    startDB(function() {
        saveSubcatData();
        alert("Subcategory has been saved successfully");
        location.reload();
    });
});

var newSubcategoryID = 0;

//saves form data into categories table
function saveSubcatData() {
    var subcatName = $('#txtSubcatName').val();
    var subcatDesc = $('#txtSubcatDesc').val();
    var category = $('#AdminDrop1').val();

    //format of table
    var data = {
        'subcatName': subcatName,
        'subcatDesc': subcatDesc,
        'category': category
    };

    //saves new category in db
    insertOne(data, function(lastID) {
        event.preventDefault();
        console.log("saveSubcatData lastID:" + lastID);
        return false;
    });
}