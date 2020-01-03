$(document).on('change', '#fileItemImage', function(event) {
    previewFile();
});

//func to view preview of image before submitting
function previewFile(){
    var preview = document.querySelector('img#bannerImg');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () { //source of img preview
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //show preview
    } else {
        preview.src = ""; //preview empty
    }
}

//data saved to db on form submit
$('#formSellItem').submit(function(event)  { 
    console.log("AdminDrop: " + $('#AdminDrop').val());
    event.preventDefault();
    if ($('#AdminDrop').val() === '0'){ //guard against empty input
        alert("Please Select a Category");
        return false;
    }

    setDatabaseName('dbCat', ['users', 'items', 'categories', 'events', 'watchlist']);
    setCurrObjectStoreName('items');
        startDB(function () {
        saveItemData();
        alert("Item has been saved successfully");
        location.reload();
        return true;
        
    });
});