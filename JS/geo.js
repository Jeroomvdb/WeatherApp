// Define the findMyState function
const findLocation = () => {
    const success = (position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude + ' and ' + longitude);

        async function checkWeatherLocal(latitude, longitude){
            // PULL IN API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=c676577fd03e154e99547d854d737c70`);
            let data = await response.json();

            // TODAY DATE
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();

            document.querySelector(".dateExact").innerHTML = dd + '/' + mm + '/' + yyyy;


            // WEATHER DATA API
            document.querySelector(".city").innerHTML = data.city.name;
            document.querySelector(".weather").innerHTML = data.list[0].weather[0].main;
            document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°";
            document.querySelector(".tempMinMax").innerHTML = Math.round(data.list[0].main.temp_min) +  "°/" + Math.round(data.list[0].main.temp_max) + "°";

            document.querySelector(".maxTemp1").innerHTML = Math.round(data.list[6].main.temp_max) + "°";
            document.querySelector(".maxTemp2").innerHTML = Math.round(data.list[14].main.temp_max) + "°";
            document.querySelector(".maxTemp3").innerHTML = Math.round(data.list[22].main.temp_max) + "°";
            document.querySelector(".maxTemp4").innerHTML = Math.round(data.list[30].main.temp_max) + "°";


            // DAYS OF THE WEEK
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            document.querySelector(".date").innerHTML = daysOfWeek[new Date(data.list[0].dt_txt).getDay()];

            [14, 22, 30].forEach((date, index) => {
                document.querySelector(`.tomorrow${index + 1}`).innerHTML = daysOfWeek[new Date(data.list[date].dt_txt).getDay()];
            });

                //CHANGE ICONS
    
    const weatherIcons = {
        Thunderstorm: "storm",
        Drizzle: "rain",
        Rain: "rain",
        Snow: "snow",
        Mist: "misty",
        Smoke: "misty",
        Haze: "misty",
        Dust: "misty",
        Fog: "misty",
        Sand: "misty",
        Dust: "misty",
        Ash: "misty",
        Squall: "misty",
        Tornado: "misty",
        Clear: "sunny",
        Clouds: "cloudy"
      };
      
      function getWeatherIconSrc(weather, suffix) {
        const iconName = weatherIcons[weather] /*|| "unknown"*/;
        return `IMG/Icon - ${iconName}.${suffix}`;
      }
      
      weatherIcon1.src = getWeatherIconSrc(data.list[6].weather[0].main, "svg");
      weatherIcon2.src = getWeatherIconSrc(data.list[14].weather[0].main, "svg");
      weatherIcon3.src = getWeatherIconSrc(data.list[22].weather[0].main, "svg");
      weatherIcon4.src = getWeatherIconSrc(data.list[30].weather[0].main, "svg");

            //IMG/Drops.svg
            function getWeatherBackgroundImg(weather, suffix){
                const imgName = weatherIcons[weather];
                return `IMG/${imgName}.${suffix}`;
                
                //IMG/rain.svg
              }
              backImg.src = getWeatherBackgroundImg(data.list[0].weather[0].main, "svg");
              
              if (backImg.src.includes("rain")) {
                back.style.backgroundColor = "#2A5EE9";
              } else if (backImg.src.includes("sunny")) {
                back.style.backgroundColor = "#F7CCCB";
              } else if (backImg.src.includes("cloudy")) {
                back.style.backgroundColor = "#387E61";
              } else {
                back.style.backgroundColor = "white";
              }
        };

        checkWeatherLocal(latitude, longitude);

    }

    const error = () =>{
        alert('Enable location tag to view local weather');
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

// Call the function when the page is loaded
window.addEventListener('load', findLocation);
