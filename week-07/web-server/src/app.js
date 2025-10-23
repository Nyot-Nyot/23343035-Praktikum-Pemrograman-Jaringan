const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Router lokal
const directoryPublic = path.join(__dirname, "../public");
const directoryViews = path.join(__dirname, "../templates/views");
const directoryPartials = path.join(__dirname, "../templates/partials");

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
		judul: "My Kisah",
		nama: "Dzaki Sultan Rabbani",
	});
});

// Ini halaman bantuan
app.get("/bantuan", (req, res) => {
	res.render("bantuan", {
		judul: "Bantuan",
		nama: "Dzaki Sultan Rabbani",
		teksBantuan: "Ini adalah halaman bantuan. Silakan hubungi kami jika Anda memerlukan bantuan lebih lanjut.",
	});
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
