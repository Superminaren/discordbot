/**
 * Created by julia on 02.10.2016.
 */
var messageHelper = require('../utility/message');
var voice = require('../utility/voice');
var logger = require('../utility/logger');
var winston = logger.getT();
var i18nBean = require('../utility/i18nManager');
var t = i18nBean.getT();
var cmd = 'voice';
var execute = function (message) {
    if (message.guild && message.member.voiceChannel && !message.guild.voiceConnection || message.guild && message.member.voiceChannel && messageHelper.hasWolkeBot(message)) {
        message.member.voiceChannel.join().then(connection => {
            message.channel.sendMessage(`${t('joinVoice.join', {lngs:message.lang})} ${message.author}`);
            voice.saveVoice(message.member.voiceChannel).then(() => {
                winston.info(`Saved Voice of Guild ${message.guild.name}`);
            }).catch(winston.warn);
            voice.startQueue(message);
        }).catch(err => {
            winston.warn(err);
            message.reply(t('joinVoice.error', {lngs:message.lang}))
        });
    } else {
        if (!message.guild.voiceConnection) {
            message.reply(t('joinVoice.no-voice', {lngs:message.lang}));
        } else {
            message.reply(t('joinVoice.already-voice', {lngs:message.lang}))
        }
    }
};
module.exports = {cmd: cmd, accessLevel: 0, exec: execute};