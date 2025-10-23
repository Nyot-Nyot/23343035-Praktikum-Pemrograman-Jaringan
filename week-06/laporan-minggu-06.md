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

**Fokus minggu ini:** HTTP Request dan Integrasi API

Minggu ini fokus pembelajaran diarahkan pada pemahaman mendalam tentang HTTP request dan integrasi API eksternal dalam konteks pemrograman jaringan. Topik ini menjadi fundamental karena hampir semua aplikasi modern berkomunikasi dengan layanan eksternal melalui protokol HTTP.

**Tujuan pembelajaran:**

Terdapat empat tujuan utama yang ingin dicapai dalam pembelajaran minggu ini. Pertama, memahami cara kerja siklus HTTP request/response dalam komunikasi jaringan—mulai dari bagaimana client membuat permintaan hingga server mengirim respons. Kedua, mengimplementasikan rantai API dengan nested callbacks untuk menghubungkan dua API berbeda (geocoding dan data cuaca) di mana keluaran dari API pertama menjadi masukan untuk API kedua. Ketiga, menguasai penanganan error untuk permintaan jaringan karena operasi jaringan memiliki banyak titik kegagalan potensial yang harus ditangani dengan baik. Keempat, memahami perbedaan antara permintaan statis dan dinamis pada konsumsi API, serta implikasinya terhadap fleksibilitas dan kemudahan pemeliharaan aplikasi.

---

## 2. Konsep Pemrograman Jaringan

### Konsep 1: Siklus HTTP Request/Response

**Definisi:**

HTTP (Hypertext Transfer Protocol) adalah protokol lapisan aplikasi yang mendefinisikan bagaimana client dan server berkomunikasi melalui jaringan. Komunikasi terjadi dalam bentuk permintaan dari client dan respons dari server. Setiap transaksi HTTP bersifat stateless—artinya setiap permintaan diperlakukan secara independen tanpa menyimpan informasi tentang permintaan sebelumnya.

**Mengapa Penting:**

HTTP adalah fondasi dari semua komunikasi web modern. Dalam pemrograman jaringan, pemahaman tentang HTTP menjadi sangat penting karena protokol ini memungkinkan aplikasi untuk berkomunikasi dengan server API eksternal dalam mengambil atau mengirim data. Lebih dari itu, HTTP memungkinkan kita membangun aplikasi client-server yang dapat berkembang dan modular dengan memisahkan tanggung jawab antara frontend dan backend melalui arsitektur RESTful.

Dalam konteks pengembangan aplikasi modern, HTTP memfasilitasi integrasi dengan layanan pihak ketiga seperti payment gateway, API media sosial, dan layanan pemetaan. Tanpa memahami HTTP secara mendalam, pengembang tidak dapat membangun aplikasi yang bergantung pada komunikasi jaringan—yang berarti hampir semua aplikasi modern karena isolasi total dari jaringan sudah sangat jarang terjadi.

**Cara Kerja:**

Proses siklus HTTP request/response melibatkan lima tahap utama yang terjadi secara berurutan. Tahap pertama adalah **pembuatan permintaan**, di mana client membuat HTTP request yang terdiri dari beberapa komponen penting: method (seperti GET, POST, PUT, atau DELETE) yang menunjukkan jenis operasi yang akan dilakukan, URL atau URI sebagai alamat resource yang diminta, headers yang berisi metadata seperti content-type, authorization, dan user-agent, serta body yang bersifat opsional untuk mengirim data dalam format JSON atau form-data.

Tahap kedua adalah **transmisi jaringan**, di mana permintaan yang telah dibuat dikirim melalui jaringan menggunakan tumpukan protokol TCP/IP. Pada tahap ini terjadi proses kompleks di lapisan-lapisan jaringan yang lebih rendah untuk memastikan data sampai ke tujuan dengan andal.

Tahap ketiga adalah **pemrosesan server**, di mana server menerima permintaan tersebut, melakukan parsing, memproses sesuai dengan logika bisnis yang telah didefinisikan, dan menyiapkan respons yang sesuai. Pada tahap ini terjadi interaksi dengan database, file system, atau layanan lain sesuai kebutuhan.

Tahap keempat adalah **pembentukan respons**, di mana server mengirim HTTP response yang terdiri dari kode status (seperti 200 OK untuk sukses, 404 Not Found untuk resource tidak ditemukan, atau 500 Internal Server Error untuk kesalahan server), headers yang berisi metadata respons, dan body yang berisi data yang diminta atau pesan error jika terjadi masalah.

Tahap kelima dan terakhir adalah **pemrosesan client**, di mana client menerima respons, memvalidasi kode status untuk menentukan apakah permintaan berhasil atau gagal, dan memproses data yang diterima sesuai dengan kebutuhan aplikasi. Pada tahap ini juga dilakukan penanganan error jika respons menunjukkan adanya kesalahan.

**Contoh Penerapan:**

Penerapan siklus HTTP request/response sangat luas dalam aplikasi modern. Dalam konteks **aplikasi mobile**, aplikasi e-commerce menggunakan GET request untuk mendapatkan daftar produk dari server, kemudian menggunakan POST request untuk mengirim data pesanan ketika pengguna melakukan pembelian. Untuk **aplikasi cuaca**, aplikasi melakukan permintaan ke API cuaca seperti Weatherstack untuk mendapatkan data cuaca waktu-nyata berdasarkan lokasi pengguna yang sedang aktif. Dalam **integrasi media sosial**, aplikasi mengimplementasikan alur OAuth dengan serangkaian HTTP request untuk memungkinkan pengguna masuk menggunakan akun Facebook atau Google mereka. Sedangkan dalam **pemrosesan pembayaran**, aplikasi melakukan POST request ke payment gateway untuk memproses transaksi kartu kredit secara aman dan waktu-nyata.

### Konsep 2: Integrasi API dan Layanan Pihak Ketiga

**Definisi:**

Integrasi API (Application Programming Interface) adalah proses menghubungkan aplikasi kita dengan layanan eksternal melalui API yang disediakan. API pihak ketiga seperti Mapbox untuk geocoding dan Weatherstack untuk data cuaca menyediakan endpoint yang dapat kita akses dengan HTTP request untuk mendapatkan data atau fungsionalitas tertentu.

**Mengapa Penting:**

Dalam ekosistem perangkat lunak modern, tidak semua fungsionalitas perlu dibangun dari nol. Integrasi API memungkinkan pengembang untuk **memanfaatkan layanan yang sudah ada** dengan menggunakan layanan spesialis seperti pemetaan, pembayaran, atau email tanpa perlu membangun infrastruktur tersebut dari nol. Hal ini memungkinkan tim pengembangan untuk **fokus pada logika bisnis inti** yaitu fitur-fitur unik yang membedakan aplikasi mereka dari kompetitor, bukan pada fungsi-fungsi umum yang sudah tersedia sebagai layanan.

Dari sisi **skalabilitas**, layanan pihak ketiga biasanya sudah dioptimasi untuk menangani beban yang besar dan memiliki infrastruktur global yang sulit dibangun sendiri oleh startup atau tim kecil. Ini juga berimplikasi pada **efisiensi waktu dan biaya** karena mengurangi waktu pengembangan secara signifikan dan menurunkan biaya operasional karena tidak perlu memelihara infrastruktur sendiri untuk fungsi-fungsi yang bisa diserahkan ke layanan khusus.

**Cara Kerja:**

Proses integrasi API mengikuti alur kerja yang terstruktur dalam lima tahap. Pertama adalah **penelaahan dokumentasi API**, di mana pengembang membaca dokumentasi API dengan teliti untuk memahami endpoint yang tersedia, parameter yang diperlukan, metode autentikasi yang digunakan (API key, OAuth, JWT, dll), serta format respons yang akan diterima. Dokumentasi yang baik biasanya juga menyertakan contoh permintaan dan respons untuk memudahkan implementasi.

Tahap kedua adalah **pengaturan autentikasi**, di mana pengembang mendaftar untuk mendapatkan API key atau token untuk autentikasi. Kredensial ini biasanya disimpan sebagai environment variable untuk alasan keamanan, bukan di-hardcode di dalam kode sumber. Beberapa API menggunakan autentikasi yang lebih kompleks seperti OAuth 2.0 yang memerlukan alur khusus.

Tahap ketiga adalah **konstruksi permintaan**, di mana pengembang membuat HTTP request dengan komponennya: URL dasar dari penyedia API (misalnya `api.mapbox.com`), endpoint yang sesuai dengan fungsi yang diinginkan (misalnya `/geocode/v6/forward`), parameter query atau data body yang berisi informasi yang diperlukan, dan API key yang disertakan di header atau query string sesuai dengan persyaratan dari penyedia.

Tahap keempat adalah **penanganan respons**, di mana aplikasi menerima respons JSON dari API, melakukan parsing untuk mengekstrak data yang diperlukan, dan melakukan penanganan error untuk menangani berbagai kemungkinan skenario kegagalan seperti kesalahan jaringan, kredensial tidak valid, atau pembatasan laju permintaan.

Tahap kelima dan terakhir adalah **pemrosesan data**, di mana data yang telah diekstrak dari respons API digunakan untuk logika aplikasi—bisa disimpan ke database, ditampilkan ke pengguna, atau digunakan sebagai masukan untuk pemanggilan API berikutnya dalam rantai.

**Contoh Penerapan:**

Implementasi integrasi API sangat beragam dalam aplikasi modern. **Mapbox Geocoding API** digunakan untuk mengkonversi nama tempat dalam format yang mudah dibaca manusia seperti "Padang Utara" menjadi koordinat geografis (latitude dan longitude) yang diperlukan untuk layanan berbasis lokasi. **Weatherstack API** menyediakan data cuaca waktu-nyata berdasarkan koordinat geografis untuk aplikasi prakiraan cuaca, memberikan informasi seperti suhu, curah hujan, kecepatan angin, dan kondisi cuaca. **Stripe Payment API** memungkinkan aplikasi memproses pembayaran tanpa perlu mematuhi PCI DSS secara langsung, karena informasi pembayaran sensitif ditangani oleh Stripe. Sedangkan **SendGrid Email API** digunakan untuk mengirim email transaksional dengan tingkat keberhasilan pengiriman yang tinggi dan analitik yang komprehensif.

### Konsep 3: Permintaan Asynchronous dan Callback

**Definisi:**

Permintaan asynchronous adalah operasi yang tidak memblokir eksekusi program. Ketika kita melakukan HTTP request yang bisa memakan waktu ratusan milidetik, program tidak berhenti atau "membeku" menunggu respons—melainkan melanjutkan eksekusi kode berikutnya. Callback adalah fungsi yang diberikan sebagai parameter dan akan dieksekusi setelah operasi asynchronous selesai.

**Mengapa Penting:**

Operasi jaringan adalah salah satu operasi paling lambat dalam pemrograman jika dibandingkan dengan operasi CPU atau akses memori. Jika kita menggunakan pendekatan synchronous atau blocking, akan timbul beberapa masalah serius. Untuk **permintaan tunggal**, aplikasi akan membeku selama permintaan berlangsung yang menghasilkan pengalaman pengguna yang sangat buruk. Dalam konteks **aplikasi server**, masalahnya menjadi lebih fatal karena server tidak bisa menangani permintaan lain selama masih memproses satu permintaan—ini sepenuhnya memblokir skalabilitas. Untuk skenario **permintaan berganda**, pendekatan synchronous mengharuskan aplikasi menunggu permintaan pertama selesai sebelum memulai yang kedua, yang sangat tidak efisien.

Dengan pendekatan asynchronous, aplikasi mendapatkan beberapa keuntungan signifikan. Aplikasi tetap responsif selama operasi jaringan berlangsung, mampu menangani banyak permintaan secara bersamaan tanpa saling memblokir, dan dapat melakukan operasi paralel untuk meningkatkan kinerja secara dramatis terutama ketika ada beberapa operasi independen yang bisa dilakukan bersamaan.

**Cara Kerja:**

Mekanisme permintaan asynchronous dalam Node.js mengikuti tiga tahap utama. Tahap pertama adalah **inisiasi operasi asynchronous**, ketika kita memanggil fungsi seperti `request(options, callback)`, Node.js tidak langsung menunggu hasilnya. Melainkan, Node.js mendaftarkan operasi tersebut ke event loop, menyimpan fungsi callback untuk dieksekusi nanti ketika operasi selesai, kemudian segera kembali dan melanjutkan eksekusi ke baris berikutnya tanpa pemblokiran.

Tahap kedua adalah **pemrosesan event loop**, di mana event loop Node.js terus berjalan di latar belakang, terus-menerus memantau operasi asynchronous yang sedang berjalan. Event loop ini berjalan di satu thread tapi mampu menangani banyak operasi secara bersamaan melalui mekanisme non-blocking I/O.

Tahap ketiga adalah **eksekusi callback**, yang terjadi ketika respons HTTP akhirnya diterima dari server. Pada saat ini, event loop mendeteksi bahwa operasi telah selesai, memasukkan fungsi callback ke dalam antrian callback untuk dieksekusi, dan mengeksekusi callback tersebut dengan parameter `(error, response)` sesuai dengan konvensi callback error-first Node.js.

**Pola dalam Kode:**

```javascript
// Pola: (error, response) => { ... }
request({ url: geocodeUrl, json: true }, (error, response) => {
	if (error) {
		return console.error("Error:", error); // Tangani kesalahan jaringan
	}
	// Proses respons
	const coordinates = response.body.features[0].properties.coordinates;
});
```

**Contoh Penerapan:**

Penerapan permintaan asynchronous sangat luas dalam aplikasi modern. **Server web** seperti Express.js dapat menangani ribuan permintaan HTTP bersamaan karena non-blocking I/O. **Pemanggilan API paralel** memungkinkan melakukan permintaan ke beberapa API secara bersamaan tanpa menunggu satu per satu. **Operasi database** memungkinkan query database sambil melayani permintaan HTTP lain. Sedangkan **pengunggahan file** memungkinkan mengunggah file ke penyimpanan cloud tanpa memblokir pengguna dari melakukan tindakan lain.

### Konsep 4: Rantai API dan Ketergantungan Data

**Definisi:**

Rantai API adalah pola di mana keluaran dari satu pemanggilan API digunakan sebagai masukan untuk pemanggilan API berikutnya. Ini menciptakan operasi asynchronous berurutan di mana permintaan kedua bergantung pada hasil permintaan pertama. Dalam konteks aplikasi cuaca kita: nama kota → koordinat (Mapbox) → data cuaca (Weatherstack).

**Mengapa Penting:**

Banyak kasus penggunaan dunia nyata memerlukan beberapa pemanggilan API yang saling bergantung. Tidak semua data tersedia dalam satu API, sering kali perlu transformasi data dari satu format ke format lain, dan logika bisnis mengharuskan operasi berurutan.

Memahami rantai API penting karena beberapa alasan. Pertama, ini adalah **pola yang umum** sangat sering ditemui dalam aplikasi produksi. Kedua, ada **kompleksitas penanganan error** karena setiap langkah bisa gagal dan memerlukan penanganan error yang kuat. Ketiga, ada tantangan **organisasi kode** karena callback bersarang bisa menjadi "callback hell" jika tidak dikelola dengan baik.

**Cara Kerja:**

Dalam aplikasi cuaca, alur kerja rantai API melibatkan dua langkah utama. **Langkah pertama adalah geocoding**, di mana masukan berupa nama kota seperti "padang utara" diproses melalui HTTP GET ke Mapbox API, dan menghasilkan keluaran berupa koordinat {latitude: -0.923939, longitude: 100.36727}. **Langkah kedua adalah pengambilan data cuaca**, di mana masukan berupa koordinat dari langkah pertama diproses melalui HTTP GET ke Weatherstack API dengan koordinat tersebut, dan menghasilkan keluaran berupa data cuaca lengkap (temperature, description, precip, dll).

Kedua langkah ini **harus berurutan**—kita tidak bisa meminta data cuaca sebelum mendapat koordinat dari proses geocoding.

**Pola Implementasi:**

```javascript
// Callback Bersarang untuk Rantai API
request({ url: geocodeUrl, json: true }, (error, response) => {
	// Langkah 1: Geocoding
	const coords = response.body.features[0].properties.coordinates;
	const lat = coords.latitude;
	const lon = coords.longitude;

	// Langkah 2: Cuaca (bersarang di dalam callback Langkah 1)
	const weatherUrl = `http://api.weatherstack.com/current?query=${lat},${lon}`;
	request({ url: weatherUrl, json: true }, (err2, resp2) => {
		// Proses data cuaca
		console.log("Suhu:", resp2.body.current.temperature);
	});
});
```

**Tantangan:**

Implementasi rantai API memiliki beberapa tantangan. **Callback Hell** terjadi ketika banyak callback bersarang membuat kode sulit dibaca—solusinya adalah menggunakan Promise atau async/await. **Propagasi Error** mengharuskan error di langkah pertama ditangani dengan baik agar tidak melanjutkan ke langkah kedua. **Kinerja** bisa menjadi masalah karena pendekatan berurutan bisa lambat jika ada operasi yang sebenarnya bisa dilakukan secara paralel.

**Contoh Penerapan:**

Rantai API banyak digunakan dalam berbagai skenario. Dalam **checkout e-commerce**, alurnya adalah: validasi inventori → buat pesanan → proses pembayaran → kirim email konfirmasi. Untuk **autentikasi OAuth**, alurnya: dapatkan kode otorisasi → tukar dengan access token → ambil profil pengguna. Sedangkan dalam **pipeline data**, alurnya: ambil data mentah dari API → transformasi/agregasi → simpan ke database → picu analitik.

---

## 3. Diagram Arsitektur

### Arsitektur Aplikasi Cuaca

```
┌──────────────────────────────────────────────────────────────┐
│                    Aplikasi Node.js (cekCuaca.js)            │
│                                                              │
│  ┌────────────────┐                    ┌─────────────────┐   │
│  │  User Input    │                    │  Console Output │   │
│  │  (city name)   │                    │  (weather data) │   │
│  └───────┬────────┘                    └─────────────────┘   │
│          │                                        ▲          │
│          │                                        │          │
│          ▼                                        │          │
│  ┌──────────────────┐           ┌─────────────────┴──────┐   │
│  │  geocodeCity()   │  coords   │   getWeather()         │   │
│  │  Function        │─────────▶│   Function             │   │
│  │  (Step 1)        │ {lat,lon} │   (Step 2)             │   │
│  └────────┬─────────┘           └───────────────┬────────┘   │
│           │                                     │            │
└───────────┼─────────────────────────────────────┼────────────┘
            │                                     │
            │ HTTP GET                            │ HTTP GET
            │ + city name                         │ + coordinates
            │                                     │
            ▼                                     ▼
┌───────────────────────┐           ┌──────────────────────────┐
│   Mapbox API          │           │   Weatherstack API       │
│   (Geocoding Service) │           │   (Weather Data Service) │
│                       │           │                          │
│   Endpoint:           │           │   Endpoint:              │
│   /geocode/v6/forward │           │   /current               │
└───────────────────────┘           └──────────────────────────┘
            ▲                                     ▲
            │                                     │
            └───────────────────┬─────────────────┘
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

### Komponen Jaringan

Aplikasi cuaca ini menggunakan tiga lapisan protokol jaringan. **Lapisan aplikasi menggunakan HTTP/1.1** untuk komunikasi antara client dan server API. **Lapisan transport menggunakan TCP** yang menjamin transmisi data yang reliable dan terurut. **Lapisan network menggunakan pengalamatan IP** untuk routing paket data melalui internet.

**Komponen permintaan** yang digunakan dalam aplikasi ini meliputi beberapa elemen. Method yang digunakan adalah **GET untuk operasi read-only** yang tidak mengubah data di server. URL yang lengkap terdiri dari **base URL, path, dan query parameters** yang membawa informasi seperti API key dan parameter pencarian. Headers seperti **User-Agent dan Accept biasanya otomatis di-set oleh library** request yang digunakan. **Autentikasi dilakukan melalui API key** yang disisipkan di query string URL.

**Pemrosesan respons** melibatkan beberapa komponen penting. Status code menunjukkan **hasil permintaan: 200 OK untuk sukses, 401 Unauthorized untuk masalah autentikasi, 404 Not Found untuk resource tidak ditemukan**. Headers respons mencakup **Content-Type application/json** yang menandakan format data yang dikembalikan. Body respons berisi **JSON payload dengan data** cuaca atau geocoding yang diminta.

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

Kode ini mendemonstrasikan beberapa konsep penting dalam pemrograman jaringan. **Konstruksi URL menggunakan template literals** untuk membangun URL lengkap dengan query parameters yang diperlukan. **Opsi `json: true`** membuat library `postman-request` secara otomatis melakukan JSON parsing pada response body sehingga tidak perlu manual `JSON.parse()`. **Pola callback `(error, response) => { }`** adalah standar Node.js callback dengan konvensi error-first di mana parameter pertama selalu error dan parameter kedua adalah respons. **Struktur respons** mengharuskan kita mengakses data bersarang dengan `response.body.current.temperature`—ini memerlukan pemahaman struktur JSON dari dokumentasi API.

**Keterbatasan:**

Implementasi ini memiliki keterbatasan. **Koordinat di-hardcode** sehingga tidak fleksibel untuk berbagai lokasi berbeda. **Tidak ada penanganan error** yang membuat aplikasi crash jika request gagal atau API key tidak valid.

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

Kode ini menunjukkan peningkatan dalam penanganan API. **Query parameters** seperti `q=padang+utara` menggunakan URL encoding untuk spasi, `proximity=ip` memberikan bias hasil berdasarkan lokasi IP pengguna, dan `limit=1` hanya mengambil hasil teratas. **Strategi penanganan error** melibatkan pengecekan parameter `error` untuk network errors seperti tidak ada internet, DNS fail, atau timeout; validasi struktur respons sebelum mengakses properti bersarang sebagai defensive programming; dan early return untuk keluar dari fungsi jika error terdeteksi. **Struktur respons API** dari Mapbox mengembalikan array `features[]` di mana setiap feature adalah kemungkinan kecocokan untuk query. **Ekstraksi data** dilakukan dengan mengakses coordinates dari `features[0].properties.coordinates` dengan safe navigation untuk menghindari error.

**Peningkatan dari Latihan 1:**

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

Kode ini mendemonstrasikan pola rantai API yang kompleks. **Pola rantai API** diterapkan dengan menempatkan request kedua (Weatherstack) **di dalam callback** request pertama (Mapbox)—ini memastikan kita memiliki koordinat sebelum meminta data cuaca. **Aliran data** menunjukkan bagaimana output dari API pertama (`coordinates`) menjadi input untuk API kedua (`query=${lat},${lon}`). **Callback bersarang** ini adalah pola "Callback Hell" di mana struktur kode menjadi sangat bersarang, sulit dibaca dan dipelihara. **Operasi asynchronous berurutan** tidak bisa dilakukan paralel—harus menunggu geocoding selesai sebelum mengambil data cuaca.

Implementasi ini memiliki **keuntungan**: sederhana dan straightforward untuk operasi berurutan, tidak perlu abstraksi atau library tambahan. Namun juga memiliki **kekurangan**: **Keterbacaan** menjadi masalah karena callback bersarang membuat kode sulit dibaca ("pyramid of doom"); **Penanganan error** perlu dilakukan di setiap level callback bersarang; **Kemudahan pemeliharaan** berkurang karena sulit untuk menambah atau memodifikasi langkah di tengah rantai; **Pengujian** menjadi lebih sulit karena callback bersarang lebih sulit di-unit test.

**Pola Alternatif (Promise/Async-Await):**

```javascript
// Pola yang lebih baik untuk rantai API (akan dipelajari di minggu depan)
async function getWeatherByCity(cityName) {
	const geocode = await geocodeCity(cityName); // Langkah 1
	const weather = await getWeather(geocode.lat, geocode.lon); // Langkah 2
	return weather;
}
```

#### 4. Pengelolaan Environment Variables

```javascript
require("dotenv").config();

const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
const MAPBOX_KEY = process.env.MAPBOX_KEY;

if (!MAPBOX_KEY)
	console.warn("WARNING: MAPBOX_KEY environment variable tidak ditemukan. Periksa .env atau env var Anda.");
```

**Konteks Pemrograman Jaringan:**

Pengelolaan environment variables mengikuti beberapa praktik terbaik keamanan dan konfigurasi. **Praktik terbaik keamanan** mengharuskan API keys tidak boleh di-hardcode di source code karena risiko terekspos jika commit ke repository publik. **Metodologi 12-Factor App** menyatakan bahwa konfigurasi (termasuk credentials) harus di environment, bukan di kode. **Konfigurasi spesifik environment** memungkinkan penggunaan API keys yang berbeda untuk development dan production. **File `.gitignore`** harus mengecualikan file `.env` dari version control untuk menjaga keamanan kredensial.

**File `.env` Structure:**

```
WEATHERSTACK_KEY=abc123...
MAPBOX_KEY=xyz456...
```

---

## 5. Kendala, Solusi & Pembelajaran

### Kendala 1: Risiko Tereksposnya API Key

**Masalah:**

Pada awalnya, API keys di-hardcode langsung di source code dengan format seperti `const MAPBOX_KEY = "abc123xyz..."`. Ketika commit ke Git, API keys ter-expose di repository history dan bisa disalahgunakan oleh orang lain. Jika repository di-push ke GitHub public, API keys bisa di-scrape oleh bots dan digunakan untuk permintaan yang tidak terotorisasi.

**Penyebab:**

Masalah ini terjadi karena tidak memahami risiko keamanan dari committing credentials, belum mengetahui praktik terbaik untuk mengelola konfigurasi sensitif, dan mengikuti tutorial yang tidak menekankan pertimbangan keamanan.
**Solusi:**

Solusi untuk masalah ini melibatkan beberapa langkah. **Pertama**, install package `dotenv` dengan perintah `npm install dotenv`. **Kedua**, buat file `.env` di root project dengan format:

```
WEATHERSTACK_KEY=your_key_here
MAPBOX_KEY=your_key_here
```

**Ketiga**, load environment variables di awal file:

```javascript
require("dotenv").config();
const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;
```

**Keempat**, tambahkan `.env` ke `.gitignore` untuk mengecualikan dari version control. **Kelima**, buat `.env.example` dengan placeholder untuk dokumentasi:

```
WEATHERSTACK_KEY=your_weatherstack_key
MAPBOX_KEY=your_mapbox_key
```

**Pembelajaran:**

Dari pengalaman mengatasi kendala ini, beberapa pembelajaran penting didapat. **Prinsip keamanan** menegaskan bahwa tidak boleh commit secrets (API keys, passwords, tokens) ke version control karena ini adalah kesalahan keamanan fundamental. **Konfigurasi 12-Factor App** menyatakan bahwa environment variables adalah cara standar untuk mengelola konfigurasi di aplikasi modern. **Persistensi Git history** menunjukkan bahwa bahkan jika kita menghapus API key di commit selanjutnya, key tersebut tetap ada di Git history—perlu force rewrite history atau rotate key. **Praktik production** mengharuskan penggunaan layanan pengelolaan secret (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) di production. **Monitoring API key** penting karena banyak penyedia API memiliki tools untuk mendeteksi penggunaan mencurigakan—penting untuk memonitor jika key ter-compromise.

### Kendala 2: Kompleksitas Callback Bersarang ("Callback Hell")

**Masalah:**

Ketika mengimplementasikan rantai API, struktur kode menjadi sangat bersarang:

```javascript
request(geocodeUrl, (error, response) => {
	// ... 10 lines of code
	request(weatherUrl, (err2, resp2) => {
		// ... more nested code
	});
});
```

Kode menjadi sulit dibaca karena bentuk pyramid dengan banyak closing braces. Penanganan error harus diduplikasi di setiap level. Sulit untuk menambahkan operasi asynchronous tambahan di tengah rantai.

**Penyebab:**

Masalah ini disebabkan oleh operasi asynchronous berurutan dengan callback-based API, library `postman-request` yang menggunakan callback pattern (gaya Node.js lama), dan belum familiar dengan Promise atau async/await patterns.

**Solusi:**

**Jangka pendek (untuk jobsheet ini):** Tambahkan komentar untuk menjelaskan setiap level bersarang.
Ekstrak callback bersarang ke named function:

```javascript
function handleWeatherResponse(err2, resp2) {
	// Process weather data
}
request(weatherUrl, handleWeatherResponse);
```

Buat helper functions untuk mengurangi tingkat bersarang.

**Jangka panjang (peningkatan masa depan):** Migrasi ke Promise-based HTTP library (axios, node-fetch). Refactor dengan async/await:

```javascript
async function getWeatherByCity(city) {
	const coords = await geocodeCity(city);
	const weather = await getWeather(coords.lat, coords.lon);
	return weather;
}
```

Pola ini lebih mudah dibaca dan dipelihara.

**Pembelajaran:**

Dari pengalaman ini didapat beberapa pembelajaran. **Evolusi pola asynchronous** di Node.js mengikuti perkembangan: callbacks → Promises → async/await. **Callback Hell adalah masalah umum** yang dialami banyak pengembang—bahkan ada nama khusus untuk anti-pattern ini. **Organisasi kode penting** karena kode bersarang lebih sulit di-test, debug, dan dipelihara—struktur flat lebih baik. **JavaScript modern** dengan async/await syntax (ES2017) adalah solusi terbaik untuk operasi asynchronous berurutan. **Pemilihan library** mempengaruhi kualitas kode—memilih library yang mendukung Promise native (axios) vs callback (postman-request) berdampak pada kualitas kode.

### Kendala 3: Validasi Respons API dan Penanganan Error

**Masalah:**

Pada latihan pertama, kode crash dalam beberapa situasi: ketika API request timeout atau terjadi network error; ketika API key invalid sehingga response body tidak sesuai struktur yang diharapkan; dan ketika Mapbox tidak menemukan hasil untuk nama kota yang dicari. Error message yang dihasilkan tidak informatif sehingga sulit untuk debugging. Aplikasi berhenti sepenuhnya tanpa graceful error handling.

**Penyebab:**

Masalah ini disebabkan karena tidak ada validasi untuk struktur `response.body` sebelum mengakses properti bersarang, asumsi bahwa API selalu mengembalikan struktur yang diharapkan tanpa defensive programming, dan tidak familiar dengan kemungkinan skenario error dalam pemrograman jaringan.

**Solusi:**

**Pertama**, cek network error di callback:

```javascript
request(options, (error, response) => {
	if (error) {
		return console.error("Network error:", error.message);
	}
	// Continue processing...
});
```

**Kedua**, validasi struktur respons:

```javascript
if (!response || !response.body) {
	return console.error("Invalid response structure");
}
if (!response.body.features || response.body.features.length === 0) {
	return console.error("No results found for query");
}
```

**Ketiga**, akses properti yang aman:

```javascript
const coords = feat.properties && feat.properties.coordinates;
if (!coords) {
	return console.error("Coordinates not available");
}
```

**Keempat**, pesan error yang informatif: sertakan konteks seperti apa yang gagal dan input apa yang digunakan; log response body untuk debugging.

**Pembelajaran:**

Beberapa pembelajaran penting didapat dari penanganan kendala ini. **Ketidakandalan jaringan** menunjukkan bahwa operasi jaringan bisa gagal karena banyak alasan—timeout, DNS failure, server down, rate limiting. **Kontrak API** mengajarkan bahwa tidak bisa mengasumsikan API selalu mengembalikan format yang diharapkan—bisa ada perubahan API, edge cases, atau errors. **Defensive programming** mengharuskan selalu validasi data sebelum digunakan—terutama untuk sumber data eksternal.

**Strategi penanganan error** meliputi beberapa prinsip: **Fail Fast** yaitu deteksi dan laporkan error secepatnya; **Graceful Degradation** di mana aplikasi tetap functional meskipun ada kegagalan parsial; **Pesan ramah pengguna** yang informatif dan actionable. **Debugging masalah jaringan** memerlukan tools dan teknik untuk memeriksa HTTP requests/responses seperti Postman, browser DevTools, dan logging.

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

**Kasus Tepi yang Teridentifikasi:**

1. **Query Kosong:**
    - Input: `q=` (string kosong)
    - Mapbox mengembalikan hasil worldwide generik atau area administratif tingkat atas
    - **Pembelajaran:** Perlu tambahkan validasi input sebelum API call untuk menolak string kosong
2. **Nama Kota Ambigu:**
    - Input: "Paris" (ada Paris di France, Texas, Ontario, dll)
    - Mapbox mengembalikan hasil teratas berdasarkan `proximity=ip`—bias ke lokasi pengguna
    - **Pembelajaran:** Untuk aplikasi production, perlu UI disambiguasi (pilih dari multiple hasil)
3. **Pembatasan Rate API:**
    - Tidak di-test karena free tier limit cukup tinggi
    - **Pembelajaran:** Untuk production, perlu implementasi penanganan pembatasan rate dan caching
4. **Waktu Respons:**
    - Geocoding: ~200-400ms
    - Weather: ~300-500ms
    - Total rantai: ~600-900ms (berurutan, bukan paralel)
    - **Pembelajaran:** Pendekatan berurutan menambah latensi—peningkatan masa depan: permintaan paralel jika memungkinkan

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

![Latihan 3](/assets/images/week-06/week-06-latihan-3.png)

### Validasi Konsep Jaringan

✅ **HTTP Request/Response:** Terverifikasi request method, konstruksi URL, headers (melalui logging); terverifikasi response status codes dan JSON parsing; terverifikasi skenario error (network error, invalid key, not found).

✅ **Integrasi API:** Terverifikasi autentikasi dengan API key di query string; terverifikasi formatting query parameters dan URL encoding; terverifikasi struktur respons sesuai dokumentasi API.

✅ **Pola Asynchronous:** Terverifikasi eksekusi non-blocking (kode lanjut setelah initiate request); terverifikasi eksekusi callback setelah respons diterima; terverifikasi signature callback (error, response).

✅ **Rantai API:** Terverifikasi eksekusi berurutan (geocoding → weather); terverifikasi ketergantungan data (output Mapbox jadi input Weatherstack); terverifikasi struktur callback bersarang.

---

## 7. Refleksi & Pembelajaran

### Refleksi Teknis

**Pemahaman HTTP dan Pemrograman Jaringan:**

Minggu ini adalah pengenalan pertama saya ke pemrograman jaringan yang sesungguhnya—sebelumnya hanya bekerja dengan data lokal dan file system. **Jaringan tidak dapat diandalkan**: berbeda dengan file I/O di local machine yang relatif dapat diprediksi, operasi jaringan bisa gagal karena banyak alasan di luar kendali kita (internet down, server error, rate limiting, timeout). Ini membuat penanganan error bukan opsional tapi wajib dalam pemrograman jaringan. **Latensi penting**: rantai API berurutan memakan waktu ~600-900ms untuk selesai—ini signifikan dalam pengalaman pengguna. Di aplikasi production, perlu strategi optimasi: caching, permintaan paralel jika memungkinkan. **API sebagai antarmuka**: bekerja dengan API pihak ketiga membuka mata saya bahwa software modern adalah ekosistem—kita tidak membangun semuanya dari nol, melainkan mengintegrasikan layanan. Ini mengubah paradigma dari "bagaimana membangun ini?" menjadi "API mana yang menyediakan ini?"

**Tantangan Pemrograman Asynchronous:**

Bagian tersulit adalah mengubah cara berpikir dari synchronous (eksekusi dari atas ke bawah) ke asynchronous (mendaftarkan callback, melanjutkan eksekusi, menunggu events). Diagram event loop sangat membantu untuk memvisualisasikan ini. **Realitas Callback Hell**: setelah nesting 2-3 callbacks, keterbacaan kode memburuk drastis. Saya sekarang memahami mengapa Promise dan async/await diperkenalkan—bukan hanya syntactic sugar, tapi solusi genuine untuk masalah organisasi kode. **Kesulitan debugging**: jejak tumpukan error di callback bersarang kurang informatif. Perlu banyak `console.log()` untuk melacak alur eksekusi dan nilai variabel.

**Praktik Terbaik Integrasi API:**

**Membaca dokumentasi terlebih dahulu** sangat penting—awalnya saya trial-and-error dengan API endpoints, yang tidak efisien. Membaca dokumentasi API dengan teliti (terutama bagian "Getting Started" dan "Response Format") menghemat banyak waktu. **Postman untuk testing**: sebelum implementasi di kode, test API endpoints di Postman terlebih dahulu. Ini membantu memahami struktur respons dan mengidentifikasi masalah potensial. **Environment variables**: setup `.env` sejak awal, bukan afterthought.

### Refleksi Konseptual

**Lapisan Protokol dan Abstraksi:**

Menggunakan library `postman-request` membuat saya menyadari betapa banyak kompleksitas yang diabstraksi. Di balik sederhana `request({ url }, callback)`, terjadi proses kompleks: resolusi DNS untuk mengkonversi nama domain ke alamat IP; TCP handshake untuk membangun koneksi; formatting permintaan HTTP (method, headers, body); transmisi data melalui lapisan jaringan; dan parsing respons serta eksekusi callback. Memahami lapisan abstraksi adalah kemampuan kunci—tahu kapan perlu menyelam ke detail low-level versus kapan cukup menggunakan high-level API.

**Arsitektur Client-Server:**

Integrasi API adalah contoh praktis dari arsitektur client-server yang sering dibahas secara teoritis. **Pemisahan kepentingan**: Client (aplikasi kita) fokus pada UI dan logika bisnis, server (Mapbox/Weatherstack) fokus pada layanan khusus (geocoding, agregasi cuaca). **Komunikasi stateless**: setiap HTTP request independen—tidak ada "session" atau "connection" yang persisten. API key disertakan di setiap request untuk autentikasi. **Standardisasi format data**: JSON sebagai lingua franca untuk komunikasi API. Standardisasi ini memungkinkan interoperabilitas antara sistem dan bahasa yang berbeda.

**Filosofi Penanganan Error:**

Pemrograman jaringan mengajarkan pentingnya penanganan error yang robust. **Mengharapkan kegagalan**: jangan asumsikan happy path—harapkan kegagalan jaringan, data tidak valid, perubahan API. **Gagal dengan anggun**: berikan pesan error yang informatif dan alur alternatif jika memungkinkan. **Defensive programming**: validasi semua dari sumber eksternal—percaya tapi verifikasi. Ini adalah pergeseran mindset fundamental dari "membuatnya bekerja" ke "membuatnya bekerja secara andal di lingkungan yang tidak bersahabat."

### Kesimpulan

Minggu ini adalah fondasi untuk memahami bagaimana aplikasi modern berkomunikasi melalui jaringan. Siklus HTTP request/response, integrasi API, pemrograman asynchronous, dan penanganan error adalah kemampuan yang akan digunakan di hampir setiap proyek software ke depannya.

Menantikan untuk mengeksplorasi topik yang lebih lanjut: WebSockets, GraphQL, pola komunikasi microservices, dan tantangan sistem terdistribusi.

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
