const request = require('request');

const geoCode = (address, callback) => {
    const access_token = 'pk.eyJ1IjoiYXNpc2hhbnRvbnkiLCJhIjoiY2t4Mm9lZnhxMDl0ZTJubnh1MXdwZjNvZCJ9.3PeeWzcpizrQ97EKQD83ZA'
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}`;
    request({ url: geoCodeUrl, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find Location', undefined);
        } else {
            const location = response.body.features[0].text
            const coordinates = response.body.features[0].geometry.coordinates;
            callback(undefined, { lat: coordinates[0], long: coordinates[1], location })
        }
    })
}
module.exports = geoCode