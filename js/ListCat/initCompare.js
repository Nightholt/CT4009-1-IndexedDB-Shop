//script to add max two items to compare list at bottom of page
        var compareItemsList = [];
        var maxItemsToCompare = 2;

        $(document).ready(function () {

            initialisePage();

            $(document).on("change", "input[class='cellChkbox']", function () {

                //guard for if checkbox value is empty
                if ($(this).is(":checked")) {
                    var chkBoxId = this.id;
                    if (chkBoxId === undefined && chkBoxId === "") {
                        alert("please select an item to compare");
                        return false;
                    }
                    var idArray = chkBoxId.split("_");
                    var itemId = idArray[1];

                    AddItemToCompare(itemId);
                } else {
                    HideCompareDiv(); //hide compare div when not in use
                }
            });
            

            function AddItemToCompare(itemId) {

                var numberOfExistingItems = compareItemsList.length;
                // check if wanted item exists
                if (numberOfExistingItems > 0 && (compareItemsList.includes("itemId"))) {
                    alert("This item is already being compared.");
                    return;
                }

                if (numberOfExistingItems < maxItemsToCompare) {
                    // add the item if items in compare are less than 2
                    compareItemsList.push(itemId);
                    //creates div for items to go in side by side
                    var itemDivhtml = "<div class='leftCellCompare' id='cellCompare_" + itemId + "'>" + $("#cellItem_" + itemId).html();
                    itemDivhtml += "<br />";
                    //option to remove item
                    itemDivhtml += "<input type='button' id='removeCompareItem_" + itemId + "' class='removeCompareItem' value='Remove' /> "
                    itemDivhtml += "</div>";

                    $("#divCompareList").append(itemDivhtml); //defines which div to put compare items in
                    ShowCompareDiv(); //show compare function now values are added
                }
                else {
                    alert("Only " + maxItemsToCompare + " items can be compared."); //returns if max items are already in div
                }
            }

            //event to called remove func
            $(document).on("click", "input[class='removeCompareItem']", function () {
                var classId = this.id;
                console.log("removeCompareItem click classId: " + classId);
                var idArray = classId.split("_");
                var itemId = idArray[1];

                RemoveItemToCompare(itemId);
            });

            //function to remove item from compare
            function RemoveItemToCompare(itemId) {
                compareItemsList.pop(itemId);

                $("#compareCheckBox_" + itemId).prop("checked", false); //unchecks checkbox

                $("#cellCompare_" + itemId).remove(); //removes item with matching id

                HideCompareDiv(); //hide compare div now not in use again
            }

        });
        function initialisePage() {
            console.log("initialisePage called")
            setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
            setCurrObjectStoreName('categories');
            startDB(function () { // async func
                getAllCategories(FormatCategoriesAndItemsAsHtml);
            });
            HideCompareDiv();
        }

        //hide compare div when empty
        function HideCompareDiv() {
            if (compareItemsList.length === 0) {
                $("#divCompare").hide();
            }
        }

        //show compare div when values added
        function ShowCompareDiv() {
            $("#divCompare").show();
            $("#divCompareList").show();
        }