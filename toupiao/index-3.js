/**
 *
 *
 * @description
 * @method
 * @returns  void
 * @date     2018/8/29 14:53
 * @author   DouPai-LiuYang
 */
var schedule = require('node-schedule');
const axios = require('axios');

let number = 62;

function getAid() {
    return (number++);
}

function getRequestData(aid) {
    let j_time = (new Date()).getMilliseconds();
    let p_time = parseInt(new Date().getTime() / 1000);
    return `aid=${aid}&width=804&height=687&id=14623&wechatid=562524&orther_id=onfRL1T9awhnaUGKQ1iu53yigyh8&xenon=onfRL1T9awhnaUGKQ1iu53yigyh8&code=5596&p_time=1535534644&j_time=484`;
    let data = {
        "xenon": "onfRL1RzebIYfMGDiyM37LsVKN6c",
        "width": 636,
        "wechatid": 556849,
        "p_time": 1535523903,
        "orther_id": "onfRL1RzebIYfMGDiyM37LsVKN6c",
        "j_time": 370,
        "id": 14623,
        "height": 687,
        "code": 9479,
        "aid": aid,
    };
    return data;
}

function getHeader(aid) {

    let data = {
        Host: 'www.citydating9.top',
        Connection: 'keep-alive',
        'Content-Length': 166,
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'http://www.citydating9.top',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat QBCore/3.43.884.400 QQBrowser/9.0.2524.400',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'http://www.citydating9.top/activity_item1.php?aid=324&id=14623&userid=562524&orther_openid=onfRL1T9awhnaUGKQ1iu53yigyh8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8,en-us;q=0.6,en;q=0.5;q=0.4',
        Cookie: 'PHPSESSID=m1chpngi7r2c3fab6nlbdo5kk5'
    };
    return data;
}

function start() {
    let aid = getAid();
    console.log("开始投票：%s", aid);
    axios.post('http://www.citydating9.top/vote.php', getRequestData(aid), {
        headers: getHeader(aid)
    }).then(res => {
        console.info('aid:%s,投票结果:%s', aid, JSON.stringify(res.data));
    }).catch(err => {
        console.info('aid:%s,投票失败：', err.message);
    });
}

schedule.scheduleJob('*/20 * * * * *', function () {
    start();
});
