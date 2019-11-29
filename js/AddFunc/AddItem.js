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

$('#formSellItem').submit(function(event)  {
    event.preventDefault();

    setDatabaseName('dbCat', ['UsersObjectStore', 'ItemsObjectStore', 'CatObjectStore']);
    setCurrObjectStoreName('ItemsObjectStore');
    
    startDB(function () {
        saveItemData();
        alert("Item has been saved successfully!");
    });
});