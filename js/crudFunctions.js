//This is an indexeddb wrapper javascript library

//Global variables
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

$(document).ready(function () {
    // once the document has finished loading run this lot
    // initialise the UI
    init();

    function init() {

        initDB();

        $("#login").hide();

        $("#btnSubmitLogin").click(function (event) {
            SelectUser();
        }

    };


    function initDB() {

        users.forEach(function (user) {
            insertOne(user, "UsersObjectStore")
        });

        categories.forEach(function (category) {

            insertOne(user, "CatObjectStore")
        });

        items.forEach(function (item) {

            insertOne(user, "ItemsObjectStore")
        });

    };


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



//selectOne select just one data
function SelectUser() {
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

                if (successCallback) {

                    ValidateSelectedUser(record);
                }
                return;
            }
        };
    }


function ValidateSelectedUser(match) {
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