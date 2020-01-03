//global vars to hold the categories, subcategories and items so that the html can be built once they have been retrieved from the db
var listOfItems = [];
var listOfCategories = [];
var listOfSubcategories = [];

//retrieves category list from categories table in db
function getAllCategories(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;

        //loop continues for every value in db table
        for (i = 0; i < len; i++) {
            listOfCategories[i] = results[i];
        }
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
        setCurrObjectStoreName('subcategories');
        // need to get all the subcats and items before building the html
        startDB(function () {
            getAllSubcategories(callBack);
        }); // async func
    });
}

//getAllCategories().getAllSubcategories().getAllItems(callBack)

//retrieve all values from subcategories table in db
//items need to be obtained before html can be built
function getAllSubcategories(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        //loop for each result
        for (i = 0; i < len; i++) {
            listOfSubcategories[i] = results[i];
        }

        console.log("getAllSubcategories.length:" + listOfSubcategories.length);
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
        setCurrObjectStoreName('items');
        startDB(function () {
            getAllItems(callBack);
        }); // async func

    });
}

//retrieves all values from items table in db
//html can't be built until values are obtained
function getAllItems(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        for (i = 0; i < len; i++) {
            listOfItems[i] = results[i];
        }
        console.log("getAllItems listOfItems.length:" + listOfItems.length);
        //optional callBack - to build the html at the end of the call stack, if it is needed
        if (callBack !== undefined && callBack !== "") {
            callBack();
        }
    });
}


//pulls all previous functions together to build html
function FormatCategoriesAndItemsAsHtml() {
    var len = listOfCategories.length;
    //categories div
    var html = "";
    for (i = 0; i < len; i++) {
        var categoryId = listOfCategories[i].id;
        //html += "<button class='accordion'>" + listOfCategories[i].name + "</button>";
        html += "<div class='display'>"
        html += "<div id='" + categoryId + "'>";
        html += "   <h1>" + listOfCategories[i].name + "</h1>";
        html += "   <h6>" + listOfCategories[i].catDesc + "</h6>";
        html += "   <div class='adminView' id='adminCellCategory_" + categoryId + "'>";
        html += "       <button type='button' class='btn btn-danger deleteAction'>Delete</button><br/>";
        html += "       <button type='button' class='btn btn-info updateAction'>Update</button><br/>";
        html += "   </div>";
        // build html
        var k = 0;
        var lenSubcategories = listOfSubcategories.length;
        //subcategories div loops for each result
        for (k = 0; k < lenSubcategories; k++) {
            if (parseInt(listOfSubcategories[k].category) === parseInt(listOfCategories[i].id)) {
                // iterate over subcats array
                var subcategoryId = listOfSubcategories[k].id;
                html += "   <div class='indent'>";
                html += "       <div id='" + subcategoryId + "'>";
                html += "       <h1>" + listOfSubcategories[k].subcatName + "</h1>";
                html += "       <h6>" + listOfSubcategories[k].subcatDesc + "</h6>";
                html += "       <div class='adminView' id='adminCellSubCategory_" + subcategoryId + "'>";
                html += "           <button type='button' class='btn btn-danger deleteAction'>Delete</button><br/>";
                html += "           <button type='button' class='btn btn-info updateActionSubcat'>Update</button><br/>";
                html += "       </div>";
                var j = 0;
                var lenItems = listOfItems.length;
                //items div loops for each result
                for (j = 0; j < lenItems; j++) {
                    // iterate over items array
                    var itemSubcategoryId = listOfItems[j].itemSubcategory;
                    console.log("FormatCategoriesAndItems called");
                    if (parseInt(subcategoryId) === parseInt(itemSubcategoryId)) {
                        //build item div if subcategoryId matches itemSubcategoryId
                        html += generateItemHTML(listOfItems[j]);
                    }
                }
                html += "   </div>";
                html += "</div>";
                html += "</div>";
            }
        }
    }
    $("#divCatList").html(html); //div that html is built into

    $('.adminView').hide(); //hides admin functions while on shop page
    //if url includes name of admin page then admin functions appear
    //checkboxes and buy button hidden as not needed
    var url = window.location.href;
    var adminCheck = url.includes("crud");
    if (adminCheck === true) {
        $('.adminView').show();
        $('.checkbox').hide();
        $('.buy').hide();
    }
    else {
        return;
    }

    //func to delete child elements
    $('.deleteAction').click(function () {

        getAllSubcategories();// cascade build all 3 arrays

        var idArray = $(this).parent().attr('id').split("_"); //gets array of categories
        var parentId = idArray[0];
        var id = parseInt(idArray[1]);

        var storename = "";
        if (parentId.indexOf("adminCellCategory") !== -1) {
            storename = "categories";
            if (!confirm("Are you sure you want to delete this category?\nWARNING: ALL related subcategories AND their related items will also be deleted?")) {
                return;
            };
            // get all subcategories for this category and items and delete            
            for (i = 0; i < listOfSubcategories.length; i++) {
                var subCatId = listOfSubcategories[i];
                if (subCatId.categoryid === id) {
                    deleteItemsBySubCategory(subCatId.id);
                    deleteById("subcategories", subCatId.id);
                }
            }
            deleteById(storename, id);
        }

        if (parentId.indexOf("adminCellSubCategory") !== -1) {
            storename = "subcategories";
            if (!confirm("Are you sure you want to delete this subcategory\nWARNING: ALL related items will also be deleted?")) {
                return;
            };
            deleteItemsBySubCategory(id);
            deleteById(storename, id);
        }

        if (parentId.indexOf("adminCellItem") !== -1) {
            storename = "items";
            if (!confirm("Are you sure you want to delete this item?")) {
                return;
            };
            deleteById(storename, id);
        }
        return false;
    });

    function deleteItemsBySubCategory(subcategoryId) {
        for (i = 0; i < listOfItems.length; i++) {
            var item = listOfItems[i];
            if (item.subcategoryid === subcategoryId) {
                deleteById("items", item.id);
            }
        }
    }

    function deleteById(storename, id) {
        console.log("deleteAction: storename: " + storename);

        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
        setCurrObjectStoreName(storename);
        startDB(function () {
            deleteOne(id, function () {
                alert("deleted!");
                location.reload();
            });
        }); // async func
    }
}



function generateItemHTML(item) {
    var itemId = item.id;
    var html = "<div class='indentItems'>";
    html += "       <div class='leftCell' id='cellItem_" + itemId + "'>";
    html += "           <h3>" + item.itemName + "</h3><br/>";
    html += "           <img src='../images/" + item.itemImage.name + "' height='100' width='100'/><br/>";
    html += "           <label>" + item.itemDesc + "</label><br/>";
    html += "           <label><b>&pound;" + item.itemPrice + "</b></label><br/>";
    html += "       </div>";
    //admin controls, only available on crud page
    html += "       <div class='adminView' id='adminCellItem_" + itemId + "'>";
    html += "           <button type='button' class='btn btn-danger deleteAction'>Delete</button><br/>";
    html += "           <button type='button' class='btn btn-info updateActionItem'>Update</button><br/>";
    html += "       </div>";
    //checkbox to add to compare div
    html += "       <div class='checkbox'><input class='cellChkbox' type='checkbox' name='compare' value='Add to Compare' id='compareCheckBox_" + itemId + "'/><label for='compareCheckBox_" + itemId + "'> Add to compare</label></div>";
    //checkbox to add to watchlist
    html += "       <div id='watchItem_" + itemId + "' class='checkbox'><input class='watchChkbox' type='checkbox' name='watch' value='Add to Watchlist' id='watchCheckBox_" + itemId + "'/><label for='watchCheckBox_" + itemId + "'> Add to watchlist</label></div>";
    html += "       <div class='buy'><button id='buy' class='btn btn-success' value='Buy'>Buy</button></div>";
    html += "   </div>";
    
    
    
    return html;
}

$('.updateActionItem').click(function () { //redirects to update page with item id
    var itemID = itemId;
    window.open("../Update/Update.html?itemID=" + itemID, "_self");

    return false;
    });

$("#buy").click(function () { //redirects to under construction page when buy button clicked
    window.open('../../Search/results.html');
})








var isChecked = 0;
//watchlist func
$(document).on("change", "input[class='watchChkbox']", function () {
    // var chkBoxId = this.id;
    // var idArray = chkBoxId.split("_");
    // var itemId = idArray[1];
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
    startDB(function () {
        getAllItems();
    }); // async func

    var idArray = $(this).parent().attr('id').split("_");
    var parentId = idArray[0];
    var watchItemID = parseInt(idArray[1]);


    if ($(this).prop("checked")) {
        if (parentId.indexOf("watchItem") !== -1) {
            console.log("on change: watchItemID: " + $('#watchItem_'));
            console.log("AddtoWatchlist fired")
            AddtoWatchlist(watchItemID);
        }
    }
    return;

    // try {
    //     AddtoWatchlist();
    // } catch (err) {
    //     console.log("error: " + err);
    // }
});

function AddtoWatchlist(watchItemID) {
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
    startDB(function () {
        //selectOne(itemId, updateWatchItemData);
        selectOne(watchItemID, function (result) {
            console.log("AddtoWatchlist result: " + result.itemName);
            //data = result;
            saveWatchlistData(result);
            alert("Item has been successfully saved to watchlist");
            //location.reload();
        });
    });
}

var newWatchItemID = 0;

//saves form data into categories table
function saveWatchlistData(itemData) {
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('watchlist');
    startDB(function () {
        //format of table
        var data = {
            'itemName': itemData.itemName,
            'itemDesc': itemData.itemDesc,
            'itemPrice': itemData.itemPrice,
            'itemSubcategory': itemData.itemSubcategory
        };

        //saves new category in db
        insertOne(data, function (lastID) {
            event.preventDefault();
            console.log("saveWatchlistData lastID:" + lastID);
            return false;
        });
    });
}





// function getItemWatchListValue(itemId) {
//     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
//     setCurrObjectStoreName('items');
//     startDB(function () {
//         selectOne(itemId, updateWatchItemData);
//         // selectOne(itemId, function (result) {
//         //     console.log("SECOND updateWatchItemData item: " + result.itemName);
//         //     console.log("SECOND updateWatchItemData item: " + result.itemWatchlist);
//         //     dataBlob = result;
//         // });
//         //callback();
//         // alert("Item has been successfully added to watchlist");            
//     });
// }

// function updateWatchItemData(result) {
//     setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
//     setCurrObjectStoreName('items');

//     console.log("THIRD updateWatchItemData item: " + result);

//     startDB(function () {
//         result.itemWatchlist = 1; //parseInt(isChecked);

//         updateOne(result, function (lastID) {
//             event.preventDefault();
//             return false;
//         });
//     });
// }


// function errorCallback(err) {
//     console.log("FIRING errorCallback: " + err);
// }