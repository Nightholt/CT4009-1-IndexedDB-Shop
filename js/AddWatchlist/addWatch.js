$(document).on("change", "input[class='watchChkbox']", function () {
    var chkBoxId = this.id;
    var data;
    console.log("chkBoxId: " + chkBoxId)
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
    startDB(function () {
        updateWatchItemData();
        console.log("itemWatchlist: " + itemWatchlist)
        alert("Item has been successfully added to watchlist");
    });
});

function updateWatchItemData(data) {
    var itemWatchlist = 1;

    data.itemWatchlist = itemWatchlist;

    updateOne(data, function (lastID) {
        event.preventDefault();
        return false;
    });
}