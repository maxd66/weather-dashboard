//On load the page retrieves storage, and the event listeners

var searchHistoryEl = document.getElementById('searchHistory');
var formEl = document.getElementById("searchForm");
// On load, site retrieves local storage 😀
function retrieveStorage() {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (!storedArr) {
        return
    }
    appendStorage(storedArr);
}

// appends retrieved array to search history in the form of buttons😀
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
// js listens for form submission😀
var userInputEl = document.getElementById('userInput');
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = userInputEl.value;
    generateFetch(userInput);
    saveToStorage(userInput);
    retrieveStorage();
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

// saves submission to local storage 😀
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
    //have to for loop through conditional to make sure it doesn't print repeat history
    
}

// js listens for search history button clicks😀
var historyBtnEl = document.querySelector('.historyBtn')
searchHistoryEl.addEventListener('click', function(event) {
    if(!event.target.classList.contains('historyBtn')) {
        return
    }
    var userPreviousSearch = event.target.getAttribute('id');
    generateFetch(userPreviousSearch);
    saveToStorage(userPreviousSearch);
    //fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

function generateFetch(input) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + '&units=imperial&appid=3aed22d5f8506d1b45fba35d9603cc88';
    // fetch request
    fetch(apiURL).then(function (response) {
        if(response.ok) {
            response.json().then(function(data) {
                appendCurrentData(data);
                fetchForecast(data);
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
    var cityName = data.name;
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    lat = data.coord.lat;
    lon = data.coord.lon;
    currentWeatherEl.innerHTML = ''
    var cityNameEl = document.createElement('h2')
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p')
    cityNameEl.textContent = cityName;
    tempEl.textContent = 'Temperature: ' + temp;
    windEl.textContent = 'Wind: ' + wind + 'mph';
    humidityEl.textContent = 'Humidity: ' + humidity + '%';
    currentWeatherEl.appendChild(cityNameEl);
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(humidityEl);
}

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
    var day1Temp = data.daily[0].temp.day;
    var day1Wind = data.daily[0].wind_speed;
    var day1Humidity = data.daily[0].humidity;
    var day1TempEl = document.createElement('p');
    var day1WindEl = document.createElement('p');
    var day1HumidityEl = document.createElement('p');
    day1TempEl.textContent = 'Temp: ' + day1Temp;
    day1WindEl.textContent = 'Wind Speed: ' + day1Wind + 'mph';
    day1HumidityEl.textContent = 'Humidity: ' + day1Humidity + '%';
    box1El.appendChild(day1TempEl);
    box1El.appendChild(day1WindEl);
    box1El.appendChild(day1HumidityEl);
    //day 2
    var day2Temp = data.daily[1].temp.day;
    var day2Wind = data.daily[1].wind_speed;
    var day2Humidity = data.daily[1].humidity;
    var day2TempEl = document.createElement('p');
    var day2WindEl = document.createElement('p');
    var day2HumidityEl = document.createElement('p');
    day2TempEl.textContent = 'Temp: ' + day2Temp;
    day2WindEl.textContent = 'Wind Speed: ' + day2Wind + 'mph';
    day2HumidityEl.textContent = 'Humidity: ' + day2Humidity + '%';
    box2El.appendChild(day2TempEl);
    box2El.appendChild(day2WindEl);
    box2El.appendChild(day2HumidityEl);
    //day 3
    var day3Temp = data.daily[2].temp.day;
    var day3Wind = data.daily[2].wind_speed;
    var day3Humidity = data.daily[2].humidity;
    var day3TempEl = document.createElement('p');
    var day3WindEl = document.createElement('p');
    var day3HumidityEl = document.createElement('p');
    day3TempEl.textContent = 'Temp: ' + day3Temp;
    day3WindEl.textContent = 'Wind Speed: ' + day3Wind + 'mph';
    day3HumidityEl.textContent = 'Humidity: ' + day3Humidity + '%';
    box3El.appendChild(day3TempEl);
    box3El.appendChild(day3WindEl);
    box3El.appendChild(day3HumidityEl);
    //day 4
    var day4Temp = data.daily[3].temp.day;
    var day4Wind = data.daily[3].wind_speed;
    var day4Humidity = data.daily[3].humidity;
    var day4TempEl = document.createElement('p');
    var day4WindEl = document.createElement('p');
    var day4HumidityEl = document.createElement('p');
    day4TempEl.textContent = 'Temp: ' + day4Temp;
    day4WindEl.textContent = 'Wind Speed: ' + day4Wind + 'mph';
    day4HumidityEl.textContent = 'Humidity: ' + day4Humidity + '%';
    box4El.appendChild(day4TempEl);
    box4El.appendChild(day4WindEl);
    box4El.appendChild(day4HumidityEl);
    // day 5
    var day5Temp = data.daily[4].temp.day;
    var day5Wind = data.daily[4].wind_speed;
    var day5Humidity = data.daily[4].humidity;
    var day5TempEl = document.createElement('p');
    var day5WindEl = document.createElement('p');
    var day5HumidityEl = document.createElement('p');
    day5TempEl.textContent = 'Temp: ' + day5Temp;
    day5WindEl.textContent = 'Wind Speed: ' + day5Wind + 'mph';
    day5HumidityEl.textContent = 'Humidity: ' + day5Humidity + '%';
    box5El.appendChild(day5TempEl);
    box5El.appendChild(day5WindEl);
    box5El.appendChild(day5HumidityEl);
}

retrieveStorage();

