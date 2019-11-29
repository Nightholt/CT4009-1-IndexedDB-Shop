setDatabaseName('dbCat', ['UsersObjectStore', 'ItemsObjectStore', 'CatObjectStore']);
setCurrObjectStoreName('ItemsObjectStore');
startDB(function() {
    showAllItems();
});