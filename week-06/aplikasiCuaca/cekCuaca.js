const request = require("postman-request");
require("dotenv").config();

// Latihan 1: API Access Weatherstack
const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
const MAPBOX_KEY = process.env.MAPBOX_KEY;

const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=-0.8974062719811184,100.34902063253169`;

request({ url: weatherstackUrl, json: true }, (error, response) => {
	console.log(
		"Saat ini suhu di luar mencapai " +
			response.body.current.temperature +
			" derajat celcius. kemungkinan terjadinya hujan adalah " +
			response.body.current.precip +
			"%. " +
			"Cuaca saat ini " +
			response.body.current.weather_descriptions[0]
	);
});

// Latihan 2: API Mapbox
if (!MAPBOX_KEY)
	console.warn("WARNING: MAPBOX_KEY environment variable tidak ditemukan. Periksa .env atau env var Anda.");
const geocodeUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=padang+utara&proximity=ip&limit=1&access_token=${MAPBOX_KEY}`;

request({ url: geocodeUrl, json: true }, (error, response) => {
	if (error) return console.error("Mapbox request error:", error.message || error);
	if (!response || !response.body || !response.body.features || response.body.features.length === 0) {
		return console.error("Mapbox: tidak menemukan fitur untuk query. Response body:", response && response.body);
	}
	const feat = response.body.features[0];
	const coords = feat.properties && feat.properties.coordinates;
	if (!coords) return console.error("Mapbox: koordinat tidak ada di fitur:", feat);
	const latitude = coords.latitude;
	const longitude = coords.longitude;
	console.log(latitude, longitude);
});

// Latihan 3: Memanggil data API
request({ url: geocodeUrl, json: true }, (error, response) => {
	const feature = response.body.features[0];
	const query = new URL(geocodeUrl).searchParams.get("q");
	const foundData = feature.properties.full_address;
	const featureType = feature.properties.feature_type;
	const coordinates = feature.properties.coordinates;

	console.log("Query yang dikirim:", query);
	console.log("Data yang ditemukan: ", foundData);
	console.log("Tipe data lokasi: ", featureType);
	console.log("Koordinat lokasi: ", coordinates);

	if (coordinates) {
		const lat = coordinates.latitude;
		const lon = coordinates.longitude;
		const WeatherUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${lon}`;

		request({ url: WeatherUrl, json: true }, (err2, resp2) => {
			console.log(`\nCuaca untuk koordinat ${lat},${lon}:`);
			console.log("Suhu:", resp2.body.current.temperature, "°C");
			console.log("Kemungkinan hujan:", resp2.body.current.precip, "%");
			console.log("Deskripsi:", resp2.body.current.weather_descriptions[0]);
		});
	} else {
		console.error("Koordinat tidak tersedia atau format tidak dikenali:", coordinates);
	}
});
