# RuangObrol

## Tugas

1. Jelaskan dengan disertai penjelasan baris kode terkait perbedaan fungsi socket.on yang ada pada file index.js di folder src dan file chat.js pada folder public/js!

**Jawaban:**

Di dalam aplikasi RuangObrol, fungsi `socket.on` dipakai baik di sisi server (`src/app.js`) maupun di sisi klien (`public/js/chat.js`), tetapi perannya berbeda. Pada server, `socket.on` mendengarkan event yang dikirim dari klien dan menjalankan logika aplikasi—misalnya menambahkan pengguna ke sebuah room, memvalidasi pesan, atau menyebarkan pesan ke pengguna lain. Contoh di server:

```js
// server menerima event 'join' lalu menempatkan socket ke room
socket.on("join", (options, callback) => {
  const { error, user } = tambahPengguna({ id: socket.id, ...options });
  socket.join(user.room);
  io.to(user.room).emit("roomData", {
    room: user.room,
    users: ambilPenggunaDariRoom(user.room),
  });
  callback();
});

// server menerima event 'kirimPesan', memeriksa kata kasar, lalu mengirim ke room
socket.on("kirimPesan", (pesan, callback) => {
  const filter = new Filter();
  if (filter.isProfane(pesan))
    return callback("Pesan tidak boleh mengandung kata kasar");
  io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
  callback();
});
```

Sementara itu, di sisi klien `socket.on` hanya mendengarkan event yang dikirim server dan memperbarui antarmuka (DOM) agar pengguna melihat perubahan. Contoh di klien:

```js
// klien menerima pesan dan menambahkannya ke daftar pesan di halaman
socket.on("pesan", (message) => {
  outputMessage(message);
});

// klien menerima data room dan memperbarui daftar pengguna
socket.on("roomData", ({ room, users }) => {
  // update UI: tampilkan nama room dan daftar users
});
```

Perbedaan praktisnya adalah arah dan tanggung jawab: klien memicu peristiwa (mis. `socket.emit('kirimPesan', ...)`) dan menunggu tanggapan, sedangkan server melakukan pemrosesan dan mengirim kembali peristiwa yang relevan ke satu atau banyak klien (menggunakan `socket.emit`, `socket.broadcast`, atau `io.to(room).emit`). Server juga dapat memanggil `callback` untuk mengakui penerimaan/penolakan sebuah event sehingga klien dapat menampilkan umpan balik. Dengan demikian, `socket.on` di server lebih berfokus pada pemrosesan dan pengaturan lalu lintas pesan, sedangkan `socket.on` di klien berfokus pada pembaruan tampilan berdasarkan event yang masuk.

---

2. Pada saat anda melakukan proses chat seperti pada langkah 12 dan 13. Bukalah inspect pada browser anda. Lalu bukalah menu console. Lakukanlah proses chat dan investigasi apa yang ditampilkan pada console tersebut. Uraikan penjelasan anda dengan mengaitkannya ke baris kode yang menurut anda berhubungan dengan hal tersebut

**Jawaban:**

Saat melakukan proses chat dan membuka Console di DevTools, yang biasanya terlihat adalah pesan-pesan status dan error yang berasal dari kode klien (browser) atau acknowledgement yang dikirim server. Secara default, handler klien tidak otomatis mencetak semua event ke console — beberapa hal yang biasanya muncul adalah:

- Saat mengirim pesan, browser mengeksekusi baris yang mengirim event ke server:

```js
// baris di chat.js yang mengirim pesan
socket.emit("kirimPesan", msg, (error) => {
  if (error) {
    console.warn(error); // muncul di console jika server menolak pesan (mis. kata kasar)
    alert(error);
  }
});
```

Jika server menolak pesan karena filter kata kasar, akan terlihat peringatan/alert yang berasal dari callback di atas.

- Jika pengiriman berhasil, server mencatat log dan mengirim event `pesan` kembali ke semua client di room. Browser menerima event ini dan memanggil `outputMessage` untuk menambahkan pesan ke DOM:

```js
socket.on("pesan", (message) => {
  outputMessage(message); // menambahkan message.username, message.text, message.time ke DOM
  // tambahkan `console.log(message)` di sini jika ingin melihat payload di Console
});
```

Perlu dicatat bahwa event `pesan` tidak otomatis muncul di Console kecuali ada statement `console.log` di dalam handler.

- Untuk melihat data mentah yang lewat lewat WebSocket, gunakan tab Network → WS (WebSocket) pada DevTools; di sana tampil frame JSON yang dikirim/diterima.

- Di sisi server (terminal), terdapat log yang membantu mengetahui apakah event sampai ke server, contohnya:

```js
console.log("New WebSocket connection", socket.id);
console.log("kirimPesan from:", socket.id, "user:", user, "pesan:", pesan);
```

Kesimpulannya, Console browser menampilkan error atau debug yang eksplisit dipanggil di kode klien (mis. `console.warn`, `alert`), sedangkan event normal seperti `pesan` hanya memperbarui DOM kecuali handler menulis ke Console. Untuk analisis tingkat rendah, periksa tab Network → WS atau log server.

---

3. Pada file chat.html dibagian akhir pada baris kode <script> terdapat penggunaan library mustache, moment dan qs. Jelaskan bagaimana ketiga library ini berfungsi dalam aplikasi yang anda buat, kaitkanlah dengan baris kode yang menurut anda berhubungan

**Jawaban:**

Dalam implementasi RuangObrol, Mustache, Moment, dan QS masing‑masing melayani tugas yang jelas sehingga kode menjadi lebih terstruktur. Mustache bertanggung jawab untuk templating di sisi klien: struktur HTML pesan, lokasi, dan sidebar ditulis sebagai template di `chat.html` lalu diisi data saat event tiba, sehingga operasi DOM tetap sederhana. Contoh template dan render-nya:

```html
<!-- chat.html: template pesan -->
<script id="message-template" type="text/html">
  <div class="message">
    <p class="meta">{{username}} <span>{{createdAt}}</span></p>
    <p class="text">{{text}}</p>
  </div>
</script>
```

```js
// chat.js: render pesan dengan Mustache
const html = Mustache.render(messageTemplate, {
  username: message.username,
  text: message.text,
  createdAt: moment(message.time).format("h:mm a"),
});
$messages.insertAdjacentHTML("beforeend", html);
```

Moment bertugas memformat cap waktu agar tampilannya konsisten dan ramah‑pembaca. Karena server sekarang mengirimkan timestamp dalam format ISO (contoh: `2025-12-30T11:23:09.883Z`), Moment dapat dengan aman mem-parse dan mem-format menjadi misalnya `6:22 pm`:

```js
createdAt: moment(message.time).format("h:mm a");
```

QS dipakai untuk mengambil data `username` dan `room` dari query string saat pengguna masuk melalui `index.html` (form GET ke `chat.html`). Dengan QS parsing menjadi mudah dan rapi:

```js
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
socket.emit("join", { username, room }, (error) => {
  /* ... */
});
```

Singkatnya: Mustache membuat rendering pesan dan sidebar jadi terpisah dari logika, Moment memastikan waktu tampil konsisten dengan parsing ISO timestamps dari server, dan QS menyederhanakan pengambilan data masuk dari query string sehingga proses join menjadi terstruktur.

---

4. Bukalah chat.js, dan perhatikan bahwa ada beberapa baris kode yang telah ditandai dengan komentar elements, templates dan options. Jelaskan baris kode tersebut dan bagaiman kode tersebut berhubungan dengan file chat.html dan file index.html!

**Jawaban:**

Bagian yang diberi komentar `elements`, `templates`, dan `options` di `chat.js` berfungsi sebagai titik sambungan antara JavaScript dan struktur HTML sehingga aplikasi rapi dan mudah dipelihara. Pada bagian `elements` biasanya terdapat pemilihan elemen DOM seperti daftar pesan, form pengirim dan input pesan — misalnya:

```js
// elements
const $messages = document.querySelector(".chat-messages");
const $chatForm = document.getElementById("chat-form");
const $msgInput = document.getElementById("msg");
```

Baris tersebut memetakan variabel JS ke elemen-elemen di `chat.html` (elemen dengan kelas `.chat-messages`, form dengan id `chat-form`, dan input `#msg`). Dengan referensi ini, kode dapat menambahkan pesan baru, mengosongkan input, atau menonaktifkan tombol saat menunggu acknowledgement dari server.

Bagian `templates` mengambil isi template HTML (ditulis di `chat.html` sebagai `<script id="message-template">` dan seterusnya) sehingga rendering pesan dapat dilakukan secara deklaratif menggunakan Mustache:

```js
// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;
```

Karena template ini ada di `chat.html`, Mustache menggabungkan data (username, text, url, createdAt) dengan struktur HTML yang sudah disiapkan sehingga tampilan pesan konsisten dan logika rendering terpisah dari markup.

Bagian `options` biasanya membaca parameter yang dikirim dari halaman join (`index.html`) ke `chat.html` lewat query string. Di sini QS dipakai untuk parsing query string sehingga username dan room mudah diambil:

```js
// options (from query string)
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
```

Form pada `index.html` mengirim `?username=...&room=...` saat submit (method GET), dan `chat.js` membaca nilai itu lalu mengirim event `join` ke server:

```js
socket.emit('join', { username, room }, (error) => { ... })
```

Singkatnya: `elements` mengikat variabel JS ke bagian visual di `chat.html`, `templates` memuat potongan HTML yang akan diisi data saat event masuk, dan `options` mengambil data kontekstual (username/room) yang berasal dari `index.html` atau URL. Gabungan ketiganya membuat alur join, render pesan, dan pembaruan sidebar menjadi bersih dan terpisah tanggung jawabnya.

---

5. Jelaskan fungsi file messages.js dan users.js dan bagaimana baris kode pada kedua file ini terhubung dengan index.js, chat.js dan kedua file html (chat.html dan index.html)

**Jawaban:**

File `messages.js` bertanggung jawab membuat bentuk (payload) pesan yang konsisten untuk dikirim ke klien. Fungsi utama adalah `generateMessage(username, text)` dan `generateLocationMessage(username, url)` yang mengembalikan objek berisi `username`, `text`/`url`, dan `time` dalam format ISO. Contoh sederhana dari isi file:

```js
// src/utils/messages.js
function generateMessage(username, text) {
  return { username, text, time: new Date().toISOString() };
}
function generateLocationMessage(username, url) {
  return { username, url, time: new Date().toISOString() };
}
```

Server (`src/app.js`) memakai fungsi ini sebelum mengirim event ke client, misalnya:

```js
const { generateMessage } = require("./utils/messages");
io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
```

Sedangkan `users.js` berfungsi sebagai modul manajemen pengguna (login, logout, list per room). Fungsi utamanya antara lain `tambahPengguna({id,username,room})`, `hapusPengguna(id)`, `ambilPengguna(id)`, `ambilPenggunaDariRoom(room)`. Contoh singkat:

```js
// src/utils/users.js
function tambahPengguna({ id, username, room }) {
  /* validasi, simpan ke array users */
}
function hapusPengguna(id) {
  /* hapus dan return user */
}
function ambilPengguna(id) {
  /* return user */
}
function ambilPenggunaDariRoom(room) {
  /* return array users in room */
}
```

Hubungan antar file dan alur kerjanya: ketika pengguna membuka `index.html` dan mengirim form, query `username` dan `room` dikirim ke `chat.html`; `chat.js` mem‑parse query (QS) dan memanggil `socket.emit('join', { username, room })`. Server menerima event `join`, memanggil `tambahPengguna(...)` untuk memasukkan user ke list dan memanggil `socket.join(user.room)`. Setelah itu server menggunakan `generateMessage` untuk mengirim pesan selamat datang dan `ambilPenggunaDariRoom` untuk mengirim data sidebar ke semua klien di room:

```js
// server (src/app.js)
const { tambahPengguna, ambilPenggunaDariRoom } = require("./utils/users");
const { generateMessage } = require("./utils/messages");
// pada join:
const { error, user } = tambahPengguna({ id: socket.id, username, room });
socket.join(user.room);
socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));
io.to(user.room).emit("roomData", {
  room: user.room,
  users: ambilPenggunaDariRoom(user.room),
});
```

Di sisi klien, `chat.js` mendengarkan event `pesan`, `locationMessage`, dan `roomData`, lalu menampilkan data tersebut di `chat.html` dengan Mustache atau DOM manual. Jadi `messages.js` menentukan bentuk pesan yang konsisten, `users.js` menjaga state pengguna dan room, server (`src/app.js`) menjembatani keduanya, dan `chat.js` serta file HTML menampilkan hasilnya ke pengguna.

Ringkasnya: `messages.js` membuat payload pesan; `users.js` mengatur user/room; keduanya di-import oleh server untuk membuat dan mengirim event yang kemudian ditangani dan dirender oleh `chat.js` di `chat.html`, sementara `index.html` hanya tugasnya mengumpulkan `username` dan `room` untuk dikirim saat join.

---

6. Bagaimana aplikasi ini bisa mengirimkan lokasi? Jelaskan apa yang terjadi dengan disertai penjelasan baris kode!

**Jawaban (naratif):**

Kirim lokasi dilakukan melalui kombinasi API Geolocation di browser, event Socket.io, dan helper `generateLocationMessage` di server. Alur sederhananya: (1) pengguna menekan tombol "Kirim lokasi" di `chat.html`, (2) `chat.js` memanggil `navigator.geolocation.getCurrentPosition` untuk mendapatkan koordinat, (3) klien mengirim koordinat ke server lewat `socket.emit('kirimLokasi', { latitude, longitude }, ack)`, (4) server menerima event `kirimLokasi`, membuat URL Google Maps dan membungkusnya dengan `generateLocationMessage`, lalu broadcast ke room dengan `io.to(...).emit('locationMessage', ...)`, dan (5) semua klien menerima `locationMessage` dan menampilkan link lokasi.

Contoh potongan kode yang relevan di klien (`public/js/chat.js`):

```js
// tombol di chat.html memicu geolocation
$sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Geolocation tidak didukung");
  navigator.geolocation.getCurrentPosition((pos) => {
    socket.emit(
      "kirimLokasi",
      {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      },
      (ack) => {
        /* ack handling */
      }
    );
  });
});
```

Potongan di server (`src/app.js`) menerima koordinat dan mengirimkan pesan lokasi ke room:

```js
socket.on("kirimLokasi", (coords, callback) => {
  const user = ambilPengguna(socket.id);
  io.to(user.room).emit(
    "locationMessage",
    generateLocationMessage(
      user.username,
      `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    )
  );
  callback();
});
```

Di sisi klien, handler `socket.on('locationMessage', ...)` merender template lokasi (atau fallback) sehingga pengguna melihat link "Lihat lokasi". Contoh render dengan Mustache:

```js
socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.time).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});
```

browser memberi koordinat, klien mengirim event ke server, server membuat URL/objek pesan (via `generateLocationMessage`) dan meng-broadcast ke room, klien lain menerima event dan menampilkan link lokasi.

---

7. Kenapa aplikasi ini dijalankan menggunakan perintah npm run dev bukan menggunakan perintah node diikuti nama file seperti pada jobsheet-jobsheet sebelumnya? Coba juga jalankan aplikasi menggunakan perintah npm run start, investigasi apa yang terjadi dan apa yang membedakannya dengan npm run dev?

**Jawaban (naratif):**

Perintah `npm run dev` digunakan selama pengembangan karena script `dev` pada `package.json` menjalankan `nodemon src/app.js`. `nodemon` memonitor perubahan file dan otomatis me‐restart server ketika ada perubahan—keren untuk developer karena tidak perlu berhenti/menyalakan ulang server setiap kali mengedit kode. Sebaliknya `npm run start` menjalankan `node src/app.js` (tanpa `nodemon`) sehingga server berjalan sekali dan tidak otomatis restart saat ada perubahan; ini lebih cocok untuk lingkungan produksi atau saat ingin menjalankan server tanpa fitur hot‑reload.

Contoh isi `package.json`:

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

Untuk produksi biasanya dipasangkan dengan process manager (mis. `pm2`, systemd) yang menjaga proses tetap hidup dan menangani restart bila crash; `nodemon` tidak dimaksudkan untuk produksi.

---

8. Selain socket.on, fungsi socket apa lagi yang digunakan dalam aplikasi ini. Silakan telusuri dan jelaskan pendapat anda disertai dengan baris kode!

**Jawaban:**

Di luar `socket.on` (yang dipakai untuk _listening_ event), beberapa fungsi/aksi pada objek `socket` dan `io` yang penting dan dipakai di aplikasi ini adalah:

- **`socket.emit` (kirim ke satu client)** ✅

  - Digunakan oleh klien untuk mengirim event ke server, dan juga oleh server untuk mengirim event ke satu socket tertentu.
  - Contoh (klien -> server) di `public/js/chat.js`:

  ```js
  // mengirim pesan ke server dengan acknowledgement
  socket.emit("kirimPesan", msg, (error) => {
    if (error) return alert(error);
  });
  ```

  - Contoh (server -> client) di `src/app.js`:

  ```js
  // mengirim pesan hanya ke socket yang baru bergabung
  socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));
  ```

- **`socket.join(room)` (masuk room)** 🔧

  - Menempatkan socket ke sebuah _room_, sehingga server bisa menargetkan broadcast ke satu room.
  - Contoh di `src/app.js`:

  ```js
  socket.on("join", (options, callback) => {
    /* ...validasi user... */
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: ambilPenggunaDariRoom(user.room),
    });
    callback();
  });
  ```

- **`socket.broadcast.to(room).emit(...)` / `socket.to(room).emit(...)` (broadcast to room except sender)** 🔁

  - Mengirim event ke seluruh anggota room kecuali socket pengirim.
  - Digunakan untuk memberi tahu anggota lain ketika seseorang bergabung/keluar.
  - Contoh di `src/app.js`:

  ```js
  socket.broadcast
    .to(user.room)
    .emit(
      "pesan",
      generateMessage("Admin", `${user.username} telah bergabung!`)
    );
  ```

- **`io.to(room).emit(...)` (kirim ke seluruh room termasuk pengirim)** 🌐

  - Mengirim event ke semua socket yang tergabung di room tertentu.
  - Contoh: mengirim daftar `roomData` setelah user bergabung:

  ```js
  io.to(user.room).emit("roomData", {
    room: user.room,
    users: ambilPenggunaDariRoom(user.room),
  });
  ```

- **Ack callbacks pada `emit`** 📨

  - `socket.emit` dapat menerima callback terakhir yang dijalankan oleh penerima sebagai acknowledgement (dipakai untuk konfirmasi di UI).
  - Contoh (klien mengirim lokasi dan menunggu ack):

  ```js
  socket.emit("kirimLokasi", { latitude, longitude }, () => {
    // server memanggil callback saat selesai broadcast
  });
  ```

- **`socket.disconnect()` / `disconnect` (pengelolaan koneksi)** ⚠️

  - Koneksi dapat diputus dari client atau terjadi secara otomatis; server menangani event `disconnect` untuk membersihkan state (menghapus user, broadcast info keluar).
  - Handler di `src/app.js`:

  ```js
  socket.on("disconnect", () => {
    const user = hapusPengguna(socket.id);
    if (user) {
      io.to(user.room).emit(
        "pesan",
        generateMessage("Admin", `${user.username} keluar.`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: ambilPenggunaDariRoom(user.room),
      });
    }
  });
  ```

Singkatnya: selain `socket.on` aplikasi memakai `socket.emit`, `socket.join`, `socket.broadcast.to(...)`, `io.to(...).emit(...)`, dan memanfaatkan acknowledgement callbacks serta `disconnect` handling — semuanya bekerja bersama untuk mengontrol siapa yang menerima pesan dan bagaimana server menjaga state room/user.

---

9.  Jelaskan terkait ini real-time bidirectional event-based communication disertai penjelasan baris kode sesuai aplikasi yang anda buat!

**Jawaban:**

Aplikasi RuangObrol menerapkan komunikasi _real-time_, _bidirectional_, dan _event-based_ menggunakan Socket.IO. Inti konsepnya adalah: baik klien maupun server dapat memancarkan (_emit_) event dan mendengarkannya (_on_); tiap event membawa payload dan kadang callback untuk acknowledgement. Alur umum dan contoh baris kode:

1. Klien mengirim event ke server (emit) — publikasi dari browser ke server

```js
// public/js/chat.js
socket.emit("kirimPesan", msg, (error) => {
  if (error) return alert(error);
  // callback dijalankan saat server sudah memproses/ack
});
```

2. Server menerima event (on), memproses, lalu menyiarkan hasil ke client lain (emit/io.to)

```js
// src/app.js
socket.on("kirimPesan", (pesan, callback) => {
  const filter = new Filter();
  if (filter.isProfane(pesan))
    return callback("Pesan tidak boleh mengandung kata kasar");
  // kirim ke seluruh anggota room (termasuk pengirim)
  io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
  callback(); // ack ke klien pengirim
});
```

3. Klien lain menerima event dan memperbarui UI segera (real-time)

```js
// public/js/chat.js
socket.on("pesan", (message) => {
  // render message ke DOM (Mustache / innerHTML)
  outputMessage(message);
});
```

4. Pola tambahan yang dipakai:

- `socket.join(room)` → mengelompokkan socket ke room untuk broadcast terarah (`io.to(room).emit(...)`).
- `socket.broadcast.to(room).emit(...)` → mengirim ke semua kecuali pengirim (dipakai saat memberi tahu user bergabung/keluar).
- Acknowledgement callbacks (server memanggil callback yang dikirim klien) untuk konfirmasi asynchronous, sehingga UI dapat menonaktifkan tombol sampai ack diterima (mis. kirim lokasi).
- `socket.on('disconnect', ...)` → event connection lifecycle yang dipakai untuk membersihkan state dan memberi tahu room.

model event-based ini membuat komunikasi dua arah terstruktur — klien memicu tindakan lewat event, server menangani dan menentukan apa yang harus dipancarkan kembali (ke satu client, ke semua, atau ke room tertentu), lalu klien yang relevan segera merender perubahan. Karena sifat socket yang persisten, interaksi terasa _real-time_ dan responsif tanpa perlu polling berulang dari browser.
