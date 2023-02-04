const request = require('postman-request');

const forecast = (city, callback) => {
    const accessKey = 'f2a6682da6367565ce2e47eb004dd570';
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;

    request({url, json: true}, (error, {body} = {}) => {
        if (error)
            callback('No network connection', undefined);
        else if (body['error'])
            callback('Invalid input, provide correct city name', undefined);
        else {
            const city = body['location']['name'];
            const weatherDescription = body['current']['weather_descriptions'][0];
            const temperature = body['current']['temperature'];
            const apparentTemperature = body['current']['feelslike'];
            const humidity = body['current']['humidity'];
            const weatherForecast = {
                location: city,
                forecast: `${weatherDescription}. It is currently ${temperature} degrees in ${city}. It feels like ${apparentTemperature} degrees out. The humidity is ${humidity}%.`
            }
            callback(undefined, weatherForecast);
        }
    });
}

module.exports = {
    forecast
}
