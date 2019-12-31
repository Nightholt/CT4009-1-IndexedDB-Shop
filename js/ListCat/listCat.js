//global vars to hold the categories and items so that the html can be built once they have been retrieved from the db
var listOfItems = [];
var listOfCategories = [];
var listOfSubcategories = [];


function getAllCategories(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        for (i = 0; i < len; i++) {
            listOfCategories[i] = results[i];
        }
        //console.log("showAllCategories listOfCategories.length:" + listOfCategories.length);
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'events', 'watches']);
        setCurrObjectStoreName('items');
        // need to get all the items before building the html
        startDB(getAllItems(callBack)); // async func
    });
}

function getAllSubcategories(callBack) {
    selectAll(function (results) {
        var len = results.length;
        var i;
        for (i = 0; i < len; i++) {
            getAllSubcategories[i] = results[i];
        }
        console.log("getAllSubcategories getAllSubcategories.length:" + getAllSubcategories.length);
        callBack();
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
        callBack();// now build the html at the end of the call stack
    });
}


function FormatCategoriesAndItemsAsHtml() {
    var len = listOfCategories.length;
    //categories
    var html = "";
    for (i = 0; i < len; i++) {
        var categoryId = listOfCategories[i].id;
        html += '<div id="' + categoryId + '">';
        html += '<h1>' + listOfCategories[i].name + '</h1>';
        html += '<h6>' + listOfCategories[i].catDesc + '</h6>';
        // build html
        var k = 0;
        var lenItems = listOfItems.length;
        
        for (k = 0; k < lenItems; k++) {
            // iterate over items array
            var SubcategoryId = listOfSubcategories[k].id;
            html += '<div id="' + SubcategoryId + '">';
            html += '<h1>' + listOfSubcategories[k].subcatName + '</h1>';
            html += '<h6>' + listOfCategories[k].subcatDesc + '</h6>';
            var j = 0;
            var lenItems = listOfItems.length;
            
            for (j = 0; j < lenItems; j++) {
            // iterate over items array
                var itemSubcategoryId = listOfItems[j].itemSubcategory;
                //console.log("FormatCategoriesAndItems categoryId: " + categoryId + ",itemCategoryId: " + itemCategoryId);
                console.log("FormatCategoriesAndItems called");
                if (parseInt(categoryId) === parseInt(itemSubcategoryId)) {
                    //console.log(lenItems +" called")
                    var itemId = listOfItems[j].id;
                    //html += "<div class='adminView'>";
                    html += "   <div class='indent'>";
                    html += "       <div class='leftCell' id='cellItem_" + itemId + "'>";
                    html += "           <h3>" + listOfItems[j].itemName + "</h3><br/>";
                    html += "           <img src='../images/" + listOfItems[j].itemImage.name + "' height='100' width='100'/><br/>";
                    html += "           <label>" + listOfItems[j].itemDesc + "</label><br/>";
                    html += "           <label><b>&pound;" + listOfItems[j].itemPrice + "</b></label><br/>";
                    html += "           <label>CategoryId:" + listOfItems[j].itemSubcategory + "</label><br/>";
                    html += "       </div>";
                    html += "       <input class='cellChkbox' type='checkbox' name='compare' value='add to Compare' id='compareCheckBox_" + itemId + "'/><label for='compareCheckBox_" + itemId + "'> Add to compare</label>"
                    html += "       <form id='formAddwatch'><input type='checkbox' name='watch' value='watch'/> Add to watchlist</form><br/>"
                    html += "   </div>";
                    //html += "   <a href='#' class='deleteAction'>Delete</a><br/>";
                    //html += "   <a href='#' class='updateAction'>Update</a>";
                    //html += "</div>";
                }
            }
            html += '</div>';
        }
        html += '</div>';
    }
    $("#divCatList").html(html);
}

