function updateItemData(data) {
    var itemName = $('#txtItemName').val();
    var itemDesc = $('#txtDesc').val();
    var itemPrice = $('#intPrice').val();

    data.itemName = itemName;
    data.itemDesc = itemDesc;
    data.itemPrice = itemPrice;


    var fileInput = $('#fileItemImage');
    var selectedFile = fileInput.get(0).files[0];

    if (typeof selectedFile != 'undefined')
        data.itemImage = selectedFile;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}