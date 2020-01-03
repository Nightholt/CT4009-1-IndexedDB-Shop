
// var data;
// var isChecked = 0;

// $(document).on("change", "input[class='watchChkbox']", function () {
//     // var chkBoxId = this.id;
//     // var idArray = chkBoxId.split("_");
//     // var itemId = idArray[1];

    
//     var parentId = idArray[0];
//     var idArray = parentId.indexOf("cellItem");
//     var itemID = parseInt(idArray[1]);
//     console.log("on change: chkBoxId: " + chkBoxId);

//     if ($(this).prop("checked")) {
//         AddtoWatchlist(itemId);
//     }
//     return false;
    
//     // try {
//     //     AddtoWatchlist();
//     // } catch (err) {
//     //     console.log("error: " + err);
//     // }
// });
    
// function AddtoWatchlist(itemID) {
//     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
//     setCurrObjectStoreName('items');
//     startDB(function() {
//         //selectOne(itemId, updateWatchItemData);
//         selectOne(itemID, function (result) {
//             console.log("WatchItemName: " + data.itemName);
//             data = result;
//             saveWatchlistData();
//             alert("Item has been successfully saved to watchlist");
//             location.reload();
//         });
//     });
// }

// var newWatchItemID = 0;

// //saves form data into categories table
// function saveWatchlistData() {
//     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
//     setCurrObjectStoreName('watchlist');
//     startDB(function() {
//         var itemName = data.itemName;
//         var itemDesc = data.itemDesc;
//         var itemPrice = data.itemPrice;
//         var itemSubcategory = data.itemSubcategory;;

//         //format of table
//         var data = {
//             'itemName': itemName,
//             'itemDesc': itemDesc,
//             'itemPrice': itemPrice,
//             'itemSubcategory': itemSubcategory,
//         };

//         //saves new category in db
//         insertOne(data, function(lastID) {
//             event.preventDefault();
//             console.log("saveWatchlistData lastID:" + lastID);
//             return false;
//         });
//     });
// }
    




// // function getItemWatchListValue(itemId) {
// //     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
// //     setCurrObjectStoreName('items');
// //     startDB(function () {
// //         selectOne(itemId, updateWatchItemData);
// //         // selectOne(itemId, function (result) {
// //         //     console.log("SECOND updateWatchItemData item: " + result.itemName);
// //         //     console.log("SECOND updateWatchItemData item: " + result.itemWatchlist);
// //         //     dataBlob = result;
// //         // });
// //         //callback();
// //         // alert("Item has been successfully added to watchlist");            
// //     });
// // }

// // function updateWatchItemData(result) {
// //     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
// //     setCurrObjectStoreName('items');

// //     console.log("THIRD updateWatchItemData item: " + result);
    
// //     startDB(function () {
// //         result.itemWatchlist = 1; //parseInt(isChecked);

// //         updateOne(result, function (lastID) {
// //             event.preventDefault();
// //             return false;
// //         });
// //     });
// // }


// // function errorCallback(err) {
// //     console.log("FIRING errorCallback: " + err);
// // }