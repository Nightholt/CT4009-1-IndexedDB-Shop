setDatabaseName('dbCat', ['users', 'items', 'categories', 'subcategories ', 'events', 'watchlist']);
setCurrObjectStoreName('watchlist'); //pulls data from watchlist store
startDB(function() {
    showAllItems(); //calls func in ListItemsDAO.js
});