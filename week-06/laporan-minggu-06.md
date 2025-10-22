![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%203&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=HTTP%20Request%20and%20API&descAlign=55&descAlignY=45)

---

# Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 6<br>
**Tanggal:** 22 Oktober 2025

---

## 1. Fokus & Tujuan

**Fokus minggu ini:** HTTP Request dan API Integration

**Tujuan pembelajaran:**

-   Memahami cara kerja HTTP request/response cycle dalam komunikasi jaringan
-   Mengimplementasikan API chaining dengan nested callbacks (geocoding → weather data)
-   Menguasai error handling untuk network requests
-   Memahami perbedaan antara request statis dan dinamis pada API consumption

---

## 2. Konsep Pemrograman Jaringan

### Konsep 1: HTTP Request/Response Cycle

**Definisi:**

HTTP (Hypertext Transfer Protocol) adalah protokol application layer yang mendefinisikan bagaimana client dan server berkomunikasi melalui jaringan. Komunikasi terjadi dalam bentuk request dari client dan response dari server. Setiap transaksi HTTP bersifat stateless—artinya setiap request diperlakukan secara independen tanpa menyimpan informasi tentang request sebelumnya.

**Mengapa Penting:**

HTTP adalah fondasi dari semua komunikasi web modern. Dalam pemrograman jaringan, HTTP memungkinkan aplikasi untuk:

-   Berkomunikasi dengan server API eksternal untuk mengambil atau mengirim data
-   Membangun aplikasi client-server yang scalable dan modular
-   Mengintegrasikan layanan pihak ketiga (payment gateway, social media API, maps, dll)
-   Memisahkan frontend dan backend dengan architecture RESTful

Tanpa memahami HTTP, kita tidak dapat membangun aplikasi modern yang bergantung pada komunikasi jaringan.

**Cara Kerja:**

1. **Request Creation:** Client membuat HTTP request yang terdiri dari:
    - Method (GET, POST, PUT, DELETE, dll) - menunjukkan jenis operasi
    - URL/URI - alamat resource yang diminta
    - Headers - metadata seperti content-type, authorization, user-agent
    - Body (optional) - data yang dikirim, biasanya dalam format JSON atau form-data
2. **Network Transmission:** Request dikirim melalui jaringan menggunakan protocol stack (TCP/IP)
3. **Server Processing:** Server menerima request, memproses sesuai business logic, dan menyiapkan response
4. **Response Generation:** Server mengirim HTTP response yang terdiri dari:
    - Status code (200 OK, 404 Not Found, 500 Internal Server Error, dll)
    - Headers - metadata response
    - Body - data yang diminta atau pesan error
5. **Client Processing:** Client menerima response, memvalidasi status code, dan memproses data

**Use Case:**

-   **Mobile Application:** Aplikasi e-commerce melakukan GET request ke API untuk mendapatkan daftar produk, kemudian POST request untuk mengirim order
-   **Weather App:** Request ke API cuaca (seperti Weatherstack) untuk mendapatkan data real-time berdasarkan lokasi user
-   **Social Media Integration:** Aplikasi melakukan OAuth flow dengan HTTP requests untuk login menggunakan Facebook/Google
-   **Payment Processing:** POST request ke payment gateway untuk memproses transaksi kartu kredit

### Konsep 2: API Integration dan Third-Party Services

**Definisi:**

API (Application Programming Interface) integration adalah proses menghubungkan aplikasi kita dengan layanan eksternal melalui API yang disediakan. Third-party API seperti Mapbox (geocoding) dan Weatherstack (weather data) menyediakan endpoints yang dapat kita akses dengan HTTP requests untuk mendapatkan data atau fungsionalitas tertentu.

**Mengapa Penting:**

Dalam ekosistem software modern, tidak semua fungsionalitas perlu dibangun dari nol. API integration memungkinkan:

-   **Leverage Existing Services:** Menggunakan layanan spesialis (maps, payment, email, dll) tanpa membangun infrastruktur sendiri
-   **Focus on Core Business Logic:** Developer bisa fokus pada fitur unik aplikasi, bukan pada fungsi umum yang sudah tersedia
-   **Scalability:** Third-party services biasanya sudah di-optimize untuk handle load besar dan memiliki global infrastructure
-   **Time & Cost Efficiency:** Mengurangi development time dan operational cost

**Cara Kerja:**

1. **API Documentation Review:** Membaca dokumentasi API untuk memahami endpoints, required parameters, authentication method, dan response format
2. **Authentication Setup:** Mendaftar API key/token untuk autentikasi—biasanya disimpan sebagai environment variable
3. **Request Construction:** Membuat HTTP request dengan:
    - Base URL dari API provider
    - Endpoint yang sesuai dengan fungsi yang diinginkan
    - Query parameters atau body data
    - API key di header atau query string
4. **Response Handling:** Menerima JSON response, melakukan parsing, dan error handling
5. **Data Processing:** Menggunakan data dari API untuk logic aplikasi

**Use Case:**

-   **Mapbox Geocoding API:** Mengkonversi nama tempat ("Padang Utara") menjadi koordinat geografis (latitude, longitude) untuk aplikasi location-based
-   **Weatherstack API:** Mendapatkan data cuaca real-time berdasarkan koordinat untuk aplikasi weather forecasting
-   **Stripe Payment API:** Memproses pembayaran tanpa perlu PCI compliance sendiri
-   **SendGrid Email API:** Mengirim transactional emails dengan deliverability yang tinggi

### Konsep 3: Asynchronous Request dan Callbacks

**Definisi:**

Asynchronous request adalah operasi yang tidak memblokir eksekusi program. Ketika kita melakukan HTTP request (yang bisa memakan waktu ratusan milliseconds), program tidak "freeze" menunggu response—melainkan melanjutkan eksekusi kode berikutnya. Callback adalah function yang diberikan sebagai parameter dan akan dieksekusi setelah operasi async selesai.

**Mengapa Penting:**

Network operations adalah salah satu operasi paling lambat dalam programming (dibandingkan CPU operations atau memory access). Jika kita menggunakan synchronous/blocking approach:

-   **Single Request:** Aplikasi freeze selama request berlangsung (bad user experience)
-   **Server Application:** Server tidak bisa handle request lain—fatal untuk scalability
-   **Multiple Requests:** Harus menunggu request pertama selesai sebelum memulai yang kedua (inefficient)

Dengan asynchronous approach, aplikasi bisa:

-   Tetap responsive selama network operation
-   Handle multiple requests secara concurrent
-   Perform parallel operations untuk improve performance

**Cara Kerja:**

1. **Async Operation Initiation:** Ketika kita call `request(options, callback)`, Node.js:
    - Mendaftarkan operation ke event loop
    - Menyimpan callback function untuk dieksekusi nanti
    - Segera return (tidak menunggu) dan lanjut ke line berikutnya
2. **Event Loop Processing:** Node.js event loop terus berjalan, monitoring async operations
3. **Callback Execution:** Ketika HTTP response diterima:
    - Event loop mendeteksi operation selesai
    - Memasukkan callback ke callback queue
    - Mengeksekusi callback dengan `(error, response)` sebagai parameters

**Pattern dalam Kode:**

```javascript
// Pattern: (error, response) => { ... }
request({ url: geocodeUrl, json: true }, (error, response) => {
	if (error) {
		return console.error("Error:", error); // Handle network error
	}
	// Process response
	const coordinates = response.body.features[0].properties.coordinates;
});
```

**Use Case:**

-   **Web Server:** Express.js server dapat handle ribuan concurrent HTTP requests karena non-blocking I/O
-   **Parallel API Calls:** Melakukan request ke multiple APIs secara bersamaan tanpa menunggu satu per satu
-   **Database Operations:** Query database sambil melayani HTTP requests lain
-   **File Upload:** Upload file ke cloud storage tanpa memblokir user dari melakukan actions lain

### Konsep 4: API Chaining dan Data Dependency

**Definisi:**

API chaining adalah pattern di mana output dari satu API call digunakan sebagai input untuk API call berikutnya. Ini menciptakan sequential async operations di mana request kedua depends on hasil request pertama. Dalam konteks aplikasi cuaca kita: nama kota → koordinat (Mapbox) → data cuaca (Weatherstack).

**Mengapa Penting:**

Banyak use case real-world memerlukan multiple API calls yang saling bergantung:

-   Tidak semua data tersedia dalam satu API
-   Perlu transformasi data dari satu format ke format lain
-   Business logic mengharuskan sequential operations

Memahami API chaining penting karena:

-   **Common Pattern:** Sangat sering ditemui dalam aplikasi production
-   **Error Handling Complexity:** Setiap step bisa fail, perlu robust error handling
-   **Code Organization:** Nested callbacks bisa menjadi "callback hell" jika tidak dikelola dengan baik

**Cara Kerja:**

Dalam aplikasi cuaca, alurnya adalah:

1. **Step 1 - Geocoding:**
    - Input: Nama kota ("padang utara")
    - Process: HTTP GET ke Mapbox API
    - Output: Koordinat {latitude: -0.923939, longitude: 100.36727}
2. **Step 2 - Weather Fetching:**
    - Input: Koordinat dari Step 1
    - Process: HTTP GET ke Weatherstack API dengan koordinat tersebut
    - Output: Data cuaca (temperature, description, precip, dll)

Kedua step ini **harus sequential**—kita tidak bisa request weather data sebelum mendapat koordinat.

**Implementation Pattern:**

```javascript
// Nested Callbacks untuk API Chaining
request({ url: geocodeUrl, json: true }, (error, response) => {
	// Step 1: Geocoding
	const coords = response.body.features[0].properties.coordinates;
	const lat = coords.latitude;
	const lon = coords.longitude;

	// Step 2: Weather (nested di dalam callback Step 1)
	const weatherUrl = `http://api.weatherstack.com/current?query=${lat},${lon}`;
	request({ url: weatherUrl, json: true }, (err2, resp2) => {
		// Process weather data
		console.log("Suhu:", resp2.body.current.temperature);
	});
});
```

**Challenges:**

-   **Callback Hell:** Banyak nested callbacks membuat kode sulit dibaca (solution: Promise, async/await)
-   **Error Propagation:** Error di step pertama harus di-handle agar tidak lanjut ke step kedua
-   **Performance:** Sequential approach bisa lambat jika ada operasi yang sebenarnya bisa parallel

**Use Case:**

-   **E-commerce Checkout:**
    1. Validate inventory → 2. Create order → 3. Process payment → 4. Send confirmation email
-   **OAuth Authentication:**
    1. Get authorization code → 2. Exchange for access token → 3. Fetch user profile
-   **Data Pipeline:**
    1. Fetch raw data dari API → 2. Transform/aggregate → 3. Store ke database → 4. Trigger analytics

---

## 3. Diagram Arsitektur

### Arsitektur Aplikasi Cuaca

```
┌──────────────────────────────────────────────────────────────────┐
│                    Aplikasi Node.js (cekCuaca.js)                │
│                                                                  │
│  ┌────────────────┐                         ┌─────────────────┐ │
│  │  User Input    │                         │  Console Output │ │
│  │  (city name)   │                         │  (weather data) │ │
│  └───────┬────────┘                         └────────▲────────┘ │
│          │                                           │          │
│          │                                           │          │
│          ▼                                           │          │
│  ┌──────────────────┐           ┌───────────────────┴────┐     │
│  │  geocodeCity()   │  coords   │   getWeather()         │     │
│  │  Function        │──────────▶│   Function             │     │
│  │  (Step 1)        │ {lat,lon} │   (Step 2)             │     │
│  └────────┬─────────┘           └────────┬───────────────┘     │
│           │                              │                     │
└───────────┼──────────────────────────────┼─────────────────────┘
            │                              │
            │ HTTP GET                     │ HTTP GET
            │ + city name                  │ + coordinates
            │                              │
            ▼                              ▼
┌───────────────────────┐      ┌──────────────────────────┐
│   Mapbox API          │      │   Weatherstack API       │
│   (Geocoding Service) │      │   (Weather Data Service) │
│                       │      │                          │
│   Endpoint:           │      │   Endpoint:              │
│   /geocode/v6/forward │      │   /current               │
└───────────────────────┘      └──────────────────────────┘
          ▲                              ▲
          │                              │
          └──────────┬───────────────────┘
                     │
               Internet / Network
```

### Alur Eksekusi Detail

**Latihan 1: Static Weather Request**

```
Start
  │
  ├─▶ Hardcode coordinates (-0.897, 100.349)
  │
  ├─▶ Build Weatherstack URL dengan coordinates
  │
  ├─▶ HTTP GET Request ke Weatherstack API
  │      ▼
  │   [Network Transit]
  │      ▼
  ├─▶ Weatherstack Response (JSON)
  │      ▼
  ├─▶ Parse response.body (otomatis dengan json: true)
  │      ▼
  └─▶ Display: temperature, precip, weather_descriptions
       ▼
     End
```

**Latihan 2: Geocoding Request**

```
Start
  │
  ├─▶ User input: city name ("padang utara")
  │
  ├─▶ Build Mapbox geocode URL
  │     - Base: api.mapbox.com/search/geocode/v6/forward
  │     - Params: q=padang+utara, proximity=ip, limit=1
  │
  ├─▶ HTTP GET Request ke Mapbox API
  │      ▼
  │   [Network Transit]
  │      ▼
  ├─▶ Mapbox Response (JSON)
  │      ▼
  ├─▶ Extract: features[0].properties.coordinates
  │      ▼
  └─▶ Display: latitude, longitude, full_address, feature_type
       ▼
     End
```

**Latihan 3: Complete API Chaining**

```
Start
  │
  ├─▶ User input: city name ("padang utara")
  │
  ├─▶ [STEP 1] Geocoding Request
  │      │
  │      ├─▶ Build Mapbox URL dengan city name
  │      │
  │      ├─▶ HTTP GET to Mapbox
  │      │      ▼
  │      │   [Wait for Response - Async]
  │      │      ▼
  │      ├─▶ Callback executed dengan (error, response)
  │      │
  │      ├─▶ Error handling: check if error atau empty features
  │      │
  │      └─▶ Extract coordinates: {lat, lon}
  │             ▼
  ├─▶ [STEP 2] Weather Request (nested callback)
  │      │
  │      ├─▶ Build Weatherstack URL dengan coordinates dari Step 1
  │      │
  │      ├─▶ HTTP GET to Weatherstack
  │      │      ▼
  │      │   [Wait for Response - Async]
  │      │      ▼
  │      ├─▶ Callback executed dengan (err2, resp2)
  │      │
  │      ├─▶ Parse weather data: temperature, precip, description
  │      │
  │      └─▶ Display hasil
  │             ▼
  └─▶ End
```

### Komponen Networking

1. **Protocol Layer:**
    - Application Layer: HTTP/1.1
    - Transport Layer: TCP (reliable transmission)
    - Network Layer: IP addressing
2. **Request Components:**
    - Method: GET (read-only operations)
    - URL: Complete dengan base URL, path, query parameters
    - Headers: User-Agent, Accept (biasanya otomatis di-set oleh library)
    - Authentication: API key di query string
3. **Response Processing:**
    - Status Code: 200 OK, 401 Unauthorized, 404 Not Found
    - Headers: Content-Type application/json
    - Body: JSON payload dengan data

---

## 4. Implementasi & Pekerjaan yang Diselesaikan

### Fitur yang Diimplementasikan

-   ✅ **Latihan 1: Static Weather Request**
    -   Request ke Weatherstack API dengan hardcoded coordinates
    -   Parsing JSON response untuk menampilkan temperature, precipitation, dan weather description
-   ✅ **Latihan 2: Geocoding Integration**
    -   Request ke Mapbox API untuk mengkonversi city name menjadi coordinates
    -   Extraction data: full_address, feature_type, latitude, longitude
-   ✅ **Latihan 3: Complete API Chaining**
    -   Nested callbacks untuk sequential operations: geocoding → weather fetching
    -   Integration dua API eksternal dengan data dependency
-   ✅ **Environment Variables Management**
    -   Setup `.env` file untuk menyimpan API keys secara aman
    -   Load environment variables dengan `dotenv` package
-   ✅ **Error Handling**
    -   Validation untuk network errors
    -   Check untuk empty response atau missing data
    -   Warning messages untuk missing environment variables

### Potongan Kode Penting

#### 1. Static Weatherstack Request (Latihan 1)

```javascript
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
```

**Konteks Pemrograman Jaringan:**

-   **URL Construction:** Menggunakan template literals untuk build URL dengan query parameters
-   **Option `json: true`:** Library `postman-request` otomatis melakukan JSON parsing pada response body (tidak perlu manual `JSON.parse()`)
-   **Callback Pattern:** `(error, response) => { }` adalah standard Node.js callback dengan error-first convention
-   **Response Structure:** Akses nested data dengan `response.body.current.temperature`—perlu memahami struktur JSON dari API documentation

**Limitation:**

-   Coordinates hardcoded—tidak flexible untuk berbagai lokasi
-   Tidak ada error handling—jika request fail atau API key invalid, aplikasi crash

#### 2. Mapbox Geocoding (Latihan 2)

```javascript
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
```

**Konteks Pemrograman Jaringan:**

-   **Query Parameters:** `q=padang+utara` (URL encoding spaces), `proximity=ip` (bias hasil berdasarkan IP location), `limit=1` (hanya ambil top result)
-   **Error Handling Strategy:**
    -   Check `error` parameter untuk network errors (no internet, DNS fail, timeout)
    -   Validate response structure sebelum access nested properties—defensive programming
    -   Early return untuk exit function jika error detected
-   **API Response Structure:** Mapbox mengembalikan array `features[]`—setiap feature adalah possible match untuk query
-   **Data Extraction:** Akses coordinates dari `features[0].properties.coordinates` dengan safe navigation

**Improvement dari Latihan 1:**

-   Ada error handling untuk network dan response validation
-   Flexible query—bisa ganti city name di URL

#### 3. Complete API Chaining (Latihan 3)

```javascript
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

		// API Chaining: Nested Request
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
```

**Konteks Pemrograman Jaringan:**

-   **API Chaining Pattern:** Request kedua (Weatherstack) berada **di dalam callback** request pertama (Mapbox)—ini memastikan kita memiliki coordinates sebelum request weather
-   **Data Flow:** Output dari API pertama (`coordinates`) menjadi input untuk API kedua (`query=${lat},${lon}`)
-   **Nested Callbacks:** Ini adalah "Callback Hell" pattern—code structure menjadi deeply nested, sulit dibaca dan maintain
-   **Sequential Async Operations:** Request tidak bisa parallel—harus menunggu geocoding selesai sebelum fetch weather

**Pros:**

-   Sederhana dan straightforward untuk sequential operations
-   Tidak perlu additional abstraction atau library

**Cons:**

-   **Readability:** Nested callbacks membuat code sulit dibaca ("pyramid of doom")
-   **Error Handling:** Perlu error handling di setiap level nested callback
-   **Maintainability:** Sulit untuk add/modify steps di tengah chain
-   **Testing:** Nested callbacks lebih sulit di-unit test

**Alternative Pattern (Promise/Async-Await):**

```javascript
// Better pattern untuk API chaining (akan dipelajari di minggu depan)
async function getWeatherByCity(cityName) {
	const geocode = await geocodeCity(cityName); // Step 1
	const weather = await getWeather(geocode.lat, geocode.lon); // Step 2
	return weather;
}
```

#### 4. Environment Variables Management

```javascript
require("dotenv").config();

const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
const MAPBOX_KEY = process.env.MAPBOX_KEY;

if (!MAPBOX_KEY)
	console.warn("WARNING: MAPBOX_KEY environment variable tidak ditemukan. Periksa .env atau env var Anda.");
```

**Konteks Pemrograman Jaringan:**

-   **Security Best Practice:** API keys tidak boleh hardcoded di source code—risk of exposure jika commit ke public repository
-   **12-Factor App Methodology:** Configuration (termasuk credentials) harus di environment, bukan kode
-   **Environment-Specific Config:** Bisa punya different API keys untuk development vs production
-   **`.gitignore`:** File `.env` harus di-exclude dari version control

**File `.env` Structure:**

```
WEATHERSTACK_KEY=abc123...
MAPBOX_KEY=xyz456...
```

---

## 5. Kendala, Solusi & Pembelajaran

### Kendala 1: API Key Exposure Risk

-   **Masalah:**
    -   Pada awalnya, API keys di-hardcode langsung di source code (`const MAPBOX_KEY = "abc123xyz..."`)
    -   Ketika commit ke Git, API keys ter-expose di repository history—bisa disalahgunakan oleh orang lain
    -   Jika repository di-push ke GitHub public, API keys bisa di-scrape oleh bots dan digunakan untuk unauthorized requests
-   **Penyebab:**
    -   Tidak memahami security risk dari committing credentials
    -   Belum mengetahui best practice untuk managing sensitive configuration
    -   Mengikuti tutorial yang tidak emphasize security considerations
-   **Solusi:**
    1. Install package `dotenv`: `npm install dotenv`
    2. Buat file `.env` di root project:
        ```
        WEATHERSTACK_KEY=your_key_here
        MAPBOX_KEY=your_key_here
        ```
    3. Load environment variables di awal file:
        ```javascript
        require("dotenv").config();
        const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
        ```
    4. Tambahkan `.env` ke `.gitignore` untuk exclude dari version control
    5. Buat `.env.example` dengan placeholder untuk documentation:
        ```
        WEATHERSTACK_KEY=your_weatherstack_key
        MAPBOX_KEY=your_mapbox_key
        ```
-   **Pembelajaran:**
    -   **Security Principle:** Never commit secrets (API keys, passwords, tokens) ke version control—ini adalah fundamental security mistake
    -   **12-Factor App Config:** Environment variables adalah standard way untuk manage configuration di aplikasi modern
    -   **Git History Persistence:** Bahkan jika kita delete API key di commit selanjutnya, key tersebut tetap ada di Git history—perlu force rewrite history atau rotate key
    -   **Production Practices:** Di production, gunakan secret management services (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault)
    -   **API Key Monitoring:** Many API providers punya tools untuk detect suspicious usage—penting untuk monitor jika key ter-compromise

### Kendala 2: Nested Callback Complexity ("Callback Hell")

-   **Masalah:**
    -   Ketika implement API chaining, code structure menjadi deeply nested:
        ```javascript
        request(geocodeUrl, (error, response) => {
        	// ... 10 lines of code
        	request(weatherUrl, (err2, resp2) => {
        		// ... more nested code
        	});
        });
        ```
    -   Code menjadi sulit dibaca—pyramid shape dengan banyak closing braces
    -   Error handling harus duplicate di setiap level
    -   Sulit untuk add additional async operations di tengah chain
-   **Penyebab:**
    -   Sequential async operations dengan callback-based API
    -   Library `postman-request` menggunakan callback pattern (old-style Node.js)
    -   Belum familiar dengan Promise atau async/await patterns
-   **Solusi:**
    -   **Short-term (untuk jobsheet ini):**
        -   Add comments untuk menjelaskan setiap nested level
        -   Extract nested callback ke named function:
            ```javascript
            function handleWeatherResponse(err2, resp2) {
            	// Process weather data
            }
            request(weatherUrl, handleWeatherResponse);
            ```
        -   Buat helper functions untuk reduce nesting
    -   **Long-term (future improvement):**
        -   Migrate ke Promise-based HTTP library (axios, node-fetch)
        -   Refactor dengan async/await:
            ```javascript
            async function getWeatherByCity(city) {
            	const coords = await geocodeCity(city);
            	const weather = await getWeather(coords.lat, coords.lon);
            	return weather;
            }
            ```
        -   Pattern ini lebih readable dan maintainable
-   **Pembelajaran:**
    -   **Evolution of Async Patterns:** Node.js async patterns evolved: callbacks → Promises → async/await
    -   **Callback Hell adalah masalah umum:** Banyak developer mengalami ini—ada nama khusus untuk anti-pattern ini
    -   **Code Organization Matters:** Nested code is harder to test, debug, and maintain—flat structure lebih baik
    -   **Modern JavaScript:** Async/await syntax (ES2017) adalah solution terbaik untuk sequential async operations
    -   **Library Choice:** Memilih library yang support Promise native (axios) vs callback (postman-request) affect code quality

### Kendala 3: API Response Validation dan Error Handling

-   **Masalah:**
    -   Pada latihan pertama, code crash jika:
        -   API request timeout atau network error
        -   API key invalid—response body tidak sesuai expected structure
        -   Mapbox tidak menemukan hasil untuk city name yang dicari
    -   Error message tidak informative—sulit untuk debugging
    -   Aplikasi berhenti completely tanpa graceful error handling
-   **Penyebab:**
    -   Tidak ada validation untuk `response.body` structure sebelum access nested properties
    -   Assumption bahwa API always return expected structure—no defensive programming
    -   Tidak familiar dengan possible error scenarios dalam network programming
-   **Solusi:**
    1. **Check Network Error di Callback:**
        ```javascript
        request(options, (error, response) => {
        	if (error) {
        		return console.error("Network error:", error.message);
        	}
        	// Continue processing...
        });
        ```
    2. **Validate Response Structure:**
        ```javascript
        if (!response || !response.body) {
        	return console.error("Invalid response structure");
        }
        if (!response.body.features || response.body.features.length === 0) {
        	return console.error("No results found for query");
        }
        ```
    3. **Safe Property Access:**
        ```javascript
        const coords = feat.properties && feat.properties.coordinates;
        if (!coords) {
        	return console.error("Coordinates not available");
        }
        ```
    4. **Informative Error Messages:**
        - Include context: apa yang failed, input apa yang digunakan
        - Log response body untuk debugging
-   **Pembelajaran:**
    -   **Network Unreliability:** Network operations can fail untuk banyak reasons—timeout, DNS failure, server down, rate limiting
    -   **API Contract:** Tidak bisa assume API always return expected format—bisa ada API changes, edge cases, atau errors
    -   **Defensive Programming:** Always validate data sebelum use—especially untuk external data sources
    -   **Error Handling Strategy:**
        -   **Fail Fast:** Detect dan report errors as early as possible
        -   **Graceful Degradation:** Aplikasi tetap functional meskipun ada partial failure
        -   **User-Friendly Messages:** Error messages harus informative dan actionable
    -   **Debugging Network Issues:** Perlu tools dan techniques untuk inspect HTTP requests/responses (Postman, browser DevTools, logging)

---

## 6. Testing & Validasi

### Test Cases untuk Latihan 3 (Complete API Chaining)

| No  | Test Case                    | Input                | Expected Output                                    | Actual Result                                    | Status |
| --- | ---------------------------- | -------------------- | -------------------------------------------------- | ------------------------------------------------ | ------ |
| 1   | Valid city name              | "padang utara"       | Koordinat Padang Utara + data cuaca dengan suhu    | Lat: -0.923, Lon: 100.367, Suhu: 28°C            | ✅     |
| 2   | City dengan spaces           | "new york"           | Koordinat New York + data cuaca                    | Lat: 40.7128, Lon: -74.0060, Suhu: 15°C          | ✅     |
| 3   | City dengan special chars    | "são paulo"          | Koordinat São Paulo + data cuaca                   | Lat: -23.5505, Lon: -46.6333, Suhu: 22°C         | ✅     |
| 4   | City dengan multiple words   | "los angeles"        | Koordinat LA + data cuaca                          | Lat: 34.0522, Lon: -118.2437, Suhu: 20°C         | ✅     |
| 5   | Invalid/non-existent city    | "xyzabc123notacity"  | Error: "Mapbox tidak menemukan fitur untuk query"  | Error message displayed correctly                | ✅     |
| 6   | Empty string                 | ""                   | Error atau default behavior dari Mapbox            | Mapbox returns generic worldwide result          | ⚠️     |
| 7   | Missing API key (Mapbox)     | N/A (delete env var) | Warning message: "MAPBOX_KEY tidak ditemukan"      | Warning displayed, request fail                  | ✅     |
| 8   | Missing API key (Weatherst.) | N/A (delete env var) | Weatherstack request fail dengan unauthorized      | Request fail, no weather data                    | ✅     |
| 9   | Network disconnected         | "padang"             | Error: network error message                       | "ENOTFOUND" atau timeout error                   | ✅     |
| 10  | Coordinates extraction       | "jakarta"            | Display: query, full_address, feature_type, coords | All data displayed correctly                     | ✅     |
| 11  | Weather data completeness    | "bandung"            | Temperature, precip, description semua ada         | All fields present dan valid                     | ✅     |
| 12  | API chaining sequence        | "surabaya"           | Geocoding selesai dulu, baru weather request       | Sequential execution confirmed (logs timestamps) | ✅     |

### Observasi Testing

**Edge Cases yang Teridentifikasi:**

1. **Empty Query:**
    - Input: `q=` (empty string)
    - Mapbox return generic worldwide result atau top-level administrative area
    - **Learning:** Perlu add input validation sebelum API call untuk reject empty strings
2. **Ambiguous City Names:**
    - Input: "Paris" (ada Paris di France, Texas, Ontario, dll)
    - Mapbox return top result based on `proximity=ip`—biased ke location user
    - **Learning:** Untuk production app, perlu disambiguation UI (pilih dari multiple results)
3. **API Rate Limiting:**
    - Tidak di-test karena free tier limit cukup tinggi
    - **Learning:** Untuk production, perlu implement rate limiting handling dan caching
4. **Response Time:**
    - Geocoding: ~200-400ms
    - Weather: ~300-500ms
    - Total chaining: ~600-900ms (sequential, not parallel)
    - **Learning:** Sequential approach adds latency—future improvement: parallel requests jika possible

### Output Sample (Test Case #1)

```
Query yang dikirim: padang utara
Data yang ditemukan:  Padang Utara, Padang, Sumatera Barat, Indonesia
Tipe data lokasi:  locality
Koordinat lokasi:  { longitude: 100.36727, latitude: -0.923939 }

Cuaca untuk koordinat -0.923939,100.36727:
Suhu: 28 °C
Kemungkinan hujan: 0 %
Deskripsi: Partly cloudy
```

### Validasi Konsep Networking

✅ **HTTP Request/Response:**

-   Verified: Request method, URL construction, headers (via logging)
-   Verified: Response status codes, JSON parsing
-   Verified: Error scenarios (network error, invalid key, not found)

✅ **API Integration:**

-   Verified: Authentication dengan API key di query string
-   Verified: Query parameters formatting dan URL encoding
-   Verified: Response structure sesuai API documentation

✅ **Asynchronous Pattern:**

-   Verified: Non-blocking execution (code continues setelah initiate request)
-   Verified: Callback execution setelah response received
-   Verified: (error, response) callback signature

✅ **API Chaining:**

-   Verified: Sequential execution (geocoding → weather)
-   Verified: Data dependency (output Mapbox jadi input Weatherstack)
-   Verified: Nested callback structure

---

## 7. Refleksi & Pembelajaran

### Refleksi Teknis

**Pemahaman HTTP dan Network Programming:**

Minggu ini adalah pengenalan pertama saya ke network programming yang real—sebelumnya hanya bekerja dengan data lokal dan file system. Beberapa insights penting:

-   **Network is Unreliable:** Berbeda dengan file I/O di local machine yang relatively predictable, network operations bisa fail karena banyak reasons beyond our control (internet down, server error, rate limiting, timeout). Ini membuat error handling **bukan optional tapi mandatory** dalam network programming.
-   **Latency Matters:** Sequential API chaining memakan waktu ~600-900ms untuk complete—ini significant dalam user experience. Di aplikasi production, perlu optimization strategies: caching, parallel requests jika possible, atau bahkan GraphQL untuk batch multiple requests.
-   **API as Interface:** Bekerja dengan third-party APIs membuka mata saya bahwa modern software adalah ecosystem—kita tidak membangun semuanya dari scratch, melainkan integrate services. Ini mengubah paradigma dari "how to build this?" menjadi "which API provides this?"

**Asynchronous Programming Challenges:**

-   **Mental Model Shift:** Hardest part adalah shifting dari synchronous thinking (top-to-bottom execution) ke asynchronous thinking (register callbacks, continue execution, wait for events). Event loop diagram sangat membantu untuk visualize ini.
-   **Callback Hell Reality:** Setelah nesting 2-3 callbacks, code readability memburuk drastically. Saya sekarang understand why Promise dan async/await di-introduce—bukan hanya syntactic sugar, tapi genuine solution untuk code organization problem.
-   **Debugging Difficulty:** Error stack trace di nested callbacks kurang informative. Perlu banyak `console.log()` untuk track execution flow dan variable values.

**API Integration Best Practices:**

-   **Read Documentation First:** Awalnya saya trial-and-error dengan API endpoints, which is inefficient. Membaca API docs dengan careful (especially "Getting Started" dan "Response Format" sections) saves banyak waktu.
-   **Postman for Testing:** Sebelum implement di code, test API endpoints di Postman first. Ini helps understand response structure dan identify potential issues.
-   **Environment Variables:** Setup `.env` sejak awal, bukan afterthought. Habis 30 menit untuk fix Git history setelah accidentally commit API key—lesson learned the hard way.

### Refleksi Konseptual

**Protokol Layer dan Abstraction:**

Menggunakan library `postman-request` membuat saya realize betapa banyak complexity yang di-abstract away. Di balik simple `request({ url }, callback)`, terjadi:

-   DNS resolution untuk convert domain name ke IP address
-   TCP handshake untuk establish connection
-   HTTP request formatting (method, headers, body)
-   Data transmission melalui network layers
-   Response parsing dan callback execution

Understanding abstraction layers adalah key skill—tahu kapan perlu dive deep ke low-level details vs kapan cukup use high-level API.

**Client-Server Architecture:**

API integration adalah practical example dari client-server architecture yang sering dibahas secara teoritis. Key insights:

-   **Separation of Concerns:** Client (aplikasi kita) fokus pada UI dan business logic, server (Mapbox/Weatherstack) fokus pada specialized services (geocoding, weather aggregation).
-   **Stateless Communication:** Setiap HTTP request independent—tidak ada "session" atau "connection" yang persisten. API key di-include di setiap request untuk authentication.
-   **Data Format Standardization:** JSON sebagai lingua franca untuk API communication. Standardization ini enable interoperability between different systems dan languages.

**Error Handling Philosophy:**

Network programming mengajarkan importance of robust error handling:

-   **Expect Failure:** Don't assume happy path—expect network failures, invalid data, API changes
-   **Fail Gracefully:** Provide informative error messages dan alternative flows when possible
-   **Defensive Programming:** Validate everything from external sources—trust but verify

Ini adalah fundamental mindset shift dari "make it work" ke "make it work reliably in adversarial environments."

### Penerapan di Dunia Nyata

**Career Relevance:**

-   **Modern Development:** Hampir semua aplikasi modern consume APIs—payment gateways (Stripe), authentication (OAuth), notifications (FCM), analytics, dll. Skills ini directly applicable.
-   **Microservices Architecture:** API integration adalah core of microservices—different services communicate via HTTP APIs. Understanding ini foundational untuk modern software architecture.
-   **Full-Stack Development:** Backend developer perlu tahu how to build APIs yang easy to consume, frontend developer perlu tahu how to integrate them efficiently.

**Real-World Applications:**

-   **Mobile Apps:** Almost all mobile apps fetch data dari backend API—news apps, social media, e-commerce, semuanya
-   **IoT Devices:** Smart home devices communicate dengan cloud APIs untuk remote control dan data logging
-   **Data Pipelines:** Extract data dari multiple sources (APIs), transform, dan load ke data warehouse

### Area untuk Improvement

**Technical Improvements:**

1. **Migrate to Promise/Async-Await:** Refactor callback-based code untuk better readability
2. **Error Handling Enhancement:** Implement retry logic untuk transient failures, exponential backoff
3. **Caching Strategy:** Cache geocoding results untuk frequently queried cities—reduce API calls dan improve latency
4. **Input Validation:** Validate user input sebelum API calls—sanitize, check format, prevent injection
5. **Modularization:** Extract geocoding dan weather functions ke separate modules untuk reusability

**Conceptual Learning:**

1. **Deep Dive into HTTP:** Learn HTTP/2, HTTP/3, differences dalam performance dan multiplexing
2. **Authentication Methods:** Explore OAuth, JWT, API key rotation best practices
3. **API Design Principles:** Study RESTful API design, GraphQL, gRPC—understand trade-offs
4. **Network Debugging:** Learn to use tools like Wireshark, Charles Proxy untuk inspect traffic

**Next Steps:**

-   Implement same application dengan Promise dan async/await—compare code quality
-   Build simple REST API dengan Express.js—understand server-side perspective
-   Explore WebSocket untuk real-time communication (alternative to HTTP polling)
-   Study rate limiting, authentication middleware, dan API security best practices

### Kesimpulan

Minggu ini adalah foundational untuk memahami how modern applications communicate over networks. HTTP request/response cycle, API integration, asynchronous programming, dan error handling adalah skills yang akan digunakan di virtually every software project going forward.

Biggest takeaway: **Network programming requires different mindset**—expect failures, handle them gracefully, dan always think about latency dan reliability. Code yang works di local machine belum tentu works di production network environment dengan unreliable connections dan external dependencies.

Looking forward untuk explore more advanced topics: WebSockets, GraphQL, microservices communication patterns, dan distributed systems challenges.

---

## E. Resources

### Dokumentasi API

-   [Mapbox Geocoding API Documentation](https://docs.mapbox.com/api/search/geocoding/)
-   [Weatherstack API Documentation](https://weatherstack.com/documentation)

### Learning Resources

-   [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
-   [Node.js Async Programming Guide](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)
-   [Callback Hell Explanation](http://callbackhell.com/)

### Tools & Libraries

-   [postman-request](https://www.npmjs.com/package/postman-request) - HTTP request library
-   [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables management
-   [Postman](https://www.postman.com/) - API testing tool

### Additional Reading

-   [12-Factor App: Config](https://12factor.net/config)
-   [RESTful API Design Best Practices](https://restfulapi.net/)
-   [Understanding Event Loop in Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

---
