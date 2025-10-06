const fs = require("fs");

const tambahCatatan = function (judul, isi) {
	const catatan = muatCatatan();
	const catatanGanda = catatan.filter(function (note) {
		return note.judul === judul;
	});

	if (catatanGanda.length === 0) {
		catatan.push({
			judul: judul,
			isi: isi,
		});

		simpanCatatan(catatan);
		console.log("catatan baru berhasil disimpan");
	} else {
		console.log("judul catatan telah dipakai");
	}
};

const simpanCatatan = function (catatan) {
	const dataJson = JSON.stringify(catatan, null, 2);
	fs.writeFileSync("catatan.json", dataJson, "utf8");
};

const muatCatatan = function () {
	try {
		const dataBuffer = fs.readFileSync("catatan.json");
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (e) {
		return [];
	}
};

const hapusCatatan = function (judul) {
	const catatan = muatCatatan();
	const catatanTetap = catatan.filter(function (note) {
		return note.judul !== judul;
	});

	if (catatanTetap.length < catatan.length) {
		simpanCatatan(catatanTetap);
		console.log("catatan berhasil dihapus");
	} else {
		console.log("judul tidak ditemukan");
	}
};

const listCatatan = function () {
	const catatan = muatCatatan();
	console.log(`Menampilkan ${catatan.length} catatan`);
	catatan.forEach(function (note, index) {
		console.log(`${index + 1}. ${note.judul}`);
	});
};

const bacaCatatan = function (judul) {
	const catatan = muatCatatan();
	const found = catatan.find(function (note) {
		return note.judul === judul;
	});

	if (found) {
		console.log(`Judul: ${found.judul}`);
		console.log(`Isi: ${found.isi}`);
	} else {
		console.log("Catatan tidak ditemukan");
	}
};

module.exports = {
	ambilCatatan: muatCatatan,
	tambahCatatan: tambahCatatan,
	hapusCatatan: hapusCatatan,
	listCatatan: listCatatan,
	bacaCatatan: bacaCatatan,
};
