const fs = require("fs");
const path = require("path");

// const buku = {
// 	Judul: "Cara gacor trading",
// 	Penulis: "Orang awam",
// };

// const bookJson = JSON.stringify(buku, null, 2);
// const outPath = path.join(__dirname, "1-jsontest.json");
// try {
// 	fs.writeFileSync(outPath, bookJson, "utf8");
// 	console.log(`Wrote ${outPath}`);
// } catch (err) {
// 	console.error(`Failed to write ${outPath}:`, err);
// 	process.exitCode = 1;
// }

const dataBuffer = fs.readFileSync("1-jsontest.json");
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);
console.log(data.judul);
