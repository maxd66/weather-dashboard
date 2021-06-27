var searchHistoryEl = document.getElementById('searchHistory');
var formEl = document.getElementById("searchForm");
// On load, site retrieves local storage 😀
function retrieveStorage() {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (storedArr.length == 0) {
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
    saveToStorage(userInput);
    retrieveStorage();
    // creates apiURL with user input for current weather
    //fetches with apiURL created and returns response for current weather with JSON
    generateFetch(userInput);
    // appends information to the html if response is valid
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

// saves submission to local storage 😀
function saveToStorage(input) {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (!storedArr) {
        storedArr = []
        storedArr.unshift(input)
        localStorage.setItem('searchHistory', JSON.stringify(storedArr))
    } else {
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
    saveToStorage(userPreviousSearch);
    generateFetch(userPreviousSearch);
    
    // creates apiURL with user input for current weather
    //fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

function generateFetch(input) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + '&units=imperial&appid=3aed22d5f8506d1b45fba35d9603cc88';
    // fetch request
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            appendCurrentData(data);
        })
}

function appendCurrentData(data) {
    var currentWeatherEl = document.querySelector('#currentWeather')
    var cityName = data.name;
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
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
retrieveStorage();

