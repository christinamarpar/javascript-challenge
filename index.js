// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $nav = document.querySelector("nav");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
// When I click here- the handleSearchButtonClick function will execute
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredSightings to data initially
// loaded within data.js- called before index.js (this file) in the html code
var filteredSightings = dataSet;

// renderTable renders the ufo sighting data to the tbody
function renderTable() {
  // clears out any previous stuff
  $tbody.innerHTML = "";
  $nav.innerHTML = "";
  
  // adds data row by row
  for (var i = 0; i < filteredSightings.length; i++) {
    // Get get the current sighting object and its fields
    var sighting = filteredSightings[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the sighting object, create a new cell and set its inner text to be the current value at the current sighting's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }

  $(document).ready(function(){
    // $('#container').after('<div id="nav"></div>');
    
    var rowsShown = 50;
    var rowsTotal = $('#paged-table tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#paged-table tbody tr').hide();
    $('#paged-table tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#paged-table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                css('display','table-row').animate({opacity:1}, 300);
    });
  });

}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value;
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  
  var ignoreDate = false;
  var ignoreCity = false;
  var ignoreState = false;
  var ignoreCountry = false;
  var ignoreShape = false;

  // Set filteredSightings to an array of all sightings whose "state" matches the filter
  filteredSightings = dataSet.filter(function(sighting) {

    var sightingDate = sighting.datetime;
    var sightingCity = sighting.city.toLowerCase();
    var sightingState = sighting.state.toLowerCase();
    var sightingCountry = sighting.country.toLowerCase();
    var sightingShape = sighting.shape.toLowerCase();

    if(filterDate==""|filterDate==null|ignoreDate==true) {
      filterDate=sightingDate;
      ignoreDate=true;
    }
    if(filterCity==""|filterCity==null|ignoreCity==true) {
      filterCity=sightingCity;
      ignoreCity=true;
    }
    if(filterState==""|filterState==null|ignoreState==true) {
      filterState=sightingState;
      ignoreState=true;
    }
    if(filterCountry==""|filterCountry==null|ignoreCountry==true) {
      filterCountry=sightingCountry;
      ignoreCountry=true;
    }
    if(filterShape==""|filterShape==null|ignoreShape==true) {
      filterShape=sightingShape;
      ignoreShape=true;
    }
    // If true, add the sighting to the filteredSightings, otherwise don't add it to filteredSightings
    return sightingDate === filterDate & sightingCity === filterCity & sightingState === filterState & sightingCountry === filterCountry & sightingShape === filterShape;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
