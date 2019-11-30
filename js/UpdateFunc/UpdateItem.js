var urlParams = new URLSearchParams(window.location.search);
var itemID = urlParams.get('itemID');
$('#itemID').html("Item ID: " + itemID);

setDatabaseName('dbCat', ['UsersObjectStore', 'ItemsObjectStore', 'CatObjectStore']);
setCurrObjectStoreName('ItemsObjectStore');
var data;
startDB(function () {
    selectOne(itemID, function(result) {
        $('#txtItemName').val(result.itemName);
        data = result;
    })
})

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


$('#formUpdateItem').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['UsersObjectStore', 'ItemsObjectStore', 'CatObjectStore']);
    setCurrObjectStoreName('ItemsObjectStore');
    
    startDB(function () {
        updateItemData(data);
        alert("Item has been updated successfully!");
    });
});