setDatabaseName('dbCat', ['users', 'items', 'categories', 'events']);
setCurrObjectStoreName('items');
startDB(function() {
    showAllItems();
});