const axios = require('axios').default;
const { devApiKey, weatherApiURL} = require('../../constants')

exports.fetchWeather = async (req, res) => {
    const [ longitude, latitude ] = req.user.location.coordinates;
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherAPIKey}&q=${longitude},${latitude}`
    const location = (await axios.get(url)).data;
    return res.status(200).json(location);
}