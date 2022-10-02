const { daysToMillisec } = require('./utils/date-time');

module.exports = {
    get_base_url: req =>  req.protocol + '://' + req.get('host'),
    tokenLife: daysToMillisec(30),
    weatherApiURL: 'http://api.weatherapi.com/v1'
}
