function saveItemData() {
    var itemName = $('#txtItemName').val();
    var itemDesc = $('#txtDesc').val();
    var itemPrice = $('#intPrice').val();
    var itemCategory = $('#AdminDrop').val();
    
    console.log("saveItemData itemCategory: "+ itemCategory);

    var data = {
        'itemName': itemName,
        'itemDesc': itemDesc,
        'itemPrice': itemPrice,
        'itemCategory': itemCategory
    };

    var fileInput = $('#fileItemImage');
    var selectedFile = fileInput.get(0).files[0];

    if (typeof selectedFile != 'undefined')
        data.itemImage = selectedFile;

    insertOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}