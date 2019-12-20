var wholePage = `<!DOCTYPE html>
<html lang="en-gb">

<head>
  <meta name="description" content="catalogue and shopping website">
  <!--helps search engines define what the purpose of the site is-->
  <meta name="keywords" content="shopping, search, catalogue">
  <meta charset="utf-8">
  <!--defines correct character set-->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--ensures site will render correctly on all platforms, primarily mobile-->

  <!--links to the Boostrap CDN-->
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

  <script src="../js/lib/indexeddb.js"></script>
  <script src="../js/main.js"></script>


  <title>Catalogue Website</title>
  <!--title of site-->

  <style>
    .categoryDisplayText {
      border: 1px solid silver;
      height: 300px;
      min-width: 500px;

    }
  </style>

</head>

<body>


  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <!--makes navbar dark and controls spacing of items-->
    <a class="navbar-brand" href="../home/home.html">Logo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--defines type of navbar-->
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <!--creates search bar form-->
        <li class="nav-item active">
          <div id="search" class="">
            <form class="form-inline" action="../Search/results.html">
              <input class="form-control mr-sm-2" type="text" placeholder="Search">
              <button class="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </li>
        <li class="nav-item">
          <!--link to home page (null and void on this page but better than an empty button)-->
          <a class="nav-link" href="../home/HomePage.html">Home</a>
        </li>
        <li class="nav-item dropdown">
          <!--creates dropdown-->
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">Categories</a>
          <!--name and type of dropdown-->
          <div id="dropdown" class="dropdown-menu"></div>
        </li>
        <li class="nav-item">
          <!--link to hot deals page-->
          <a class="nav-link" href="../Hot Deals/deals.html">Hot Deals</a>
        </li>
        <li class="nav-item">
          <!--link to store locator page-->
          <a class="nav-link" href="../Store Locator/stores.html">Store Locator</a>
        </li>
        <li class="nav-item">
          <!--link to contact page-->
          <a class="nav-link" href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="loginToggle">Login</a>
        </li>
      </ul>
    </div>
  </nav>

  </div>
  <!--creates login form-->
  <div id="login" class="container">
    <!--<form action="../Login/login.html" id="loginForm"> -->
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" required>
      <!--defines type of input, id, placeholder and requires user to make input-->
    </div>
    <div class="form-group">
      <label for="key">Password:</label>
      <input type="password" class="form-control" id="key" placeholder="Enter password" name="key" encrypt="bcrypt"
        salt="abc..." rounds="4" required>
      <!--defines type of input, id, placeholder and requires user to make input-->
    </div>
    <button type="submit" id="btnSubmitLogin" class="btn btn-primary">Submit</button>
    <!--submit button-->
    </form>
  </div>

  <!-- <button class="accordion">Category 1</button>
  <div class="panel" id="acc">
    <p>Cat 1</p>
  </div>
  <button class="accordion">Category 2</button>
  <div class="panel" id="acc2">
    <p>Cat 2</p>
  </div>
   -->
  <input type="hidden" id="categoryHiddenField" value="categoryName" />

  <div id="categoryInformation">

  </div>

  <div id="itemList">

    </div>

  <!-- <div class="container" style="display:none;" >
    <div class="row">
      <div class="col-sm">
        <ul class="list-unstyled" id="categoryPageCategoriesList">     
        </ul>
      </div>
      <div class="col-sm categoryDisplayText" id="categoryDiv">
      </div>
    </div>
  </div> -->

<script>

    $(document).ready(function () {
      /*
        load this page with the category 
      
        go to the db
        query the db with the $("#categoryHiddenField").val() value of categoryHiddenField
        eg "Phones"
        db returns all the info for that category
      and displays it in, say, $("#categoryInformation").val("info from the db")
        
        data = SelectOne($("#categoryHiddenField").val())
        $("#categoryInformation").val(data);
      
      */
      var categoryName = $("#categoryHiddenField").val();// eg Phones
      var data =startDB(SelectOne(categoryName)); // this does not work atm - nat to fix !!!
      var image = "<img src="" + data.image + "" />"";
      var desc = data.desc;

      $("#categoryInformation").val(data.name + "<br/>" + image + "<br/>" + desc);

      // get items db query for "Phones"
      // selectList(...) div into itemList
    });


  </script> -->


  <!--defines footer-->
  <div id="footer">
    <footer>This is the footer</footer>
  </div>
</body>

</html>`

$('#formAddCat').submit(function (event) {
    event.preventDefault();
    console.log("formAddCat submit:");

    setDatabaseName('dbCat', ['users', 'items', 'categories']);
    setCurrObjectStoreName('categories');


    startDB(function () {
        saveCatData();
        alert("Item has been saved successfully!");
    });
});

var newCategoryID = 0;

function saveCatData() {
    var name = $('#txtCatName').val();
    var catDesc = $('#txtCatDesc').val();

    var data = {
        'name': name,
        'catDesc': catDesc
        // 'id':""

    };

    //create new category in db
    insertOne(data, function (lastID) {
        event.preventDefault();

        console.log("saveCatData lastID:" + lastID);

        //createNewCategoryPage(data, lastID)

        return false;
    });
}

function createNewCategoryPage(data, lastID) {
    //open category template
    //var template = window.open("../CatTemplate/catTemplate.html");
    //var template = "gdrgfgjrlk lkmglasknmfrslkmrs srlfksfslkfmsflkf lksmfslkfnelk mlkeflkjsfnslkfesfsfjsnflsjfnds kfndfnkndsknsndsdncknvfndskc";

    //replace template page newid and description and name placeholders with data values
    wholePage.replace("newid", lastID);
    wholePage.replace("categoryName", data.name);
    wholePage.replace("categoryDescription", data.catDesc);

    // $('#mySelect').append($('<option>', {
    //     value: 1,
    //     text: 'My option'
    // }));
    //var newCategoryPage = "E:\\Repos\\CT4009-1\\CT4009-2019-20-001-s1906563-13-Jan-2020\\Categories\\" + data.name + ".html";
    //console.log("newCategoryPage called: " + newCategoryPage)
    
    //save new category page
    // var opened = window.open(newCategoryPage);
    opened.document.write(wholePage);
    download(template, newCategoryPage);

}

function download(data, filename) {
    try {
        var file = new File([data], { type: "text/plain;charset=utf-8" });
        saveAs(file, filename);
    }
    catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }

    
    // var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, filename);

}

