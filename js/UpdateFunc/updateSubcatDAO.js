function updateSubcatData(data) { //func gets input values and replaces old ones with them when called
    var subcatName = $('#txtSubcatName').val();
    var subcatDesc = $('#txtSubcatDesc').val();

    data.subcatName = subcatName;
    data.subcatDesc = subcatDesc;
    
    updateOne(data, function(lastID) { //uses updateOne from indexeddb wrapper
        event.preventDefault();
        return false;
    });
}