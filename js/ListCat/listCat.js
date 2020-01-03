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
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
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
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
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
        html += "   <div class='adminView'>";
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
                html += "       <div class='adminView'>";
                html += "           <button type='button' class='btn btn-danger deleteActionSubcat'>Delete</button><br/>";
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

    $('.deleteAction').click(function () {
        var catID = parseInt($(this).parent().attr('id'));
        if (!confirm("Are you sure you want to delete this Category with its items?")){
            return;
        };

        deleteOne(catID, function () {
            alert("Category " + catID + " was deleted successfully");
            location.reload();
        })
        return false;
    });

    $('.deleteActionItem').click(function () {
        var idArray = $(this).parent().attr('id').split("_");
        var itemID = parseInt(idArray[1]);
        if (!confirm("Are you sure you want to delete this item?")){
            return;
        };

        deleteOne(itemID, function () {
            alert("item " + itemID + " was deleted successfully");
            location.reload();
        })
        return false;
    });
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
    html += "       <div class='adminView'>";
    html += "           <button type='button' class='btn btn-danger deleteActionItem'>Delete</button><br/>";
    html += "           <button type='button' class='btn btn-info updateActionItem'>Update</button><br/>";
    html += "       </div>";
    //checkbox to add to compare div
    html += "       <div class='checkbox'><input class='cellChkbox' type='checkbox' name='compare' value='Add to Compare' id='compareCheckBox_" + itemId + "'/><label for='compareCheckBox_" + itemId + "'> Add to compare</label></div>";
    //checkbox to add to watchlist
    html += "       <div class='checkbox'><input class='watchChkbox' type='checkbox' name='watch' value='Add to Watchlist' id='watchCheckBox_" + itemId + "'/><label for='watchCheckBox_" + itemId + "'> Add to watchlist</label></div>";
    html += "       <div class='buy'><button id='buy' class='btn btn-success' value='Buy'>Buy</button></div>";
    html += "   </div>";
    return html;
}

$("#buy").click(function(){
    buyClick();
})

function buyClick() {
    var html = html;
    html += "<a href='../../Search/results.html'></a>";
}

// var acc = $(".accordion");
// var t;

// for (t = 0; t < acc.length; t++) {
//     acc[0t].addEventListener("click", function () {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }