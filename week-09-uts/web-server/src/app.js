const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
const request = require("postman-request");

const app = express();

// Router lokal
const directoryPublic = path.join(__dirname, "../public");
const directoryViews = path.join(__dirname, "../templates/views");
const directoryPartials = path.join(__dirname, "../templates/partials");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/prediksiCuaca");

app.set("view engine", "hbs");
app.set("views", directoryViews);
hbs.registerPartials(directoryPartials);

app.use(express.static(directoryPublic));
// Jika ada folder img di luar public, tambahkan juga (safeguard)
const directoryImg = path.join(__dirname, "../img");
app.use("/img", express.static(directoryImg));

// Ini halaman utama
app.get("/", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cuaca",
    nama: "Dzaki Sultan Rabbani",
  });
});

// Ini halaman tentang
app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Dzaki Sultan Rabbani",
  });
});

// Ini halaman bantuan
app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "FAQ — Bantuan",
    nama: "Dzaki Sultan Rabbani",
    teksBantuan:
      "Ini adalah halaman bantuan. Silakan hubungi kami jika Anda memerlukan bantuan lebih lanjut.",
  });
});

// Halaman Berita — mengambil data dari Mediastack API (server-side)
app.get("/berita", (req, res) => {
  const apiKey = process.env.MEDIASTACK_API_KEY;
  if (!apiKey) {
    return res.render("berita", {
      judul: "Berita",
      nama: "Dzaki Sultan Rabbani",
      error:
        "API key Mediastack belum diset. Silakan tambahkan MEDIASTACK_API_KEY di file .env.",
    });
  }

  // contoh: ambil berita dari Indonesia (countries=id), limit 12, bahasa apa pun
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&limit=8`;

  request({ url, json: true, timeout: 8000 }, (err, resp, body) => {
    if (err) {
      return res.render("berita", {
        judul: "Berita",
        nama: "Dzaki Sultan Rabbani",
        error: "Terjadi kesalahan saat mengambil berita. Coba lagi nanti.",
      });
    }

    // Body dari mediastack biasanya berisi field `data` (array)
    const articles =
      body && body.data
        ? body.data.map((a) => ({
            title: a.title,
            description: a.description,
            url: a.url,
            source: a.source,
            image: a.image || null,
            published_at: a.published_at
              ? new Date(a.published_at).toLocaleString()
              : "",
          }))
        : null;

    res.render("berita", {
      judul: "Berita",
      nama: "Dzaki Sultan Rabbani",
      articles,
    });
  });
});

// Info cuaca
app.get("/cuaca", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukkan lokasi yang kamu cari!",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

// Halaman 404 (catch-all) — render view 404.hbs
app.use((req, res) => {
  res.status(404).render("404", {
    judul: "404",
    nama: "Dzaki Sultan Rabbani",
    errorMessage: "Halaman tidak ditemukan.",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
