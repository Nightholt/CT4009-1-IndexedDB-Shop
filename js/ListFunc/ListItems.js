setDatabaseName('dbCat', ['users', 'items', 'categories']);
setCurrObjectStoreName('items');
startDB(function() {
    showAllItems();
});