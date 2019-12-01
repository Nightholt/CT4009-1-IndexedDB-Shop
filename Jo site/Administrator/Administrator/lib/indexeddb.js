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
		catch(e) {
			console.log('Initial IndexedDB error: ' + e);
			failureCallback();
		}
		
		if(!window.indexedDB) {
			failureCallback();
			return;
		}

$(document).ready(function(){
	startDB();
	listCategories(DisplayCategories);
	listCategories(DisplayCategories,"categoryPageCategoriesList");

    $(".liCat").click(function (e) {
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

})

function DisplayCategoryInDiv(catId) {

    setDatabaseName('WebsiteDB', ['ProductObjectStore', 'CategoriesStore', 'SubCategoriesStore', 'ItemsStore', 'LocationStore']);
    
    setCurrObjectStoreName('CategoriesStore');
    var data;
    startDB(function () {
        selectOne(catId, function (result) {            
            data = result;            
            $("#categoryDiv").html("category: " + data.name);
        })
    })
}

		var request = indexedDB.open(databaseName, 1);
			
		//The onupgradeneeded property is triggered when a database 
		//of a bigger version number than the existing stored database is loaded.
		request.onupgradeneeded = function(event) {
			console.log('onupgradeneeded method is invoked');
			db = event.target.result;
			for(i=0; i < objectStores.length; i++) {
				db.createObjectStore(objectStores[i], { keyPath: 'id', autoIncrement: true });
			}
		};

		request.onsuccess = function(event) {
			db = event.target.result;
			successCallback && successCallback();
		};

		request.onerror = function(event) {
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
		request.onsuccess = function(event) {
			// event.target means request
			var cursor = event.target.result;
			if(!cursor) {
				if(successCallback) {
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
		request.onsuccess = function(event) {
			lastID = event.target.result;
		}
		request.onerror = indexedDBError;
		
		transaction.onerror = indexedDBError;

		transaction.oncomplete = function(event) {
			console.log('Data was inserted succesfully');
			if(successCallback) {
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
		request.onsuccess = function(event) {
			var result = event.target.result;
		};
		transaction.onerror = indexedDBError;
		transaction.oncomplete = function() {
			console.log('Data with ' + id + ' was deleted successfully');
			if(successCallback) {
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
		request.onsuccess = function(event) {
			lastID = event.target.result;
		}
		request.onerror = indexedDBError;
		
		transaction.onerror = indexedDBError;

		transaction.oncomplete = function(event) {
			console.log('Data with ' + lastID + ' was deleted successfully');
			if(successCallback) {
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
		request.onsuccess = function(event) {
			// event.target means request
			
			var record = request.result;
			
			if(record) {
				
				if(successCallback) {
					
					successCallback(record);
				}
				return;
			}
		};
	}
	



	function listCategories(callBack, targetElementId) {
    // new call from the page so need to get a connection to the DB
    var request = window.indexedDB.open("WebsiteDB", 2);
    request.onerror = function (event) {
        alert("Unable to retrieve data from the database at this time, please try later. 261");
        console.log("error 262")
    };

    // connection was successful
    request.onsuccess = function (event) {
        let db1 = event.target.result;
        console.log("success")

        let storeName = "CategoriesStore";
        let tx = db1.transaction(storeName).objectStore(storeName);
        $("#CategoriesStore").text("");
        tx.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                //console.log(storeName + ":key id: " + cursor.key + " Parent category name:" + cursor.value.name + ", parentcategory:" + cursor.value.parentcategory);

                callBack(targetElementId,cursor.key, cursor.value.name, cursor.value.parentcategory);

                cursor.continue();
            } else {
                // console.log("No more entries!");
            }
        };
    };
}


function DisplayCategories(targetId, id, name, parentcategory) {
    var css = "";
    if (parentcategory > 0) {
        css = "indent";
    }
    var link = "<li class='liCat'><a class='dropdown-item " + css + "' href='../NavigateItem/" + name + ".html'>" + name + "</a></li>";
    $("#"+ targetId).append(link);
}
