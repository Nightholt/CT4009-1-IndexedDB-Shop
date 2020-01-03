setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('watchlist');
startDB(function() {
    showAllItems();
});