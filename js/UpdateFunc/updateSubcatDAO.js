function updateCatData(data) {
    var catName = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    data.name = catName;
    data.catDesc = catDesc;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}