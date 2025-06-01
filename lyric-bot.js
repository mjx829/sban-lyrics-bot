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

		console.log("\n" + "\x1b[1;4m" + word+ "\x1b[0m" + "\n");

		for (const ex of explains) {
			const row_explain_element = ex.innerHTML;
			const explain_element = row_explain_element.replace(/<br>/g, '\n');
			const container_div = document.createElement("div");
			container_div.innerHTML = explain_element;

			console.log("\x1b[33m▶　\x1b[0m" + container_div.textContent.trim() + "\n");
		}
	} catch(e) {
		console.error("\x1b[1;31mエラー: " + e + "\x1b[0m");
	}
}

kotobank("うんこ")
