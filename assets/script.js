    // Your JavaScript code here
    var timeDisplayEl = $('#time-display');
    var location = document.getElementById('search-input');
    var button = document.getElementById('button');
    var currentWeather = document.getElementById('currentweather');

    function displayTime() {
        var rightNow = dayjs().format('dddd, MMM DD, YYYY [at] hh:mm:ss a');
        timeDisplayEl.text(rightNow);
    }

    displayTime();
    setInterval(displayTime, 1000);

function fetchCurrentWeather(city){

  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f360382098bb9e1dd871fb474d6815f&units=imperial`;

  fetch(weatherURL) 
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

              document.getElementById("day1high").innerHTML = Number(data.main.temp_max).toFixed(0)+"&deg;F";
    
              document.getElementById("day1low").innerHTML = Number(data.main.temp_min).toFixed(0)+"&deg;F";

              document.getElementById("day1wind").innerHTML = Number(data.wind.speed).toFixed(1)+" mph";

              document.getElementById("day1humidity").innerHTML = Number(data.main.humidity).toFixed(0)+"%";
            });
}

    function fetchWeatherData(city) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4f360382098bb9e1dd871fb474d6815f&units=imperial`;
      
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            for(var i=0;i<6;i++){
                document.getElementById("day" +(i+1)+ "temp").innerHTML = Number(data.list[i].main.temp).toFixed(0)+"&deg;F";
            }


            for(var i=1;i<6;i++){
                document.getElementById("day" +(i+1)+ "wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(1)+" mph";
            }
            


            for(var i=1;i<6;i++){
                document.getElementById("day" +(i+1)+ "humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(0)+"%";
            }


            for(var i=0;i<6;i++){
                document.getElementById("img" +(i+1)).src ="https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
            }

            console.log(data);

          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });

          

          var d = new Date();
          var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

          function CheckDay(day) {
            if(day +d.getDay()>6){
                return day +d.getDay()-7;
            }
            else  {
                return day +d.getDay();
            }
          }
          for(var i=1;i<6;i++){
            document.getElementById("day" +(i+1)).innerHTML=weekday[CheckDay(i)];
          };

      }
      
      // Event listener for the form submission
      document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var city = document.getElementById('search-input').value;
        fetchWeatherData(city);
        fetchCurrentWeather(city);
        currentWeather.innerHTML = "Current Weather in "+ city;
      });

      window.onload = function() {
        var defaultCity = "Cupertino";
        location.value = defaultCity;
        fetchWeatherData(defaultCity); // Fetch weather data for the default city on page load
        currentWeather.innerHTML = "Current Weather in " + defaultCity;
    };


// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
  
    // Get the input value
    var searchInput = document.getElementById('search-input');
    var searchTerm = searchInput.value.trim();
  
    if (searchTerm) {
      // Save the search term to local storage
      saveSearchToLocalStorage(searchTerm);
  
      // Clear the input field
      searchInput.value = '';
  
      // Update the search history buttons
      updateSearchHistory();
    }
  }
  
  // Function to save a search term to local storage
  function saveSearchToLocalStorage(searchTerm) {
    // Get the existing search history from local storage (if any)
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    // Add the new search term to the history
    searchHistory.push(searchTerm);
  
    // Save the updated history back to local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  
  // Function to update the search history buttons
  function updateSearchHistory() {
    var searchHistoryButtons = document.getElementById('search-history-buttons');
  
    // Clear existing buttons
    searchHistoryButtons.innerHTML = '';
  
    // Get the search history from local storage
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function handleHistoryButtonClick(event) {
        var searchTerm = event.target.textContent;
        document.getElementById('search-input').value = searchTerm; // Set the search input field value
        fetchWeatherData(searchTerm); // Perform a new search
      }
  
    // Create buttons for each search term
    searchHistory.forEach((searchTerm) => {
      var button = document.createElement('button');
      button.textContent = searchTerm;
      button.addEventListener('click', handleHistoryButtonClick);
      
      // Function to handle clearing the search history from local storage
    function clearLocalStorage() {
    localStorage.removeItem('searchHistory');
    
    // After clearing, update the search history UI
    updateSearchHistory();
  }
  
  // Add an event listener to the "Clear Search History" button
  document.getElementById('clearbutton').addEventListener('click', clearLocalStorage);
  

      searchHistoryButtons.appendChild(button);
      
      searchHistoryButtons.appendChild(button);
      
    });
  }
  
  // Add an event listener to the form for submission
  var searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSubmit);
  
  // Initialize search history on page load
  updateSearchHistory();
  


