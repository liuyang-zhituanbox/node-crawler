/**
 * Created by LiuYang on 2018-08-11.
 */
const Weather = require('./index.js');
var schedule = require('node-schedule');
let weather = new Weather();
weather.buildCity(Weather.CITYS.ShenZhen);

 let main = async()=> {
	 let data =await weather.get();
	 console.log(data.data.forecast);
};
main();
var j = schedule.scheduleJob('*/1 * * * * *', function(fireDate){
	console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});