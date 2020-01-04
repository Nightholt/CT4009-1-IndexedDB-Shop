function updateCatData(data) { //func gets input values and replaces old ones with them when called
    var catName = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    data.name = catName;
    data.catDesc = catDesc;
    
    updateOne(data, function(lastID) { //uses updateOne from indexeddb wrapper
        event.preventDefault();
        return false;
    });
}