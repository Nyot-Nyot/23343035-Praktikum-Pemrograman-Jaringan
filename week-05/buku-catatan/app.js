const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const catatan = require('./catatan.js');

const argvBuilder = yargs(hideBin(process.argv));

argvBuilder.command({
	command: "tambah",
	describe: "tambah sebuah catatan baru",
	builder: {
		judul: {
			describe: "Judul catatan",
			demandOption: true,
			type: "string",
		},
		isi: {
			describe: "Isi catatan",
			demandOption: true,
			type: "string",
		},
	},
	handler: function (argv) {
		catatan.tambahCatatan(argv.judul, argv.isi)
	},
});

argvBuilder.command({
	command: "hapus",
	describe: "catatan dihapus",
	builder: {
		judul: {
			describe: 'Judul catatan yang ingin dihapus',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		catatan.hapusCatatan(argv.judul);
	},
});

argvBuilder.command({
	command: 'list',
	describe: 'tampilkan semua judul catatan',
	handler() {
		catatan.listCatatan();
	}
});

argvBuilder.command({
	command: 'baca',
	describe: 'baca sebuah catatan berdasarkan judul',
	builder: {
		judul: {
			describe: 'Judul catatan yang ingin dibaca',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		catatan.bacaCatatan(argv.judul);
	}
});

argvBuilder.parse();
