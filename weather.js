/*
 * MIT License
 *
 * Copyright (c) 2018. Raymond Johannessen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Raymond Johannessen Webutvikling
 * https://rajohan.no
 */

const axios = require("axios");

getWeather = (address, googleKey, darkSkyKey) => {

    let encodedAddress = encodeURIComponent(address);
    let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&code=${googleKey}`;
    let formattedLocation;

    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === "ZERO_RESULTS") {
            throw new Error("Unable to find that address");
        }

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}?units=si`;
        formattedLocation = response.data.results[0].formatted_address;

        return axios.get(weatherUrl);
    }).then((response) => {
        let daily = response.data.daily.data[0];
        let currently = response.data.currently;

        console.log(`\nWeather for ${formattedLocation}`);
        console.log(`\nThis week`);
        console.log(`---------`);
        console.log(`Weather: ${response.data.daily.summary}`);

        console.log(`\nToday`);
        console.log(`-----`);
        console.log(`Weather: ${daily.summary}`);
        console.log(`Min temp: ${daily.temperatureLow}°C`);
        console.log(`Max temp: ${daily.temperatureHigh}°C`);
        console.log(`Wind speed: ${daily.windSpeed} m/s`);

        console.log(`\nCurrently`);
        console.log(`---------`);
        console.log(`Weather: ${currently.summary}`);
        console.log(`Temp: ${currently.temperature}°C`);
        console.log(`Apparent temp: ${currently.apparentTemperature}°C`);
        console.log(`Wind speed: ${currently.windSpeed} m/s\n`);

    }).catch((error) => {
        if (error.code === "ENOTFOUND" || error.response) {
            console.log("Unable to connect to API servers");
        } else {
            console.log(error.message);
        }
    });
};

module.exports = {
  getWeather
};
