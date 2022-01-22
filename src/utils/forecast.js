const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f70e9ac9f8dc2cc04b6b22a01ce7aebb&query=${latitude},${longitude}`;
    request({ url: url, json: true }, (error, response) => {
        console.log(response.body)
        if (error) {
            callback('Unable to connect to Weather Service', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const currentData = response.body.current;
            console.log(currentData);
            const icon = currentData.weather_icons[0];
            const printString = `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. 
            It feels like ${currentData.feelslike}. The Humidity is ${currentData.humidity}`
            callback(undefined, { printString, icon })
        }
    })
}
module.exports = forecast