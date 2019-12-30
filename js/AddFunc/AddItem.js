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
    console.log("AdminDrop: " + $('#AdminDrop').val());
    event.preventDefault();
    if ($('#AdminDrop').val() === '0'){
        alert("Please Select a Category");
        return false;
    }

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
    
    startDB(function () {
        saveItemData();
        alert("Item has been saved successfully");
        location.reload();
        return true;
        
    });
});