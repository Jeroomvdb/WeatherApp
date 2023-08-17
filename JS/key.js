const apiKey = "c676577fd03e154e99547d854d737c70";
const apiUrl = "//api.openweathermap.org/data/2.5/forecast?units=metric&";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon1 = document.querySelector(".weatherIcon1");
const weatherIcon2 = document.querySelector(".weatherIcon2");
const weatherIcon3 = document.querySelector(".weatherIcon3");
const weatherIcon4 = document.querySelector(".weatherIcon4");
const backImg = document.querySelector(".backImg");
const back = document.querySelector(".card");

async function checkWeather(city){
    // PULL IN API
    const response = await fetch(apiUrl + `q=` + city + `&appid=${apiKey}`);
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
        //IMG/Icon - snow.svg
      }
     
      
      weatherIcon1.src = getWeatherIconSrc(data.list[6].weather[0].main, "svg");
      weatherIcon2.src = getWeatherIconSrc(data.list[14].weather[0].main, "svg");
      weatherIcon3.src = getWeatherIconSrc(data.list[22].weather[0].main, "svg");
      weatherIcon4.src = getWeatherIconSrc(data.list[30].weather[0].main, "svg");

      
      function getWeatherBackgroundImg(weather, suffix){
        const imgName = weatherIcons[weather];
        return `IMG/${imgName}.${suffix}`;
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
}


searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
});