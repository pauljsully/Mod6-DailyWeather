    // Your JavaScript code here
    var timeDisplayEl = $('#time-display');
    var location = document.getElementById('search-input');
    var button = document.getElementById('button');

    function displayTime() {
        var rightNow = dayjs().format('dddd, MMM DD, YYYY [at] hh:mm:ss a');
        timeDisplayEl.text(rightNow);
    }

    displayTime();
    setInterval(displayTime, 1000);

    function fetchWeatherData(city) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=4f360382098bb9e1dd871fb474d6815f&units=imperial`;
      
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            for(var i=1;i<6;i++){
                document.getElementById("day" +(i+1)+ "temp").innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(1)+"&deg;F";
            }
            for(var i=1;i<6;i++){
                document.getElementById("day" +(i+1)+ "wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(1)+" mph";
            }
            for(var i=1;i<6;i++){
                document.getElementById("day" +(i+1)+ "humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(1)+" %";
            }
            for(var i=1;i<6;i++){
                document.getElementById("img" +(i+1)).src ="https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
            }
            // For example, you can access data.list to get the forecast for different times/days
            // Update your HTML elements with the fetched data
           // console.log(data); // You can remove this line once you've confirmed the data structure
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
      });


