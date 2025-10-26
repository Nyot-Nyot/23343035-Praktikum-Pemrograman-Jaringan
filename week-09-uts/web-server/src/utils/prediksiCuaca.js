const request = require("postman-request");
require("dotenv").config();

const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;

const prediksiCuaca = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}`;
	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined);
		} else if (body && body.error) {
			callback("Unable to find weather for the given location.", undefined);
		} else {
			const data = body.current;
			callback(undefined, {
				weather_descriptions: data.weather_descriptions,
				temperature: data.temperature,
				uv_index: data.uv_index,
				visibility: data.visibility,
				precipitation: data.precip,
			});
		}
	});
};

module.exports = prediksiCuaca;
