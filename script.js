var citiesLocalStorage = []
var citiesLocalStorage = JSON.parse(localStorage.getItem("history")) || []
if (citiesLocalStorage.length > 0) {
    weatherSearch(citiesLocalStorage[citiesLocalStorage.length - 1])
    forecastSearch(citiesLocalStorage[citiesLocalStorage.length - 1])
}
renderBtn()

function renderBtn() {

    console.log(citiesLocalStorage)
    $("#cityList").empty()
    var index = citiesLocalStorage.length > 5 ? 5 : citiesLocalStorage.length
    var j = 0
    for (var i = citiesLocalStorage.length - 1; j < index; i--) {
        createRow(citiesLocalStorage[i])
        j++
    }
    $(".cityhist").on("click", function () {
        var city = $(this).text()
        console.log(city)
        weatherSearch(city)
        forecastSearch(city)
    });
}

// change html to show correct weather
function weatherSearch(cityInput) {

    // var city = $(this).text();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=fd2d9737a31922521d0e5bd798d6dc58&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            console.log(citiesLocalStorage, cityInput)
            if (citiesLocalStorage.indexOf(cityInput) === -1) {
                console.log("hello")
                citiesLocalStorage.push(cityInput)
                localStorage.setItem("history", JSON.stringify(citiesLocalStorage))
                renderBtn()
            }



            $(".currentWeather").empty()

            var results = response;

            var currentCity = $("<h2>").text("Current City: " + cityInput);
            var currentTemp = $("<p>").text("Live Temp " + response.list[0].main.temp);
            var currentHumidity = $("<p>").text("Humidity " + response.list[0].main.humidity + "%");
            var currentWind = $("<p>").text("Wind Speed" + response.list[0].wind.speed + " mph");

            $(".currentWeather").append(currentCity);
            $(".currentWeather").append(currentTemp);
            $(".currentWeather").append(currentHumidity);
            $(".currentWeather").append(currentWind);
            console.log(results.list[0].main.humidity);
        })
};

function forecastSearch(cityInput) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=fd2d9737a31922521d0e5bd798d6dc58&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response)

            $("#weatherForecast").empty()
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var weatherCard = $("<div>").addClass("card bg-primary")
                    var currentTemp = $("<p>").text("Live Temp " + response.list[0].main.temp);
                    var currentHumidity = $("<p>").text("Humidity " + response.list[0].main.humidity + "%");
                    var currentWind = $("<p>").text("Wind Speed" + response.list[0].wind.speed + " mph");
                    weatherCard.append(currentTemp, currentHumidity, currentWind)
                    $("#weatherForecast").append(weatherCard)
                }
            }
        })
};

$("#citySearch").on("click", function (event) {
    event.preventDefault();
    var searchedCity = $("#cityInput").val();
    $("#cityInput").val("")

    weatherSearch(searchedCity)
    forecastSearch(searchedCity)
});

function createRow(value) {
    var li = $("<li>").addClass("cityhist").text(value)

    $("#cityList").append(li)




};

// var history = JSON.parse(localStorage.getItem("history")) || []
// if (history.length > 0) {
//     weatherSearch(history[history.length - 1])
// }
// for (var i = 0; i < history.length; i++) {
//     createRow(history[i])
// }



$(".cityList").on("click", ".searchResult", weatherSearch);

























































