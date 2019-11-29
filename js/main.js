//var dbName = "";
//Global variables

// hello nat !

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
        SelectUser();
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
    startDB("", function () {

    });
    users.forEach(function (user) {
        console.log(user);
        insertOne(user, "UsersObjectStore")
    });

    categories.forEach(function (category) {
        console.log(category);
        insertOne(user, "CatObjectStore")
    });

    items.forEach(function (item) {
        console.log(item);
        insertOne(user, "ItemsObjectStore")
    });

}

function listItems(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later.");
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db1 = event.target.result;

        let storeName = "items";
        $("#items").text("");
        let tx = db1.transaction(storeName).objectStore(storeName);

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
        let db1 = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db1.transaction(storeName).objectStore(storeName);
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
        let db1 = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db1.transaction(storeName).objectStore(storeName);
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
DONE list users
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

//This is an indexeddb wrapper javascript library

var db, indexedDB, IDBTransaction, currObjectStoreName, databaseName, objectStores;


//startDB creates connection with the databaseName
//and create database and object stores
function startDB(successCallback, failureCallback) {
    try {
        indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    }
    catch (e) {
        console.log('Initial IndexedDB error: ' + e);
        failureCallback();
    }

    if (!window.indexedDB) {
        failureCallback();
        return;
    }

    var request = indexedDB.open(databaseName, 1);

    //The onupgradeneeded property is triggered when a database 
    //of a bigger version number than the existing stored database is loaded.
    request.onupgradeneeded = function (event) {
        console.log('onupgradeneeded method is invoked');
        db = event.target.result;
        for (i = 0; i < objectStores.length; i++) {
            db.createObjectStore(objectStores[i], { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        successCallback && successCallback();
    };

    request.onerror = function (event) {
        console.log('User don\'t allow IndexedDB to use offline storage.');
        failureCallback();
    };
}

//Just print any indexeddb related error message in console window
function indexedDBError(event) {
    console.log('An error occurred in IndexedDB', event);
}

//setDatabaseName sets the Database name and Object Stores required for a website
function setDatabaseName(dbName, objStores) {
    databaseName = dbName;
    objectStores = objStores;
    console.log('Database : ', dbName);
}

//setCurrObjectStoreName set the current object store to store or retrieve data
function setCurrObjectStoreName(objStoreName) {
    currObjectStoreName = objStoreName;
    console.log('Current Object Store Name : ', currObjectStoreName);
}

//selectAll retrieves all data from the current object store
function selectAll(successCallback) {
    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_ONLY || 'readonly'),
        objectStore, request, results = [];

    transaction.onerror = indexedDBError;
    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.openCursor();

    request.onerror = indexedDBError;
    request.onsuccess = function (event) {
        // event.target means request
        var cursor = event.target.result;
        if (!cursor) {
            if (successCallback) {
                successCallback(results);
            }
            return;
        }
        results.push(cursor.value);
        cursor.continue();
    };
}

//insertOne inserts data into the current object store
//This function also creates unique id for each data
function insertOne(data, successCallback) {
    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
        objectStore, request, lastID;

    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.add(data);
    request.onsuccess = function (event) {
        lastID = event.target.result;
    }
    request.onerror = indexedDBError;

    transaction.onerror = indexedDBError;

    transaction.oncomplete = function (event) {
        console.log('Data was inserted succesfully');
        if (successCallback) {
            successCallback(lastID);
        }
    };
}

//deleteOne inserts data into the current object store
function deleteOne(id, successCallback) {
    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
        objectStore, request;

    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.delete(id);
    request.onerror = indexedDBError;
    request.onsuccess = function (event) {
        var result = event.target.result;
    };
    transaction.onerror = indexedDBError;
    transaction.oncomplete = function () {
        console.log('Data with ' + id + ' was deleted successfully');
        if (successCallback) {
            successCallback();
        }
    };
}

//updateOne updates a specific data in the current object store
function updateOne(data, successCallback) {
    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
        objectStore, request, lastID;

    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.put(data);
    request.onsuccess = function (event) {
        lastID = event.target.result;
    }
    request.onerror = indexedDBError;

    transaction.onerror = indexedDBError;

    transaction.oncomplete = function (event) {
        console.log('Data with ' + lastID + ' was deleted successfully');
        if (successCallback) {
            successCallback(lastID);
        }
    };
}

//selectOne select just one data
function selectOne(id, successCallback) {
    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_ONLY || 'readonly'),
        objectStore, request;

    transaction.onerror = indexedDBError;
    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.get(parseInt(id));

    request.onerror = indexedDBError;
    request.onsuccess = function (event) {
        // event.target means request

        var record = request.result;

        if (record) {

            if (successCallback) {

                successCallback(record);
            }
            return;
        }
    };
}




function SelectUser() {

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

    var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_ONLY || 'readonly'),
        objectStore, request;

    transaction.onerror = indexedDBError;
    objectStore = transaction.objectStore(currObjectStoreName);
    request = objectStore.get(parseInt(formUsername));

    request.onerror = indexedDBError;
    request.onsuccess = function (event) {
        // event.target means request

        var record = request.result;

        if (record) {


            ValidateSelectedUser(record);

            return;
        }
    };
}


function ValidateSelectedUser(match) {

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

}
