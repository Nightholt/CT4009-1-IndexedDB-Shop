function saveItemData(){
    var CategoryName = $('#txtCategoryName').val();

   
    
    var data={
        'CategoryName': CategoryName
       
    };
    
    insertOne(data,function(lastID){
        event.preventDefault();
        return false;
    });
}

