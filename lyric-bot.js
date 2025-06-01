const { JSDOM } = require('jsdom');

async function kotobank(word) {
	console.log(word + "を検索中...");

	try {
		const kotobank_url = "https://kotobank.jp/word/" + word;
		const response = await fetch(kotobank_url);
		const res_row_html = await response.text();
	
		// console.log(res_row_html);
	
		const res_html = new JSDOM(res_row_html);
		const document = res_html.window.document;

		const explains = document.getElementsByClassName("description");

		console.log("\n" + word + "\n");

		for (const ex of explains) {
			console.log("▶　" + ex.textContent + "\n");
		}
	} catch(e) {
		console.error("エラー: " + e);
	}
}

kotobank("生")
