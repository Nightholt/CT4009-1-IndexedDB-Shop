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
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'events', 'watches']);
        setCurrObjectStoreName('items');
        // need to get all the subcats and items before building the html
        startDB(function () {
            getAllSubcategories(getAllItems(callBack));
            
        }); // async func
    });
}

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
        callBack();
    });
}

//connect to subcategories db table
function initialiseSubcats(callBack) {
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('subcategories');
    startDB(function () { // async func
        getAllSubcategories(callBack);
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
        callBack();// now build the html at the end of the call stack
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
        //html += "<div class='panel'>"
            html += "<div id='" + categoryId + "'>";
            html += "<h1>" + listOfCategories[i].name + "</h1";
            html += "<h6>" + listOfCategories[i].catDesc + "</h6>";
            // build html
            var k = 0;
            var lenSubcategories = listOfSubcategories.length;
            //subcategories div loops for each result
            for (k = 0; k < lenSubcategories; k++) {
                //if (parseInt(listOfSubcategories[k].category) === parseInt(listOfCategories[i].id)) {
                    // iterate over subcats array
                    var subcategoryId = listOfSubcategories[k].id;
                    html += "<div class='indent'>";
                    html += "   <div id='" + subcategoryId + "'>";
                    html += "   <h1>" + listOfSubcategories[k].subcatName + "</h1>";
                    html += "   <h6>" + listOfSubcategories[k].subcatDesc + "</h6>";
                    var j = 0;
                    var lenItems = listOfItems.length;
                    //items div loops for each result
                    for (j = 0; j < lenItems; j++) {
                    // iterate over items array
                        var itemSubcategoryId = listOfItems[j].itemSubcategory;
                        console.log("FormatCategoriesAndItems called");
                        if (parseInt(subcategoryId) === parseInt(itemSubcategoryId)) {
                            //build item div if subcategoryId matches itemSubcategoryId
                            var itemId = listOfItems[j].id;
                            html += "   <div class='indent'>";
                            html += "       <div class='leftCell' id='cellItem_" + itemId + "'>";
                            html += "           <h3>" + listOfItems[j].itemName + "</h3><br/>";
                            html += "           <img src='../images/" + listOfItems[j].itemImage.name + "' height='100' width='100'/><br/>";
                            html += "           <label>" + listOfItems[j].itemDesc + "</label><br/>";
                            html += "           <label><b>&pound;" + listOfItems[j].itemPrice + "</b></label><br/>";
                            html += "           <label>CategoryId:" + listOfItems[j].itemSubcategory + "</label><br/>";
                            html += "           <div class='adminView'>";
                            html += "               <a href='#' class='deleteAction'>Delete</a><br/>";
                            html += "               <a href='#' class='updateAction'>Update</a>";
                            html += "           </div>";
                            html += "       </div>";
                            //checkbox to add to compare div
                            html += "       <input class='cellChkbox' type='checkbox' name='compare' value='Add to Compare' id='compareCheckBox_" + itemId + "'/><label for='compareCheckBox_" + itemId + "'> Add to compare</label>"
                            //checkbox to add to watchlist
                            html += "       <input class='watchChkbox' type='checkbox' name='watch' value='Add to Watchlist' id='watchCheckBox_" + itemId + "'/><label for='watchCheckBox_" + itemId + "'> Add to watchlist</label>"
                            html += "   </div>";
                            //
                        }
                    }
                    html += "</div>";
                html += "</div>";
                //}
            }
            html += "</div>";
        //html += "</div>";
    }
    $("#divCatList").html(html); //div that html is built into
    $('.adminView').hide(); //hides 
}

function addToWatchlist(){

}

// var acc = $(".accordion");
// var t;

// for (t = 0; t < acc.length; t++) {
//     acc[t].addEventListener("click", function () {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }