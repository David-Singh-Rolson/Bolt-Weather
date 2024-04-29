const itime = document.getElementById('itime');
const iday = document.getElementById('iday');
const isuggest = document.getElementById('suggest');
const iSearchCity = document.querySelector('.searchCity');
let bgImage = document.querySelector('.bg-image');
let card = document.querySelector('.card');

const sunRise = document.getElementById("sunr");
const sunSet = document.getElementById("suns");
const lowT = document.getElementById("low-t");
const highT = document.getElementById("high-t");
const speed = document.getElementById("w-speed");
const humid = document.getElementById("humid");
const rain = document.getElementById("rain-fall");
const city = document.querySelector("#city");
const tempd = document.querySelector("#temp");
const trSec = document.querySelector('.tr-sec');
const daysList = document.querySelectorAll('.days-list');
const weaType = document.querySelectorAll('.wea-type');
const wtype = document.getElementById("wcode");

const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const themeConfigs = {
    'summer': {
        'gradient': 'linear-gradient(90deg, hsla(32, 52%, 40%, 1) 0%, hsla(32, 58%, 53%, 1) 46%, hsla(29, 44%, 19%, 1) 100%)',
        'gif': './asset/gif/msunny.gif'
    },
    'rainy': {
        'gradient': 'linear-gradient(90deg, hsla(210, 7%, 40%, 1) 0%, hsla(208, 7%, 60%, 1) 53%, hsla(210, 7%, 40%, 1) 100%)',
        'gif': './asset/gif/rainy.gif'
    },
    'cloudy': {
        'gradient': 'linear-gradient(90deg, hsla(229, 30%, 49%, 1) 0%, hsla(228, 24%, 67%, 1) 53%, hsla(229, 30%, 49%, 1) 100%)',
        'gif': './asset/gif/cloudy.gif'
    },
    'wind': {
        'gradient': 'radial-gradient(circle, hsla(208, 33%, 21%, 1) 0%, hsla(210, 35%, 36%, 1) 53%, hsla(211, 36%, 46%, 1) 100%)',
        'gif': './asset/gif/wind.gif'
    },
};

let countriesData = {};



const weatherCode = {
    '0': ['Clear Sky', './asset/img/clear-sky.png', 'summer'],
    '1': ['Mainly Clear', './asset/img/mainly-clear-sky2.png', 'summer'],
    '2': ['Partly Cloudy', './asset/img/partly-cloudy.png', 'cloudy'],
    '3': ['Overcast', './asset/img/overcast.png', 'cloudy'],
    '45': ['Fog', './asset/img/fog.png', 'cloudy'],
    '48': ['Fog', './asset/img/fog.png', 'cloudy'],
    '51': ['Light Drizzle', './asset/img/drizzle.png', 'wind'],
    '53': ['Moderate Drizzle', './asset/img/drizzle.png', 'wind'],
    '55': ['Dense Drizzle', './asset/img/drizzle.png', 'wind'],
    '56': ['Freezing Light Drizzle', './asset/img/drizzle.png', 'wind'],
    '57': ['Freezing Dense Drizzle', './asset/img/drizzle.png', 'wind'],
    '61': ['Slight Rain', './asset/img/slight-rain.png', 'rainy'],
    '63': ['Moderate Rain', './asset/img/moderate-rain.png', 'rainy'],
    '65': ['Heavy Rain', './asset/img/heavy-rainfall.png', 'rainy'],
    '66': ['Freezing Light Rain', './asset/img/slight-rain.png', 'rainy'],
    '67': ['Freezing Heavy Rain', './asset/img/heavy-rainfall.png', 'rainy'],
    '71': ['Slight Snow Fall', './asset/img/snow-fall.png', 'snowy'],
    '73': ['Moderate Snow Fall', './asset/img/snow-fall.png', 'snowy'],
    '75': ['Heavy Snow Fall', './asset/img/snow-fall.png', 'snowy'],
    '77': ['Snow Grains', './asset/img/snow-fall.png', 'snowy'],
    '80': ['Slight Rain Showers', './asset/img/slight-rain.png', 'rainy'],
    '81': ['Moderate Rain Showers', './asset/img/moderate-rain.png', 'rainy'],
    '82': ['Violent Rain Showers', './asset/img/heavy-rainfall.png', 'rainy'],
    '85': ['Slight Snow Showers', './asset/img/snow-fall.png', 'rainy'],
    '86': ['Heavy Rain Showers', './asset/img/heavy-rainfall.png', 'rainy'],
    '95': ['Slight or Moderate Thunderstorm', './asset/img/heavy-rainfall.png', 'rainy']
};


const cityApiUrl = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name="

async function fetchCountriesData() {
    const response = await fetch('./asset/data/countries.json');
    countriesData = await response.json();
}

async function setup() {
    const today_date = new Date();
    const today_day = today_date.getDay();
    const arr = [];
    for (let day = today_day + 2; day < today_day + 7; day++) {
        const cday = day % 7;
        const sday = dayArr[cday].slice(0, 3);
        arr.push(sday);
    }
    for (let i = 2; i < 7; i++) {
        daysList[i].querySelector('h3').innerHTML = arr[i - 2];
    }
    card.style.background = themeConfigs.cloudy.gradient;
    bgImage.style.background = `url(${themeConfigs.cloudy.gif})`;
    iSearchCity.value = 'Delhi';
    await getCity();
    document.body.style.visibility = 'visible';
    bgImage.style.display = 'block';
    card.style.display = 'block';
    iSearchCity.value = '';

    await fetchCountriesData();
}
setup();

function getMyTime(curr_time) {
    let time = curr_time.getHours() + ':';
    if (curr_time.getMinutes() < 10) time += '0';
    time += curr_time.getMinutes();
    if (curr_time.getHours() < 10) time = '0' + time;
    return time;
}
function updateTime() {
    const time = new Date();
    const stime = getMyTime(new Date());
    itime.innerHTML = stime;
    let day = time.getDay();
    iday.innerHTML = dayArr[day];
}

updateTime()
setInterval(updateTime, 1000);

async function cityTyper(icity) {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    if (icity.value.length > 0) {
        isuggest.style.visibility = 'visible';
        if (vw < 600) trSec.style.visibility = 'hidden';
        let city = icity.value;
        city = city.charAt(0).toUpperCase() + city.slice(1);
        icity.value = city;
    } else {
        isuggest.style.visibility = 'hidden';
        if (vw < 600) trSec.style.visibility = 'visible';
    }

    const cs = await citySuggestion(icity.value);
    isuggest.innerHTML = '';

    if (cs.length == 0) return;
    for (let sug of cs) {
        const { city, country } = sug;
        const li = document.createElement('li');
        li.onclick = async function () {
            iSearchCity.value = `${city}, ${country}`;
            isuggest.innerHTML = '';
            trSec.style.visibility = 'visible';
            await getCity();
            iSearchCity.value = '';
        }
        li.innerHTML = `${city}, ${country}<br>`;
        isuggest.appendChild(li);
    }

    if (iSearchCity == null) return;
    const { city, country } = cs[0];
    const currInput = iSearchCity.value;
    const leftInput = city.slice(currInput.length);
}

async function getCity() {
    const ldata = await fetchCityCoords(iSearchCity.value);
    if (ldata == {}) return;
    const { latitude, longitude, city, country } = ldata;
    const wdata = await checkWeather(latitude, longitude);
    if (!wdata) return;
    const dailyData = wdata.daily;
    console.log(wdata);// weather data received
    setData({ ...wdata, city, country });
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        getCity();
    }
}


async function fetchCityCoords(cityName) {
    try {
        const cityResponseCoords = await fetch(cityApiUrl + cityName);
        if (!cityResponseCoords.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await cityResponseCoords.json(); // Assuming JSON response
        if (!data.results) return {};
        const result = data.results[0];
        // console.log(result); // Log the city coords response
        const ldata = {
            latitude: result['latitude'],
            longitude: result['longitude'],
            city: result['name'],
            country: result['country']
        };
        return ldata;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function checkWeather(latitude, longitude) {
    const WeatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=Asia/Kolkata&current=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,showers,wind_gusts_10m,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset`;

    try {
        const weatherResponse = await fetch(WeatherApiUrl);
        if (!weatherResponse.ok) {
            console.log('No such city');
            return;
            // throw new Error('Network response was not ok');
        }
        const wdata = await weatherResponse.json();
        return wdata;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function citySuggestion(city) {
    const LIMIT = 3;
    const data = countriesData;
    const keys = Object.keys(data);
    let mList = [];
    for (let key of keys) {
        if (mList.length == LIMIT) break;
        const cities = data[key];
        for (let mcity of cities) {
            if (mList.length == LIMIT) break;
            if (mcity.startsWith(city)) {
                mList.push({ city: mcity, country: key });
            }
        }
    }
    return mList;
}

function setData(wdata) {
    // tempd.innerHTML = wdata.current.temperature_2m;
    tempd.innerHTML = wdata.current.temperature_2m + " °C";
    speed.innerHTML = wdata.current.wind_speed_10m + " kmph";
    humid.innerHTML = wdata.current.relative_humidity_2m + " %";
    rain.innerHTML = wdata.current.showers + " mm";
    city.innerHTML = wdata.city + ', ' + wdata.country;
    const sr = wdata.daily.sunrise[0];
    var datee = new Date(sr);
    var dte = getMyTime(datee);
    sunRise.innerHTML = dte;
    const ss = wdata.daily.sunset[0];
    var dateee = new Date(ss);
    var dtee = getMyTime(dateee);
    sunSet.innerHTML = dtee;

    lowT.innerHTML = wdata.daily.temperature_2m_max[0];
    highT.innerHTML = wdata.daily.temperature_2m_min[0];

    for (let i = 0; i < 7; i++) {
        const dayl = daysList[i];
        const iwea = weaType[i];
        const notStrong = dayl.querySelector('notstrong');
        const strong = dayl.querySelector('strong');

        notStrong.innerHTML = wdata.daily.temperature_2m_min[i] + " /";
        strong.innerHTML = wdata.daily.temperature_2m_max[i] + "°C";

        const dwc = wdata.daily.weather_code[i];
        iwea.src = weatherCode[dwc][1];
    }
    wetCode = wdata.current.weather_code;
    console.log(weatherCode[wetCode]);
    wtype.innerHTML = weatherCode[wetCode][0];
    let imgUrl = weatherCode[wetCode][1];

    const wetType = weatherCode[wetCode][2];
    const { gradient, gif } = themeConfigs[wetType];
    card.style.background = gradient;
    const bgImgUrl = `url(${gif})`;
    console.log(wetType);
    bgImage.style.backgroundImage = bgImgUrl;

}

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API --> current location api