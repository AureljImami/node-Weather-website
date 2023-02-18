const request = require('request')

const forecast = (longtitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4c6777579333046aeab74f359c7a2e15&query='
        + latitude + ',' + longtitude

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '.Currently it is: '
                + body.current.temperature + ' degrees out. But it feels like: ' + body.current.feelslike)
        }
    })
}

module.exports = forecast