/**
 *
 *
 * @description 发送邮件
 * @method
 * @returns  void
 * @date     2018/7/30 18:01
 * @author   DouPai-LiuYang
 */
const nodemailer = require('nodemailer');

const defaultConfig = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: '15211041016@163.com',
        pass: 'fbrnofbflkacglin'
    }
};

class SmtpMail {
    constructor(config = defaultConfig) {
        this.config = config;
        this.sendConfig = {from: "15211041016@163.com"};
        this.transporter = nodemailer.createTransport(this.config);
    };

    buildTo(to) {
        this.sendConfig.to = to;
        return this;
    }

    buildContent(subject, html) {
        this.sendConfig.subject = subject;
        this.sendConfig.html = html;
        return this;
    }

    send() {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.sendConfig, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

module.exports = {SmtpMail};