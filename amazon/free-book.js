/**
 *
 *
 * @description 读取亚马逊免费书籍列表
 * @method
 * @returns  void
 * @date     2018/7/27 19:19
 * @author   DouPai-LiuYang
 */
const axios = require('axios');


class FreeBook {
    getUrlByPage(page) {
        return `https://www.amazon.cn/s/ref=sr_pg_2?rh=n%3A116087071%2Cn%3A%21116088071%2Cn%3A116169071%2Cp_36%3A159125071&page=${page}&bbn=116169071&ie=UTF8&qid=1532689984`;
    };

    main() {
        console.log(this.getUrlByPage(1));
        axios.get(this.getUrlByPage(1)).then(res => console.log(res.data)).catch(err => console.error(err));
    };
}

new FreeBook().main();