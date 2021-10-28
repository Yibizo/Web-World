const request = require('request')

const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cfe88a1abf0cc75b44c20948c7e57ed7&query=${city}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        }     
        else {
            callback(undefined, [response.body.current.weather_descriptions[0], response.body.current.temperature, response.body.current.is_day, response.body.current.weather_icons[0]])
        }
    })
}

module.exports = forecast