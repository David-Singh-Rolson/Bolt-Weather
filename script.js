let itime = document.getElementById('itime');
let iday = document.getElementById('iday');
const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function updateTime() {
    let curr_time = new Date();
    let time = curr_time.getHours() + ':';
    if (curr_time.getMinutes() < 10) time += '0';
    time += curr_time.getMinutes();
    if (curr_time.getHours() < 10) time = '0' + time;
    itime.innerHTML = time;

    let day = curr_time.getDay();
    iday.innerHTML = dayArr[day];
}

setInterval(updateTime, 1000);

function cityTyper(icity) {
    if (icity.value.length > 0) {
        let city = icity.value;
        city = city.charAt(0).toUpperCase() + city.slice(1);
        icity.value = city;
    }
}

let cityName = "";
async function getCity() {
    cityName = document.querySelector('.searchCity').value;
    // console.log(cityName);
    const ldata = await fetchCityCoords(cityName);
    // console.log(ldata);
    const { latitude, longitude } = ldata;
    const wdata = await checkWeather(latitude, longitude);
    console.log(wdata);

}
function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        getCity(); // Call getCity function if Enter is pressed
    }
}





const cityApiUrl = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name="

async function fetchCityCoords(cityName) {
    try {
        const cityResponseCoords = await fetch(cityApiUrl + cityName);
        if (!cityResponseCoords.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await cityResponseCoords.json(); // Assuming JSON response
        const result = data.results[0];
        // console.log(result); // Log the city coords response
        const ldata = {
            latitude: result['latitude'],
            longitude: result['longitude']
        };
        return ldata;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




async function checkWeather(latitude, longitude) {
    const WeatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=is_day,sunshine_duration&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&wind_speed_unit=ms`;

    try {
        const weatherResponse = await fetch(WeatherApiUrl);
        if (!weatherResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const wdata = await weatherResponse.json();
        return wdata;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function citySuggestion() {
    const response = await fetch('./asset/data/countries.json');
    const data = await response.json();
    console.log(data);;
}
// citySuggestion();