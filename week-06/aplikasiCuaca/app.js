const request = require("postman-request");
require("dotenv").config();

const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=-0.8974062719811184,100.34902063253169`;

request({ url: url }, (error, response) => {
	// console.log(response);

	const data = JSON.parse(response.body);
	console.log(data);

	// console.log(data.current);
	// console.log(data.current.temperature);
});
