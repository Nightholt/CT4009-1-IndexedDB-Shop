
//var dbName = "";
//Global variables
const events = [
    {
        // eventDate : 'eventDate',
        // eventLat : 'eventLat',
        // eventLng : 'eventLng'
    }
];

const items = [
    {
        // itemName: "laptop",
        // itemDesc: "computing hardware",
        // itemPrice: "£500",
        // //itemImage: "<img src='../images/laptop.jpeg'></img>"
        // category: "laptops"
    }
];

const users = [
    {
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
    {
        name: "Home",
        parentcategory: "0"
    },
    {
        name: "Kitchen",
        parentcategory: "1"
    },
    {
        name: "Bathroom",
        parentcategory: "1"
    },
    {
        name: "Technology",
        parentcategory: "0",
        subcategory: [
            {
                name: "Hard Drives",
                parentcategory: "4",
            },
            {
                name: "Laptops",
                parentcategory: "4",
            }
        ]
    },
    {
        name: "Recreation",
        parentcategory: "0"
    },
    {
        name: "Games",
        parentcategory: "7"
    },
    {
        name: "Consoles",
        parentcategory: "7"
    },

];

var db, indexedDB, IDBTransaction, currObjectStoreName, databaseName, objectStores;

$(document).ready(function () {

    // once the document has finished loading run this lot
    // initialise the UI
    init();

    // what page are we on?
    var url = window.location.href;
    console.log("youare on the " + url + "page");

    listCategories(DisplayCategoriesMenu);

    // if (url.indexOf("home") !== -1) {
    //     handleHomePageDisplay();
    // }
    if (url.indexOf("catTemplate") !== -1) {
        console.log("**********url: "+ url);
        listCategories(DisplayCategories);   
    }


    listDepartments(DisplayDepartments);


    $("#loginToggle").click(function () {
        $("#login").toggle();
    });

    $("#btnSubmitLogin").click(function (event) {
        //event.preventDefault();
        currObjectStoreName = "users";

        SelectUser();

        //console.log(formKey);
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

    $(".liCat a").click(function (e) {
        e.preventDefault();
        var txt = $(this).text();
        console.log("click event: " + txt);

        // logic 
        // go off to the db with a category id eg 1
        // query the db
        // return the categiry object 
        // push the info of the category object name, image and desc into the div

        DisplayCategoryInDiv($(this).id);
    });


});



function DisplayCategoryInDiv(catId) {

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
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

    // $("#btnListItems").hide();
    // $("#btnListUsers").hide();
    // $("#btnLogin").show();
    // // if cookie has not expired then : 
    // $("#btnLogin").val("Log In");

    $("#login").hide();

}


function initDB() {

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
    // Let us open our database
    // checks user's browser for indexeddb support
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // if browser has no support message will display in console
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    //connect to the db
    //let db1;
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

        let objStoreUsers = db.createObjectStore("users", { autoIncrement: true });
        objStoreUsers.createIndex("idxUsername", "username", { unique: true })

        let objStoreCategories = db.createObjectStore("categories", { autoIncrement: true });
        objStoreCategories.createIndex("idxCategories", "name", { unique: true })

        let objStoreItems = db.createObjectStore("items", { autoIncrement: true });
        objStoreItems.createIndex("idxItems", "name", { unique: true })

        let objStoreEvents = db.createObjectStore("events", { autoIncrement: true });
        objStoreEvents.createIndex("idxEvents", "name", { unique: true })

        // Because the "names" object store has the key generator, the key for the name value is generated automatically.

        users.forEach(function (user) {
            objStoreUsers.add(user);
        });

        categories.forEach(function (category) {
            objStoreCategories.add(category);
        });

        items.forEach(function (item) {
            objStoreItems.add(item);
        });

        events.forEach(function (event) {
            objStoreEvents.add(event);
        });


        db.onerror = function (event) {
            // Generic error handler for all errors targeted at this database's
            // requests!
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


function listCategories(callBack) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("dbCat", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 261");
        console.log("error 262")
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
        alert("Unable to retrieve data from the database at this time, please try later. 309");
        console.log("error 294")
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

function DisplayCategoriesMenu(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var ahref = "<a class='dropdown-item " + css + "' href='../CatTemplate/catTemplate.html#" + id + "'>" + name + "</a>";

    var link = "<li>" + ahref + "</li>";
    $("#dropdown").append(link);
}

function DisplayCategories(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var ahref = "<a class='liCat dropdown-item " + css + "' href='#'>" + name + "</a>";

    var link = "<li>" + ahref + "</li>";  

    $("#categoryPageCategoriesList").append(link);
}

function DisplayDepartments(id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var link = "<li><a class='dropdown-item " + css + "' href='../Categories/" + name + ".html'>" + name + "</a></li>";
    $("#AdminDrop").append(link);
}

// function DisplayItems(id, name, desc, price, title, image, category) {

//     var html = "<div class='classname'>"
//     html += "Name" + name;
//     html += "</div>";

//     html += "<div>";
//     html += "Price" + price;
//     html += "</div>";

//     html += "<img src='images/" + image + "'>";
//     html += "(image)" + name;
//     html += "</img>";

//     //$("#items").append("<br/> ID:" + id + ", Name: " + name + ", desc: " + desc + ", price:" + price + ",title" + title + ",image:" + image + ", category" + category);
//     $("#items").append(html);

// }

function IsAdminLoggedIn() {
    //check cookie and return t/f
    let adminCookie = true;

    if (adminCookie === true) {
        $("#btnLogin").val("Log out");
    }
    return adminCookie;// test default to true
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
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
DONE delete old items?
DONE update existing item ?
DONE Fix list items functions


New Category makes new page
add new subcategory
Display items in category pages
Add items to a watchlist
delete old categories
login cookies
*/

function SelectUser() {

    startDB("", DisplayError);

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
    let index = objectStore.index("idxUsername");
    let result = index.get(formUsername);// query the index using get


    result.onerror = indexedDBError;
    result.onsuccess = function (event) {
        // event.target means request

        var record = result.result;

        if (record) {

            ValidateSelectedUser(formUsername, formKey, record);

            return;
        }
    };
}


function ValidateSelectedUser(formUsername, formKey, match) {

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
