
// change html to show correct weather
function displayCityWeather() {

    var city = $(this).text();
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fd2d9737a31922521d0e5bd798d6dc58`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        })

};








$("#cityList").on("click", ".searchResult", displayCityWeather);

























































