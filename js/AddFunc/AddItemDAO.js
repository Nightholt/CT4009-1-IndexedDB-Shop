//save value of form input into db
function saveItemData() {
    var itemName = $('#txtItemName').val();
    var itemDesc = $('#txtDesc').val();
    var itemPrice = $('#intPrice').val();
    var itemSubcategory = $('#AdminDrop').val();
    
    console.log("saveItemData itemSubcategory: "+ itemSubcategory);

    //format of db table
    var data = {
        'itemName': itemName,
        'itemDesc': itemDesc,
        'itemPrice': itemPrice,
        'itemSubcategory': itemSubcategory,
    };

    //image upload input
    var fileInput = $('#fileItemImage');
    var selectedFile = fileInput.get(0).files[0];

    if (typeof selectedFile != 'undefined')
        data.itemImage = selectedFile; //image stored in db

    //insert into db
    insertOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}