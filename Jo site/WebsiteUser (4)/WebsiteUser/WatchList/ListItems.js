setDatabaseName('WebsiteDB', ['ProductObjectStore', 'CategoriesStore', 'SubCategoriesStore', 'ItemsStore', 'LocationStore']);
    
    setCurrObjectStoreName('ProductObjectStore');
     
    
    startDB(function (){
        showAllItems();
    });