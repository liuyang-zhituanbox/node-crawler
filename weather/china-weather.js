/**
 *
 * @description 获取天气，中国天气
 * @method
 * @returns  void
 * @date     2018/7/30 16:18
 * @author   DouPai-LiuYang
 */
const axios = require('axios');
/**
 * 天气类
 */
const CITY_CODE = Object.freeze({
    /**
     * 深圳
     */
    101280601: {
        name: "深圳",
        code: 101280601,
        pinyin: "ShenZhen"
    },
    /**
     * 北京
     */
    101010100: {
        name: "北京",
        code: 101010100,
        pinyin: "BeiJing"
    }
});

class Weather {
    constructor(city = CITY_CODE["101010100"]) {
        this.city = city;
    }

    /**
     * 获取
     */
    get() {
        return new Promise((resolve, reject) => {
            // console.debug('开始获取[%s]的天气情况', this.city.name);
            axios.get(`http://www.weather.com.cn/data/sk/${this.city.code}.html`).then(res => {
                // console.debug('[%s]的天气情况', this.city.name, JSON.stringify(res.data));
                resolve(res.data.weatherinfo);
            }).catch(err => {
                console.error('[%s]的天气情况获取失败', this.city.name, err.message);
                reject(err);
            });
        });
    };
}

module.exports = {Weather, CITY_CODE};
// http://www.weather.com.cn/data/sk/101280601.html
/*
{
    "weatherinfo": {
        "city": "深圳",
        "cityid": "101280601",
        "temp": "28.3",
        "WD": "西南风",
        "WS": "小于3级",
        "SD": "83%",
        "AP": "999.3hPa",
        "njd": "暂无实况",
        "WSE": "<3",
        "time": "17:50",
        "sm": "1.3",
        "isRadar": "1",
        "Radar": "JC_RADAR_AZ9755_JB"
    }
}
 */