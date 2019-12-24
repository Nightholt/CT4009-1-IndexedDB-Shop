//global vars to hold the categories and items so that the html can be built once they have been retrieved from the db
var listOfItems = [];
var listOfCategories = [];

setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('categories');
startDB(function () { // async func
    getAllCategories(FormatCategoriesAndItemsAsHtml);
});


function getAllCategories(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        for (i = 0; i < len; i++) {
            listOfCategories[i] = results[i];
        }
        //console.log("showAllCategories listOfCategories.length:" + listOfCategories.length);
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
        setCurrObjectStoreName('items');
        // need to get al the items before building the html
        startDB(getAllItems(callBack)); // async func
    });
}

function getAllItems(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        for (i = 0; i < len; i++) {
            listOfItems[i] = results[i];
        }
        console.log("getAllItems listOfItems.length:" + listOfItems.length);
        callBack();// now build the html at the end of the call stack :-)
    });
}


function FormatCategoriesAndItemsAsHtml() {
    var len = listOfCategories.length;
    //categories
    var html = "";
    for (i = 0; i < len; i++) {
        var categoryId = listOfCategories[i].id;
        html += '<div id="' + categoryId + '">';
        html += '<h1>' + listOfCategories[i].name + '</h3>';
        html += '<h5>' + listOfCategories[i].catDesc + '</h5>';
        //html += '<a href="#" class="actionDelete">Delete</a><br/>';
        //html += '<a href="#" class="actionUpdate">Update</a>';
        // build html
        var j = 0;
        var lenItems = listOfItems.length;
        for (j = 0; j < lenItems; j++) {
            // iterate over items array 
            var itemCategoryId = listOfItems[j].itemCategory;
            //console.log("FormatCategoriesAndItems categoryId: " + categoryId + ",itemCategoryId: " + itemCategoryId);
            if (parseInt(categoryId) === parseInt(itemCategoryId)) {
                html += "<div class='indent'>";
                html += "   <h3>" + listOfItems[j].itemName + "</h3>";
                html += "   <label>" + listOfItems[j].itemDesc + "</label>";
                html += "   <label>&pound;" + listOfItems[j].itemPrice + "</label>";
                html += "   <label>CategoryId:" + listOfItems[j].itemCategory + "</label>";
            }
            //html += '<a href="#" class="actionItemDelete">Delete</a><br/>';
            //html += '<a href="#" class="actionItemUpdate">Update</a>';
            html += '</div>';
        }
        html += '</div>';
    }
    $("#divCatList").html(html);
}
