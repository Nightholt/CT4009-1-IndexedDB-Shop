setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories', 'events']);
setCurrObjectStoreName('items');
startDB(function() {
    showAllItems();
});