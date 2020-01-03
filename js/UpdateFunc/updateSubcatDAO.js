function updateSubcatData(data) {
    var subcatName = $('#txtSubcatName').val();
    var subcatDesc = $('#txtSubcatDesc').val();

    data.subcatName = subcatName;
    data.subcatDesc = subcatDesc;
    
    updateOne(data, function(lastID) {
        event.preventDefault();
        return false;
    });
}