

$('#formAddCat').submit(function (event) {
    event.preventDefault();
    console.log("formAddCat submit:");

    setDatabaseName('dbCat', ['users', 'items', 'categories']);
    setCurrObjectStoreName('categories');


    startDB(function () {
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
    insertOne(data, function (lastID) {
        event.preventDefault();

        console.log("saveCatData lastID:" + lastID);

        createNewCategoryPage(data, lastID)

        return false;
    });
}

function createNewCategoryPage(data, lastID) {
    //open category template
    var template = window.open("../CatTemplate/catTemplate.html");

    //replace template page newid and description and name placeholders with data values
    template.replace("newid", lastID);
    template.replace("categoryName", data.name);
    template.replace("categoryDescription", data.catDesc);

    // $('#mySelect').append($('<option>', {
    //     value: 1,
    //     text: 'My option'
    // }));

    //save new category page
    var opened = window.open(data.name + ".html")
    opened.document.write(template);
    download(template, "../Categories/" + data.name + ".html");

}


function download(data, filename) {
    // var FileSaver = require('file-saver');
    // var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, filename);
    var file = new File([data], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file);
}