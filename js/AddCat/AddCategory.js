$('#formAddCat').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['UsersObjectStore', 'ItemsObjectStore', 'CatObjectStore']);
    setCurrObjectStoreName('CatObjectStore');
    
    
    startDB(function () {
        saveCatData();
        alert("Item has been saved successfully!");
    });
});

var newCategoryID = 0;

function saveCatData() {
    var catName = $('#txtCatName').val();
    var catName = $('#txtCatDesc').val();

    var data = {
        'catName': catName,
        'catDesc': catDesc,
        'id':""
        
    };

    //create new category in db
    insertOne(data, function(lastID) {
        event.preventDefault();

        createNewCategoryPage(data)
        
        return false;
    });
}

function createNewCategoryPage(data){
    //open category template
    var template = window.open("../CatTemplate/catTemplate.html");

    //replace template page newid and description and name placeholders with data values
    template.replace("newid", newCategoryID);
    template.replace("categoryName", data.catName);
    template.replace("categoryDescription", data.catDesc);

    //save new category page
    var opened = window.open("category" + newCategoryID + ".html")
    opened.document.write(template);
}
