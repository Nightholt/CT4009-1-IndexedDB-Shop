function showAllItems(){
    
    selectAll(function(results){
        
        var len = results.length, i;
       
        for(i=0; i < len; i++){
            if(parseInt(results[i].id) == -99)
            {
                for(x=0; x <= i; x++){
                    deleteOne(results[x].id);
                }
                location.reload();
            }
            $('#tableAllItems').append(
                '<tr id="' + results[i].id + '">\
                    <td>' + results[i].id + '</td>\
                    <td class = "CategoryName">' + results[i].CategoryName + '</td>\
                    <td><a onclick="deleteOne(parseInt(this.parentElement.parentElement.id));location.reload()" class="Delete">Delete</a></td>\
                    <td><a href="#" class="Update">Update</a></td>\
                </tr>'

        
              
                );
    }
})
    
}