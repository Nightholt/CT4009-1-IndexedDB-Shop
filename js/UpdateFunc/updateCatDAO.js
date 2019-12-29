function updateCatData(data) {
    var name = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    data.catName = name;
    data.catDesc = catDesc;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}