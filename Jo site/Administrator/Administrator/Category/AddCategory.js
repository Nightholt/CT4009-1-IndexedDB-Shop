$('#formSellItem').submit(function(event){
    event.preventDefault();
    
    setDatabaseName('WebsiteDB', ['ProductObjectStore', 'CategoriesStore', 'SubCategoriesStore', 'ItemsStore', 'LocationStore']);
    
    setCurrObjectStoreName('CategoriesStore');
    
    startDB(function (){
        saveItemData();
        alert("Item has been saved");
    });
});
                          
                          