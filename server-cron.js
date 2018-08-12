/**
 * Created by LiuYang on 2018-08-12.
 */
var SendMessage = require('./message/send-message.js');
var SendEmail = require('./email/send-email.js');
var schedule = require('node-schedule');
function randomName() {
	 let names = ['甜甜','不省心的女朋友','小仙女','女神','待厌的','小逗逼'];
	var index = Math.floor((Math.random()*names.length));
	return names[index];
}
schedule.scheduleJob('0 25 13 * * *', function(fireDate){
	let  message = new SendMessage();
	message.buildPhone(18576686620);
	message.buildTemplate("纸团盒","SMS_140110977");
	message.buildContent({name:randomName()});
	message.send().then(data=>{
		console.log("发送成功");
	}).catch(err=>{
		console.error("发送失败",err);
		let email = new SendEmail();
		email.buildTo("liuyang@zhituanbox.com");
		email.buildContent("上班短信发送失败",JSON.stringify(err));
		email.send();
	});
});
let email = new SendEmail();
email.buildTo("liuyang@zhituanbox.com");
email.buildContent("cron-server-started","定时服务启动成功");
email.send();