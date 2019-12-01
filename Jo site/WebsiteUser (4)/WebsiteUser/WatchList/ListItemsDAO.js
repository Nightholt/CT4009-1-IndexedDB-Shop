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
                    <td>' + (i + 1) + '</td>\
                    <td class = "itemImg"><img src='+ results[i].itemImg +' width="200px" height="200px"></td>\
                    <td class = "itemName">' + results[i].itemName + '</td>\
                    <td class = "itemDesc">' + results[i].itemDesc + '</td>\
                    <td class = "price">' + results[i].price + '</td>\
                    <td><a onclick="deleteOne(parseInt(this.parentElement.parentElement.id));location.reload()" class="Delete">Delete</a></td>\
                    \
                </tr>'

                    
              
                );
    }
})
}

function deleteAll(){
    selectAll(function(results){
        var lenh = results.length;
        
        for(x=0; x < lenh; x++){
            deleteOne(results[x].id);
            console.log(results[x].id)
        }location.reload();
    });
}
