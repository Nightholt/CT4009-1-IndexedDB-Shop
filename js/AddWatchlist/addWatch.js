
var dataBlob;
var isChecked = 0;

$(document).on("change", "input[class='watchChkbox']", function () {
    var chkBoxId = this.id;
    var idArray = chkBoxId.split("_");
    var itemId = idArray[1];
    console.log("FIRST on change: chkBoxId: " + chkBoxId);

    if ($(this).prop("checked")) {
        isChecked = 1;
    }

    try {
        getItemWatchListValue(itemId);
    } catch (err) {
        console.log("error: " + err);
    }

});

function getItemWatchListValue(itemId) {
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
    setCurrObjectStoreName('items');
    startDB(function () {
        selectOne(itemId, updateWatchItemData);
        // selectOne(itemId, function (result) {
        //     console.log("SECOND updateWatchItemData item: " + result.itemName);
        //     console.log("SECOND updateWatchItemData item: " + result.itemWatchlist);
        //     dataBlob = result;
        // });
        //callback();
        // alert("Item has been successfully added to watchlist");            
    });
}

function updateWatchItemData(result) {
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
    setCurrObjectStoreName('items');

    console.log("THIRD updateWatchItemData item: " + result);
    
    startDB(function () {
        result.itemWatchlist = 1; //parseInt(isChecked);

        updateOne(result, function (lastID) {
            event.preventDefault();
            return false;
        });
    });
}


function errorCallback(err) {
    console.log("FIRING errorCallback: " + err);
}