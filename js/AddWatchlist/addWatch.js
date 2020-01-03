

$(document).on("change", "input[class='watchChkbox']", function () {
    var chkBoxId = this.id;
    var data;
    console.log("watchChkbox: " + chkBoxId);
    var idArray = chkBoxId.split("_");
    var itemId = idArray[1];
    var isChecked = 0;


    if ($(this).prop("checked")) {
        isChecked = 1;
    }
    console.log("checked : " + isChecked);

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
    setCurrObjectStoreName('items');
    try {
        startDB(function () {
            selectOne(itemId, function (result) {
                data = result;
                console.log("data.itemWatchlist: " + data.itemWatchlist);
            })
            
            console.log("itemWatchlist: " + itemId);
            // alert("Item has been successfully added to watchlist");
            updateWatchItemData(data, isChecked);
        });
        
    } catch (error) {
        console.log("error: " + error);
    }


    function updateWatchItemData(data, isChecked) {
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
        setCurrObjectStoreName('items');

        startDB(function () {
            data.itemWatchlist = 1; //parseInt(isChecked);

            updateOne(data, function (lastID) {
                event.preventDefault();
                return false;
            });
        });
    }

});
