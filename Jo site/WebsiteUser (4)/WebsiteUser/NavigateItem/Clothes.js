function display(){
	alert ("An item was added to your watchlist!");
}

//geting the element comaprision from the html file
	var comparison = document.getElementById("comparison");

function Clothes(){
// Get the button that opens the modal
var btn = document.getElementById("modalCompareTShirt");
// gets the id button that will close the modal
var closeButton = document.getElementsByClassName("close")[0];
//Opens the modal 
btn.onclick = function() {
  comparison.style.display = "block";
}
//closes the modal
closeButton.onclick = function() {
  comparison.style.display = "none";
}
}

function Jeans(){
// Get the button that opens the modal
var btn = document.getElementById("modalCompareJeans");
// gets the id button that will close the modal
var span = document.getElementsByClassName("close")[0];
//Opens the modal 
btn.onclick = function() {
  comparison.style.display = "block";
}
//closes the modal
span.onclick = function() {
  comparison.style.display = "none";
}
}

function Glasses(){
// Get the button that opens the modal
var btn = document.getElementById("modalCompareGlasses");
// gets the id button that will close the modal
var span = document.getElementsByClassName("close")[0];
//Opens the modal 
btn.onclick = function() {
  comparison.style.display = "block";
}
//closes the modal
span.onclick = function() {
  comparison.style.display = "none";
}
}

function Desktops(){
// Get the button that opens the modal
var btn = document.getElementById("modalCompareDesktops");
// gets the id button that will close the modal
var span = document.getElementsByClassName("close")[0];
//Opens the modal 
btn.onclick = function() {
  comparison.style.display = "block";
}
//closes the modal
span.onclick = function() {
  comparison.style.display = "none";
}
}




 function showImage(){
        document.getElementById('loadingImage').style.visibility="visible";
    }

function DisplayTshirt() {
  var itemToCompare = document.getElementById("Tshirt");
  var index = 0;
    if(isUsed[index])
    {
      DisableBtns(false)
      selected--
      isUsed[index] = false;
    }
    else
    {
      isUsed[index] = true;
      if(++selected >= 2)
      {
        DisableBtns(true)
      }
    }
 // gets the id
  if (itemToCompare.style.display === "none") { // if the item is being hidden then when the button is pressed it will make it appear
    itemToCompare.style.display = "block";
  } else {
    itemToCompare.style.display = "none"; // if the item is visible then when the button is pressed it will become hidden once again
  }
}



    function DisplayJeans() {
    var itemToCompare = document.getElementById("Jeans");
    var index = 1;
      if(isUsed[index])
    {
      DisableBtns(false)
      selected--
      isUsed[index] = false;
    }
    else
    {
      isUsed[index] = true;
      if(++selected >= 2)
      {
        DisableBtns(true)
      }
    }

  if (itemToCompare.style.display === "none") {
    itemToCompare.style.display = "block";
  } else {
    itemToCompare.style.display = "none";
  }

}


  function DisplayGlasses() {
    var itemToCompare = document.getElementById("Glasses");
    var index = 2;
      if(isUsed[index])
    {
      DisableBtns(false)
      selected--
      isUsed[index] = false;
    }
    else
    {
      isUsed[index] = true;
      if(++selected >= 2)
      {
        DisableBtns(true)
      }
    }

  if (itemToCompare.style.display === "none") {
    itemToCompare.style.display = "block";
  } else {
    itemToCompare.style.display = "none";
  }
}

   function DisplayDesktops() {
      var itemToCompare = document.getElementById("Desktops");
       var index = 3;
      if(isUsed[index])
    {
      DisableBtns(false)
      selected--
      isUsed[index] = false;
    }
    else
    {
      isUsed[index] = true;
      if(++selected >= 2)
      {
        DisableBtns(true)
      }
    }

  if (itemToCompare.style.display === "none") {
    itemToCompare.style.display = "block";
  } else {
    itemToCompare.style.display = "none";
  }
}

var isUsed = [false, false, false, false]
var btns = ["btn1", "btn2", "btn3", "btn4"]
var selected = 0;

function DisableBtns(dis)
{
  for (var i = 0; i < 4; i++) {
    if(!isUsed[i])
    {
      document.getElementById(btns[i]).disabled = dis;
    }
  }
}

function watchlist(img, name, desc, category, price)
{
  setDatabaseName('WebsiteDB', ['ProductObjectStore', 'CategoriesStore', 'SubCategoriesStore', 'ItemsStore', 'LocationStore']);
    
    setCurrObjectStoreName('ProductObjectStore');
    
    startDB(function (){
        saveItemData(img, name, desc, category, price);
        alert("Item has been saved");
    });
}

function saveItemData(itemImg,itemName, itemDesc, itemCategory, price){  
    var data={
        'itemImg': itemImg,
        'itemName': itemName,
        
        'itemDesc': itemDesc,
        'itemCategory': itemCategory,
        'price': price
    };
    
    insertOne(data,function(lastID){
        event.preventDefault();
        return false;
    });
}