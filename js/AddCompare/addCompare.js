$(document).on('change', '#fileItemImage', function(event) {
    previewFile();
});

function previewFile(){
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

$('#formAddCompare').submit(function(event) {
    event.preventDefault();
    console.log("formAddCompare submit:");

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events', 'compare', 'watchlist']);
    setCurrObjectStoreName('compare');


    startDB(function() {
        saveCompData();
        alert("Item successfully saved to comparison list");
    });
});

var newComparisonID = 0;

function saveCompData() {
    var compItemName = listOfItems[j].itemName.val();
    var compItemDesc = $('#txtDesc').val();
    var compItemPrice = $('#intPrice').val();

    var data = {
        'compItemName': compItemName,
        'compItemDesc': compItemDesc,
        'compItemPrice': compItemPrice,

    };

    var fileInput = $('#fileItemImage');
    var selectedFile = fileInput.get(0).files[0];

    if (typeof selectedFile != 'undefined')
        data.itemImage = selectedFile;

    //inserts values into compare table in db
    insertOne(data, function(lastID) {
        event.preventDefault();

        console.log("saveCompData lastID:" + lastID);

        return false;
    });
}