/**
 * Created by LiuYang on 2018-08-12.
 */
//http://www.shenhuif.com/text.html

const cheerio = require('cheerio');
const axios = require('axios');

class ShenHuiFu {
	get() {
		return new Promise((r, j) => {
			this.getHtml(this.getUrl()).then(dom => {
				const $ = cheerio.load(dom);
				let list = $(".main-list");
				if (list.length > 0) {
					let title = $(list[0]).find('span[class="title"]').children("a").text();
					let href = $(list[0]).find('span[class="title"]').children("a").attr('href');
					this.getSingle(href).then(data=>r({title,content:data})).catch(e=>j(e));
				} else {
					j();
				}
			}).catch(e => j(e));
		});
	}
	getSingle(href){
		return new Promise((r,j)=>{
			this.getHtml(this.getSingleUrl(href)).then(dom => {
				const $ = cheerio.load(dom);
				let content = $(".main-list").find(".content").text();
				r(content);
			}).catch(e=>j(e));
		});
	}
	getHtml(url) {
		return new Promise((r, j) => {
			axios.get(url).then(res => r(res.data)).catch(e => j(e));
		});
	}

	getUrl() {
		return "http://www.shenhuif.com/text.html";
	}
	getSingleUrl(href){
		return 'http://www.shenhuif.com'+href;
	}
}
module.exports = ShenHuiFu;
async function unitTest() {
	let html = await new ShenHuiFu().get();
	console.log(html);
}
// unitTest();