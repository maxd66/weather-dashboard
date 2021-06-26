var searchHistoryEl = $('#searchHistory')
var formEl = $('#searchForm');
// On load, site retrieves local storage
function retrieveStorage() {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (!storedArr.length) {
        return
    }
    appendStorage(storedArr);
}

// appends retrieved array to search history in the form of buttons
function appendStorage(arr) {
    searchHistoryEl.innerHTML = ''
    for(var i = 0; i < arr.length; i++) {
        var buttonEl = $('<button>');
        buttonEl.addClass('historyBtn');
        buttonEl.setAttribute('id', arr[i]);
        buttonEl.textContent = arr[i];
        searchHistoryEl.appendChild(buttonEl);
    };
}
// js listens for form submission
var userInput = $('#userInput').value;
formEl.addEventListener('submit', function(userInput) {
    saveToStorage(userInput);
    // creates apiURL with user input for current weather
    //fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});

// saves submission to local storage
function saveToStorage(input) {
    var storedArr = JSON.parse(localStorage.getItem('searchHistory'));
    if (!storedArr.length) {
        storedArr = []
        storedArr.unshift(input)
        localStorage.setItem('searchHistory', storedArr)
    } else {
        storedArr.unshift(input)
        localStorage.setItem('searchHistory', storedArr)
    }
    
}

// js listens for search history button clicks
var historyBtnEl = $('.historyBtn')
searchHistoryEl.addEventListener('click', function(event) {
    if(event.target !== historyBtnEl) {
        return
    }
    var userPreviousSearch = event.target.getAttribute('id');
    // creates apiURL with user input for current weather
    //fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
    // creates apiURL with user input for forecast
    // fetches with apiURL created and returns response for current weather with JSON
    // appends information to the html if response is valid
});