//var dbName = "";

$(document).ready(function () {
    // once the document has finished loading run this lot
    // initialise the UI
    init();

    listCategories(DisplayCategories);
    listDepartments(DisplayDepartments);


    $("#loginToggle").click(function () {
        $("#login").toggle();
    });

    $("#btnSubmitLogin").click(function (event) {
        //event.preventDefault();
        ValidateUser();
        console.log(formKey);
        return false;
    });


    // $("#btnListItems").click(function () {
    //     listItems(DisplayItems);
    // });

    // $("#btnListUsers").click(function () {
    //     listUsers(DisplayUsers);
    // });

    // $("#btnLogin").click(function () {
    //     var loginState = $("#btnLogin").val();
    //     if (loginState === "Log Out"){
    //         // kill the admin cookie
    //         $("#btnLogin").val("Log In");
    //     }

    // });



    let adminIsLoggedIn = IsAdminLoggedIn();
    if (adminIsLoggedIn) {
        // $("#btnListItems").show();
        // $("#btnListUsers").show();
    }
});

function init() {

    initDB();

    // $("#btnListItems").hide();
    // $("#btnListUsers").hide();
    // $("#btnLogin").show();
    // // if cookie has not expired then : 
    // $("#btnLogin").val("Log In");

    $("#login").hide();



}

function initDB() {


  
        UsersObjectStore.forEach(function (user) {
            objStoreUsers.add(user);
        });

        categories.forEach(function (category) {
            objStoreCategories.add(category);
        });

        items.forEach(function (item) {
            objStoreItems.add(item);
        });

        db.onerror = function (event) {
            // Generic error handler for all errors targeted at this database's
            // requests!
            console.error("Database error: " + event.target.error + ", " + event.target.errorCode);
        };

    };
}

function ValidateUser() {

    // get form data
    let formUsername = $("#email").val();
    let formKey = $("#key").val();
    if (formUsername === undefined || formUsername === "") {
        alert("Invalid credentials please try again un");
        return;
    }
    if (formKey === undefined || formKey === "") {
        alert("Invalid credentials please try again pw");
        return;
    }
    //TODO - hash the formkey (password) so that it can be compared to the db

    // new call from the page so need to get a connection to the DB
    //connect to the db
    let request = window.indexedDB.open("dbCat", 2);

    //handle connection error
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later.");
        console.log("155")
    };

    //db connection was successful
    request.onsuccess = function (event) {
        let db = event.target.result;
        //get db data
        let transaction = db.transaction(["UsersObjectStore"]);
        let objectStore = transaction.objectStore("UsersObjectStore");
        // use the index created on the "table" to get the UsersObjectStore usernames 
        let index = objectStore.index("idxUsername");
        let result = index.get(formUsername);// query the index using get

        //function to login
        result.onsuccess = function (e) {
            var match = e.target.result;
            if (match) {
                let username = match.username;
                let key = match.key; // this will be the hashed password
                let role = match.role;
                //compare credentials
                if (formUsername === username && formKey === key) {
                    // valid credentials
                    console.log("db formUsername: " + formUsername);
                    console.log("db role: " + role);

                    if (role === "administrator") {
                        let url = "../Login/crud.html"
                        //redirect to admin page where add/edit/delete functions are found
                        window.location.href = url;
                    }
                    else if (role === "public") {
                        let url = "../Login/myaccount.html"
                        //redirect to public page where watchlist and account functions are found
                        window.location.href = url;
                        console.log(formKey);
                    }
                }
                else {
                    alert("Invalid credentials please try again.");
                }
            } else {
                alert("Invalid credentials please try again");
            }
        };
    };
}



function listItems(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later.");
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db = event.target.result;

        let storeName = "items";
        $("#items").text("");
        let tx = db.transaction(storeName).objectStore(storeName);

        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                //console.log(storeName + ":key id: " + cursor.key + " name:" + cursor.value.name + ", price:" + cursor.value.price);
                callBack(cursor.key, cursor.value.name, cursor.value.desc, cursor.value.price, cursor.value.title, cursor.value.image, cursor.value.category);
                cursor.continue();
            } else {
                // console.log("No more entries!");
            }
        };
    };
}


function listCategories(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 239");
        console.log("error 240")
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db.transaction(storeName).objectStore(storeName);
        $("#categories").text("");
        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                //console.log(storeName + ":key id: " + cursor.key + " Parent category name:" + cursor.value.name + ", parentcategory:" + cursor.value.parentcategory);

                callBack(cursor.key, cursor.value.name, cursor.value.parentcategory);

                cursor.continue();
            } else {
                // console.log("No more entries!");
            }
        };
    };
}

function listDepartments(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 271");
        console.log("error 272")
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db.transaction(storeName).objectStore(storeName);
        $("#categories").text("");
        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                //console.log(storeName + ":key id: " + cursor.key + " Parent category name:" + cursor.value.name + ", parentcategory:" + cursor.value.parentcategory);

                callBack(cursor.key, cursor.value.name, cursor.value.parentcategory);

                cursor.continue();
            } else {
                // console.log("No more entries!");
            }
        };
    };
}

// function listCategoriesRecurse(parent) {
//     // new call from the page so need to get a connection to the DB
//     var request = window.indexedDB.open("natTestDB", 4);
//     request.onerror = function (event) {
//         alert("Unable to retrieve data from the database at this time, please try later.");
//     };

//     // connection was successful
//     request.onsuccess = function (event) {
//         let db = event.target.result;

//         let storeName = "categories";
//         console.log("listCategories: " + parent);
//         let tx = db.transaction(storeName).objectStore(storeName);

//         tx.openCursor().onsuccess = function (event) {
//             var cursor = event.target.result;

//             if (cursor) {
//                 var parentCategory = parseInt(cursor.value.parentcategory);

//                 console.log("cursor parentCategory: " + parentCategory);

//                 if (parentCategory === 0) {
//                     console.log(storeName + ":key id: " + cursor.key + " Parent category name:" + cursor.value.name + ", parentcategory:" + parentCategory);
//                 }
//                 // subcategory
//                 if (parentCategory > 0) {
//                     if (parentCategory === parent) {
//                         console.log(storeName + ":key id: " + cursor.key + " Subcategory name:" + cursor.value.name + ", parentcategory:" + parentCategory);
//                     }
//                     else {
//                         // check for any more subcategories with this parent
//                         listCategories(parentCategory);
//                     }
//                 }
//                 cursor.continue();
//             } else {
//                 // console.log("No more entries!");
//             }
//         };
//     };
// }

function DisplayCategories(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var link = "<li><a class='dropdown-item " + css + "' href='../Categories/" + name + ".html'>" + name + "</a></li>";
    $("#dropdown").append(link);
}

function DisplayDepartments(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var link = "<li><a class='dropdown-item " + css + "' href='../Categories/" + name + ".html'>" + name + "</a></li>";
    $("#AdminDrop").append(link);
}

function DisplayItems(id, name, desc, price, title, image, category) {

    var html = "<div class='classname'>"
    html += "Name" + name;
    html += "</div>";

    html += "<div>";
    html += "Price" + price;
    html += "</div>";

    html += "<img src='images/" + image + "'>";
    html += "(image)" + name;
    html += "</img>";

    //$("#items").append("<br/> ID:" + id + ", Name: " + name + ", desc: " + desc + ", price:" + price + ",title" + title + ",image:" + image + ", category" + category);
    $("#items").append(html);

}

function IsAdminLoggedIn() {
    //check cookie and return t/f
    let adminCookie = true;

    if (adminCookie === true) {
        $("#btnLogin").val("Log out");
    }
    return adminCookie;// test default to true
}



/* todo:
DONE list items
DONE list UsersObjectStore
DONE list categories
DONE list subcategories - in the categories list
login
DONE display login form
DONE create login function - check entered details against the database
DONE display error if the password if wrong
 and create admin cookie if logged in
 OR record logged-in in the database - better?

only show add new buttons for admin login
create CRUD page:
DONE add new item
DONE add new category
add new subcategor
DONE delete old items?
delete old categories?
DONE update existing item ?
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    CRUD Functions                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



