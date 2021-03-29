window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    let temperatureSection = document.querySelector(".temperature")
    let temperatureSpan = document.querySelector(".weather-icon")
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
    const weather = {};
    weather.temperature = {
        unit: "celsius"
    }
    const KELVIN = 273;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const key = "f50a39b9c4f86d4262096a6339a14b0e";
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            console.log(api)
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    weather.temperature.value = Math.floor(data.main.temp - KELVIN)
                    weather.description = data.weather[0].description;
                    weather.iconID = data.weather[0].icon;
                    weather.city = data.name;
                    weather.country = data.sys.country;

                    temperatureDegree.textContent = `${weather.temperature.value}°C`
                    temperatureDescription.textContent = weather.description;
                    temperatureSpan.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
                    locationTimezone.textContent = `${weather.city}, ${weather.country}`
                    function celsiusToFahrenheit(temperature) {
                        return (temperature * 9 / 5) + 32;
                    }

                    temperatureSection.addEventListener('click', () => {
                        if (weather.temperature.value === undefined) {
                            return
                        } if (weather.temperature.unit == "celsius") {
                            let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
                            fahrenheit = Math.floor(fahrenheit)
                            temperatureDegree.textContent = `${fahrenheit}°F`
                            weather.temperature.unit = "fahrenheit"
                        } else {
                            temperatureDegree.textContent = `${weather.temperature.value}°C`
                            weather.temperature.unit = "celsius"

                        }
                    })
                });
        });
    }

});
