setDatabaseName('WebsiteDB', ['ProductObjectStore', 'CategoriesStore', 'SubCategoriesStore', 'ItemsStore', 'LocationStore']);
    
    setCurrObjectStoreName('CategoriesStore');
    
    startDB(function (){
        showAllItems();
    });