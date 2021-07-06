//On load the page retrieves storage, and the event listeners

var searchHistoryEl = document.getElementById('searchHistory');
var formEl = document.getElementById("searchForm");
// On load, site retrieves local storage 
function retrieveStorage() {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (!storedArr) {
        return
    }
    appendStorage(storedArr);
}

// appends retrieved array to search history in the form of buttons
function appendStorage(arr) {
    searchHistoryEl.innerHTML = ''
    for(var i = 0; i < arr.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.setAttribute('class', 'historyBtn');
        buttonEl.setAttribute('id', arr[i]);
        buttonEl.textContent = arr[i];
        searchHistoryEl.appendChild(buttonEl);
    };
}
// js listens for form submission
var userInputEl = document.getElementById('userInput');
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = userInputEl.value.trim();
    if(userInput){
        generateFetch(userInput);
    }
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

// saves submission to local storage
function saveToStorage(input) {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(storedArr);

    if (!storedArr) {
        storedArr = []
        storedArr.unshift(input)
        localStorage.setItem('searchHistory', JSON.stringify(storedArr))
    } else {
        for(i = 0; i < storedArr.length; i++) {
            if(storedArr[i] == input) {
                storedArr.splice(i, 1);
            }
        }
        storedArr.unshift(input)
        localStorage.setItem('searchHistory', JSON.stringify(storedArr))
    }
    
}

// js listens for search history button clicks
var historyBtnEl = document.querySelector('.historyBtn')
searchHistoryEl.addEventListener('click', function(event) {
    if(!event.target.classList.contains('historyBtn')) {
        return
    }
    var userPreviousSearch = event.target.getAttribute('id');
    generateFetch(userPreviousSearch);
});

function generateFetch(input) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + '&units=imperial&appid=3aed22d5f8506d1b45fba35d9603cc88';
    // fetch request
    fetch(apiURL).then(function (response) {
        if(response.ok) {
            response.json().then(function(data) {
                appendCurrentData(data);
                fetchForecast(data);
                saveToStorage(input);
                retrieveStorage();
            });
        }else {
            alert('The city entered was not found in the Open Weather API database.')
        }
    })
}

function fetchForecast (data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var secondApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3aed22d5f8506d1b45fba35d9603cc88'
    fetch(secondApiUrl).then(function (response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                appendForecast(data);
            });
        }else {
            alert('The city entered was not found in the Open Weather API database.')
        }
    })
}

function appendCurrentData(data) {
    var currentWeatherEl = document.querySelector('#currentWeather')
    var iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    var date = moment().format('YYYY-MM-DD');
    var cityName = data.name;
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    lat = data.coord.lat;
    lon = data.coord.lon;
    currentWeatherEl.innerHTML = ''
    var cityNameEl = document.createElement('h2')
    var iconEl = document.createElement('img')
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p')
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    cityNameEl.textContent = cityName + ' ' + date;
    tempEl.textContent = 'Temperature: ' + temp + "° F";
    windEl.textContent = 'Wind: ' + wind + 'mph';
    humidityEl.textContent = 'Humidity: ' + humidity + '%';
    currentWeatherEl.appendChild(cityNameEl);
    cityNameEl.append(iconEl);
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(humidityEl);
}

//this function is a big one, but there are just a few too many variables to make
//me feel like it was worth drying up, maybe with more time in the future I can
//come back to it.
function appendForecast(data) {
    var currentWeatherEl = document.querySelector('#currentWeather')
    var uviEl = document.createElement('p');
    var uviValue = data.current.uvi
    uviEl.textContent = 'UV Index: ' + uviValue
    if(uviValue >= 8) {
        uviEl.setAttribute('class', 'uvDanger');
    } else if (uviValue >= 6) {
        uviEl.setAttribute('class', 'uvModerate');
    } else {
        uviEl.setAttribute('class', 'uvGood');
    }
    currentWeatherEl.appendChild(uviEl)
    var box1El = document.getElementById('box1');
    var box2El = document.getElementById('box2');
    var box3El = document.getElementById('box3');
    var box4El = document.getElementById('box4');
    var box5El = document.getElementById('box5');
    box1El.innerHTML = ''
    box2El.innerHTML = ''
    box3El.innerHTML = ''
    box4El.innerHTML = ''
    box5El.innerHTML = ''
    //day 1
    var day1Date = moment().add(1, 'd').format('YYYY-MM-DD')
    var iconURL = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
    var day1Temp = data.daily[0].temp.day;
    var day1Wind = data.daily[0].wind_speed;
    var day1Humidity = data.daily[0].humidity;
    var day1DateEl = document.createElement('h3');
    var iconEl = document.createElement('img')
    var day1TempEl = document.createElement('p');
    var day1WindEl = document.createElement('p');
    var day1HumidityEl = document.createElement('p');
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    day1DateEl.textContent = day1Date
    day1TempEl.textContent = 'Temp: ' + day1Temp + "° F";
    day1WindEl.textContent = 'Wind Speed: ' + day1Wind + 'mph';
    day1HumidityEl.textContent = 'Humidity: ' + day1Humidity + '%';
    box1El.appendChild(day1DateEl);
    box1El.appendChild(iconEl);
    box1El.appendChild(day1TempEl);
    box1El.appendChild(day1WindEl);
    box1El.appendChild(day1HumidityEl);
    //day 2
    var day2Date = moment().add(2, 'd').format('YYYY-MM-DD')
    var iconURL = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
    var day2Temp = data.daily[1].temp.day;
    var day2Wind = data.daily[1].wind_speed;
    var day2Humidity = data.daily[1].humidity;
    var day2DateEl = document.createElement('h3');
    var iconEl = document.createElement('img')
    var day2TempEl = document.createElement('p');
    var day2WindEl = document.createElement('p');
    var day2HumidityEl = document.createElement('p');
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    day2DateEl.textContent = day2Date
    day2TempEl.textContent = 'Temp: ' + day2Temp + "° F";
    day2WindEl.textContent = 'Wind Speed: ' + day2Wind + 'mph';
    day2HumidityEl.textContent = 'Humidity: ' + day2Humidity + '%';
    box2El.appendChild(day2DateEl);
    box2El.appendChild(iconEl);
    box2El.appendChild(day2TempEl);
    box2El.appendChild(day2WindEl);
    box2El.appendChild(day2HumidityEl);
    //day 3
    var day3Date = moment().add(3, 'd').format('YYYY-MM-DD')
    var iconURL = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png";
    var day3Temp = data.daily[2].temp.day;
    var day3Wind = data.daily[2].wind_speed;
    var day3Humidity = data.daily[2].humidity;
    var day3DateEl = document.createElement('h3');
    var iconEl = document.createElement('img')
    var day3TempEl = document.createElement('p');
    var day3WindEl = document.createElement('p');
    var day3HumidityEl = document.createElement('p');
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    day3DateEl.textContent = day3Date;
    day3TempEl.textContent = 'Temp: ' + day3Temp + "° F";
    day3WindEl.textContent = 'Wind Speed: ' + day3Wind + 'mph';
    day3HumidityEl.textContent = 'Humidity: ' + day3Humidity + '%';
    box3El.appendChild(day3DateEl);
    box3El.appendChild(iconEl);
    box3El.appendChild(day3TempEl);
    box3El.appendChild(day3WindEl);
    box3El.appendChild(day3HumidityEl);
    //day 4
    var day4Date = moment().add(4, 'd').format('YYYY-MM-DD')
    var iconURL = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png";
    var day4Temp = data.daily[3].temp.day;
    var day4Wind = data.daily[3].wind_speed;
    var day4Humidity = data.daily[3].humidity;
    var day4DateEl = document.createElement('h3');
    var iconEl = document.createElement('img')
    var day4TempEl = document.createElement('p');
    var day4WindEl = document.createElement('p');
    var day4HumidityEl = document.createElement('p');
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    day4DateEl.textContent = day4Date;
    day4TempEl.textContent = 'Temp: ' + day4Temp + "° F";
    day4WindEl.textContent = 'Wind Speed: ' + day4Wind + 'mph';
    day4HumidityEl.textContent = 'Humidity: ' + day4Humidity + '%';
    box4El.appendChild(day4DateEl);
    box4El.appendChild(iconEl);
    box4El.appendChild(day4TempEl);
    box4El.appendChild(day4WindEl);
    box4El.appendChild(day4HumidityEl);
    // day 5
    var day5Date = moment().add(5, 'd').format('YYYY-MM-DD')
    var iconURL = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png";
    var day5Temp = data.daily[4].temp.day;
    var day5Wind = data.daily[4].wind_speed;
    var day5Humidity = data.daily[4].humidity;
    var day5DateEl = document.createElement('h3');
    var iconEl = document.createElement('img')
    var day5TempEl = document.createElement('p');
    var day5WindEl = document.createElement('p');
    var day5HumidityEl = document.createElement('p');
    iconEl.setAttribute('src', iconURL)
    iconEl.setAttribute('alt', 'Icon for weather description')
    day5DateEl.textContent = day5Date
    day5TempEl.textContent = 'Temp: ' + day5Temp + "° F";
    day5WindEl.textContent = 'Wind Speed: ' + day5Wind + 'mph';
    day5HumidityEl.textContent = 'Humidity: ' + day5Humidity + '%';
    box5El.appendChild(day5DateEl);
    box5El.appendChild(iconEl);
    box5El.appendChild(day5TempEl);
    box5El.appendChild(day5WindEl);
    box5El.appendChild(day5HumidityEl);
}

// Background image logic
function replaceImage() {
    currentTime = moment().format('H');
    console.log(currentTime)
    if(currentTime < 5 || currentTime > 20) {
        $('html').attr('style', 'background-image: url(./assets/images/night.jpg); background-position: center; background-size: cover; height: 100%; width: 100%;')
    } else if(currentTime >= 5 && currentTime < 9) {
        $('html').attr('style', 'background-image: url(./assets/images/sunrise.jpg); background-position: center; background-size: cover; height: 100%; width: 100%;')
    } else if(currentTime >= 9 && currentTime < 17) {
        $('html').attr('style', 'background-image: url(./assets/images/day.jpg); background-position: center; background-size: cover; height: 100%; width: 100%;')
    } else if(currentTime >= 17 && currentTime <=20) {
        $('html').attr('style', 'background-image: url(./assets/images/sunset.jpg); background-position: center; background-size: cover; height: 100%; width: 100%;')
    }
}

setInterval(function() {
    replaceImage();
}, 60000);

retrieveStorage();
replaceImage();
var date = moment().format('YYYY-MM-DD');
console.log(date);


