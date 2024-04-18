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