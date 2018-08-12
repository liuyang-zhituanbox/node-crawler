/**
 *
 *
 * @description 发送短信-阿里大于
 * @method
 * @returns  void
 * @date     2018/7/24 14:02
 * @author   DouPai-LiuYang
 */
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIHTXCmBqbrTxE';
const secretAccessKey = '8Cwi6oqsOD7RIStYHNqf9mr6aeCR5F';
//初始化sms_client
const smsClient = new SMSClient({accessKeyId, secretAccessKey});

//发送短信
class SendMessage {
    /**
     * 加载接受手机号
     */
    buildPhone(phone){
        this.phone = phone;
    }
    buildTemplate(signName,templateCode){
        this.signName = signName;
        this.templateCode = templateCode;
    }
    buildContent(content){
        this.content = content;
    }
    /**
     * 发送短信
     * @returns {Promise}
     */
    send() {
        let config = {
            PhoneNumbers: this.phone,
            SignName: this.signName,
            TemplateCode: this.templateCode,
            TemplateParam: JSON.stringify(this.content)
        };
        return new Promise((resolve, reject) => {
            smsClient.sendSMS(config).then(res => {
                let {Code} = res;
                if (Code === 'OK') {
                    resolve(res);
                } else {
                    reject(res);
                }
            }).catch(err => reject(err));
        });
    }
}
module.exports = SendMessage;