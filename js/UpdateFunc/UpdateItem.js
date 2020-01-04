var urlParams = new URLSearchParams(window.location.search); //retrieves id in the window to select which entry to display
var itemID = urlParams.get('itemID');
$('#itemID').html("Item ID: " + itemID);

setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('items');
var data;
startDB(function () { //selects entry with id matching url to display
    selectOne(itemID, function(result) {
        $('#txtItemName').val(result.itemName);
        $('#txtDesc').val(result.itemDesc);
        $('#intPrice').val(result.itemPrice);
        $('#AdminDrop').val(result.itemSubcategory);
        data = result;

    })
})

$(document).on('change', '#fileItemImage', function(event) { //once new image uploaded, displayed in img preview
    previewFile();
});

//func to display img in preview div
function previewFile(){
    var preview = document.querySelector('img#bannerImg');
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

//new values replace old when form submitted
$('#formUpdateItem').submit(function(event)  {
    event.preventDefault();
    if ($('#AdminDrop').val() === '0'){ //guard against empty input
        alert("Please Select a Category");
        return false;
    }

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
    
    startDB(function () {
        updateItemData(data); //calls from DAO
        alert("Item has been updated successfully!");
    });
});