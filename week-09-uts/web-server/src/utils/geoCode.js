const request = require("postman-request");
require("dotenv").config();

const MAPBOX_KEY = process.env.MAPBOX_KEY;

const geoCode = (address, callback) => {
	// Use the stable Mapbox Geocoding API (v5) and URL-encode the address.
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${MAPBOX_KEY}&limit=1`;

	request({ url: url, json: true }, (error, response) => {
		// Network / request error
		if (error) {
			return callback("Unable to connect to location services!", undefined);
		}

		// Defensive checks: ensure response and body exist
		if (!response || !response.body) {
			return callback("No response from location services.", undefined);
		}

		// Features may be missing or empty
		if (!Array.isArray(response.body.features) || response.body.features.length === 0) {
			return callback("Unable to find location. Try another search.", undefined);
		}

		const feature = response.body.features[0];
		const latitude = feature.center[1];
		const longitude = feature.center[0];
		const location = feature.place_name;

		callback(undefined, {
			latitude: latitude,
			longitude: longitude,
			location: location,
		});
	});
};

module.exports = geoCode;
