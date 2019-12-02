setDatabaseName('dbCat1', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('items');
startDB(function() {
    showAllItems();
});