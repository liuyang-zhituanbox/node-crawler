/**
 * Created by LiuYang on 2018-08-12.
 */
var SendMessage = require('./message/send-message.js');
var SendEmail = require('./email/send-email.js');
var ShenHuiFu = require('./shenhuifu/index.js');
var schedule = require('node-schedule');
function randomName() {
	let names = ['甜甜', '不省心的女朋友', '小仙女', '女神', '待厌的甜甜甜', '小逗逼'];
	var index = Math.floor((Math.random() * names.length));
	return names[index];
}
async function task(fireDate) {
	let message = new SendMessage();
	message.buildPhone(18576686620);
	message.buildTemplate("纸团盒", "SMS_140110977");
	let name = '\n'+randomName();
	message.buildContent({name});
	message.send().then(async data => {
		console.log("发送成功");
		let email = new SendEmail();
		email.buildTo("zhoutian@zhituanbox.com");
		let shf = await new ShenHuiFu().get();
		email.buildContent(shf.title, shf.content);
		email.send();
	}).catch(err => {
		console.error("发送失败", err);
		let email = new SendEmail();
		email.buildTo("liuyang@zhituanbox.com");
		email.buildContent("上班短信发送失败", JSON.stringify(err));
		email.send();
	});
};
schedule.scheduleJob('0 25 13 * * *',task);
let email = new SendEmail();
email.buildTo("liuyang@zhituanbox.com");
email.buildContent("cron-server-started", "定时服务启动成功");
email.send();