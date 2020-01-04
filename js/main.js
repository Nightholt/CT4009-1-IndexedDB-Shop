
//Global variables
const loginAdminCookieName = "elephant";
const loginCookieDays = 1;

//build db tables
const events = [

];

const items = [

];

const users = [{
    username: "public@test.com",
    key: "321password",
    role: "public",
    isLoggedIn: false
},
{
    username: "admin@test.com",
    key: "password123",
    role: "administrator",
    isLoggedIn: false
}
];

const categories = [

];

const subcategories = [

]

const watchlist = [

]

var db, indexedDB, IDBTransaction, currObjectStoreName, databaseName, objectStores;

$(document).ready(function () {

    // once the document has finished loading run this lot
    // initialise the UI
    init();

    //displays page url in console
    var url = window.location.href;
    console.log("you are on the " + url + "page");

    listCategories(displayCategoriesMenu);

    if (url.indexOf("catTemplate") !== -1) {
        console.log("**********url: " + url);
        listCategories(displayCategories);
    }

    //functions to show categories from db in selections
    listDepartments(displayDepartments); 
    listSubDepts(displaySubDepts);

    //login field drops down when clicked, off by default
    $("#loginToggle").click(function () { 
        $("#login").toggle();
    });

    //login func fired when form submitted
    $("#btnSubmitLogin").click(function (event) {
        setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
        setCurrObjectStoreName('users');
        startDB(function () {
            getAllUsers();
        });

    });

    //func to validate login credentials
    function getAllUsers() {
        var isValidUser = false;
        var validUser;
        selectAll(function (results) {
            var len = results.length;
            var i;
            for (i = 0; i < len; i++) { // loop over the users
                let dbUser = results[i];
                isValidUser = ValidateUser(dbUser);
                if (isValidUser) {
                    validUser = dbUser;
                    break;
                }
            }

            if (!isValidUser) {
                alert("Please login with valid credentials.");
                return;
            }

            if (validUser.role === "administrator") {
                //redirect to admin page where add/edit/delete functions are found 
                url = "../Login/crud.html"
            } else if (validUser.role === "public") {
                //redirect to public page where watchlist and account functions are found
                url = "../WatchList/watch.html"
            }
            
            window.location.href = url;
        });

    }

    //logic to check credentials are correct
    function ValidateUser(dbUser) {

        // get form data
        var redirectUrl = "";
        let formUsername = $("#email").val();
        let formKey = $("#key").val();

        if (formUsername === undefined || formUsername === "") {
            alert("Invalid credentials please try again un");
            return false;
        }
        if (formKey === undefined || formKey === "") {
            alert("Invalid credentials please try again pw");
            return false;
        }

        if (dbUser) {
            let username = dbUser.username;
            let key = dbUser.key; // this will be the hashed password            
            //compare credentials
            if (formUsername === username && formKey === key) {
                return true;
            } else {
                console.log("no user match found.");
                return false;
            }
        } else {
            console.log("no user found");
            return false;
        }
    }

    //displays categories in nav dropdown when clicked
    $(".liCat a").click(function (e) {
        e.preventDefault();
        var txt = $(this).text();
        console.log("click event: " + txt);

        DisplayCategoryInDiv($(this).id);
    });
});

//gets categories from db to display in div
function DisplayCategoryInDiv(catId) {

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
    setCurrObjectStoreName('categories');
    var data;
    startDB(function () {
        selectOne(catId, function (result) {
            data = result;
            $("#categoryDiv").html("category: " + data.name);
        })
    })
}

function DisplayError() {
    console.error("There was an error");
}

function init() {

    initDB();

    //hides login form on page load
    $("#login").hide();

}

function initDB() {
    
    //open database
    setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events', 'watchlist']);
    //checks user's browser for indexeddb support
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    //This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    //if browser has no support message will display in console
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Several features will not be available.");
    }
    //connect to the db
    let request = window.indexedDB.open(databaseName, 2);

    // handle any connection error
    request.onerror = function (event) {
        console.log("request error: unknown 84");
    };

    //handle connection success
    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("success: " + db);
        console.log('Database : ', databaseName);
    };

    // this only happens once to create the db is a new version update is required or the db is deleted manually
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        console.log("onupgradeneeded: " + db);

        //each table is defined here, ready for values to be added
        let objStoreUsers = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });

        let objStoreCategories = db.createObjectStore("categories", { keyPath: "id", autoIncrement: true });

        let objStoreSubcategories = db.createObjectStore("subcategories", { keyPath: "id", autoIncrement: true });

        let objStoreItems = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });

        let objStoreEvents = db.createObjectStore("events", { keyPath: "id", autoIncrement: true });

        let objStoreWatchlist = db.createObjectStore("watchlist", { keyPath: "id", autoIncrement: true });

        //key values generated automatically.

        users.forEach(function (user) {
            objStoreUsers.add(user);
        });

        categories.forEach(function (category) {
            objStoreCategories.add(category);
        });

        subcategories.forEach(function (subcategory) {
            objStoreSubcategories.add(subcategory);
        });

        items.forEach(function (item) {
            objStoreItems.add(item);
        });

        events.forEach(function (event) {
            objStoreEvents.add(event);
        });

        watchlist.forEach(function (item) {
            objStoreWatchlist.add(item);
        });

        db.onerror = function (event) {
            // Generic error handler for all errors targeted at db's requests
            console.error("Database error: " + event.target.error + ", " + event.target.errorCode);
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

//callback to func to display cats in div
function listCategories(callBack) {
    // new call from the page so need to get a connection to db
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 261");
        console.log("error 262")
    };

    //connection was successful
    request.onsuccess = function (event) {
        let db1 = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db1.transaction(storeName).objectStore(storeName);
        $("#categories").text("");
        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                callBack(cursor.key, cursor.value.name, cursor.value.parentcategory);
                cursor.continue();
            } else {
                //console.log("No more entries");
            }
        };
    };
}

//callback to func to display cats in selection
function listDepartments(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 309");
        console.log("error 294")
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db1 = event.target.result;
        console.log("success")

        let storeName = "subcategories";
        let tx = db1.transaction(storeName).objectStore(storeName);

        // initialise the depts dropdown
        $("#subcategories").text("");
        var option = "<option value='0'>Select Department Subcategory</option>";
        $("#AdminDrop").append(option);

        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                callBack(cursor.key, cursor.value.subcatName, cursor.value.parentcategory);

                cursor.continue();
            } else {
                //console.log("No more entries");                
            }

        };
    };
}

//callback to func to display subcats in selection
function listSubDepts(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 309");
        console.log("error 294")
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db1 = event.target.result;
        console.log("success")

        let storeName = "categories";
        let tx = db1.transaction(storeName).objectStore(storeName);

        // initialise the depts dropdown
        $("#categories").text("");
        var option = "<option value='0'>Select Department Category</option>";
        $("#AdminDrop1").append(option);

        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                callBack(cursor.key, cursor.value.name, cursor.value.parentcategory);

                cursor.continue();
            } else {
                //console.log("No more entries");                
            }

        };
    };
}

//adds cat into dropdown div with link to specific cat
function displayCategoriesMenu(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var ahref = "<a class='dropdown-item " + css + "' href='../CatTemplate/catTemplate.html#" + id + "'>" + name + "</a>";

    var link = "<li>" + ahref + "</li>";
    $("#dropdown").append(link);
}

//displays cat in dropdown div
function displayCategories(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var ahref = "<a class='liCat dropdown-item " + css + "' href='#'>" + name + "</a>";

    var link = "<li>" + ahref + "</li>";

    $("#categoryPageCategoriesList").append(link);
}

//adds cat to option selection
function displayDepartments(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }

    var option = "<option class='" + css + "' value='" + id + "'>" + name + "</option>";

    $("#AdminDrop").append(option);
}

//adds subcat to subcat option selection
function displaySubDepts(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }

    var option = "<option class='" + css + "' value='" + id + "'>" + name + "</option>";

    $("#AdminDrop1").append(option);
}

//cookie function - not used
function IsAdminLoggedIn() {
    //check cookie and return t/f
    let adminCookie = true;

    if (adminCookie === true) {
        $("#btnLogin").val("Log out");
    }
    return adminCookie; // test default to true
}