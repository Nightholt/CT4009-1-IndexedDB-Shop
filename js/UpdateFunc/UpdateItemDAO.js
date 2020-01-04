function updateItemData(data) { //func gets input values and replaces old ones with them when called
    var itemName = $('#txtItemName').val();
    var itemDesc = $('#txtDesc').val();
    var itemPrice = $('#intPrice').val();
    var itemSubcategory = $('#AdminDrop').val();
    

    //add new values in table
    data.itemName = itemName; 
    data.itemDesc = itemDesc;
    data.itemPrice = itemPrice;
    data.itemSubcategory = itemSubcategory;


    var fileInput = $('#fileItemImage'); //file upload input
    var selectedFile = fileInput.get(0).files[0];

    if (typeof selectedFile != 'undefined')
        data.itemImage = selectedFile;
    
    updateOne(data, function(lastID) { //uses updateOne from indexeddb wrapper
        event.preventDefault();
        return false;
    });
}