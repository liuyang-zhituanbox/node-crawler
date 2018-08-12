/**
 *
 *
 * @description 查询天气
 * @method
 * @returns  void
 * @date     2018/7/30 16:15
 * @author   DouPai-LiuYang
 */
const axios = require('axios');
class Weather{
    buildCity(city){
        this.city =city;
    };
    get(){
      console.log("start");
      return new Promise((r,j)=>{
				axios.get(`https://www.sojson.com/open/api/weather/json.shtml?city=${encodeURI(this.city.name)}`).then(response=>{
					 r(response.data);
				}).catch(e=>j(e));
			});
    }
};
Weather.CITYS = {
	ShenZhen:{
		name:'深圳'
	}
};
module.exports = Weather;

