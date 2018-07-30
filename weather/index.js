/**
 *
 *
 * @description 查询天气
 * @method
 * @returns  void
 * @date     2018/7/30 16:15
 * @author   DouPai-LiuYang
 */


const {Weather, CITY_CODE} = require('./china-weather');
const {SmtpMail} = require('../email/send-email');

let main = async () => {
    let ins = new Weather(CITY_CODE['101280601']);
    let wInfo = await ins.get();
    let stmpMail = new SmtpMail().buildTo('liuyang@zhituanbox.com').buildContent(`[${wInfo.city}]天气`, JSON.stringify(wInfo));
    stmpMail.send().then((data) => console.log(data));
};
main();

