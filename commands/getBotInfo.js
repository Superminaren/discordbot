/**
 * Created by julia on 02.10.2016.
 */
var i18nBean = require('../utility/i18nManager');
var t = i18nBean.getT();
var cmd = 'bot';
var moment = require('moment');
var AsciiTable = require('ascii-table');
var execute = function (message) {
    if (message.guild) {
        let table = new AsciiTable();
        let duration = moment.duration(message.botUser.uptime);
        let users = 0;
        let channels = 0;
        let voice = 0;
        message.botUser.guilds.map((guild => {
            if (guild.id !== '110373943822540800') {
                users = users + guild.members.size;
                channels = channels + guild.channels.size;
                if (guild.voiceConnection) {
                    voice++;
                }
            }
        }));
        let averageUsers = users/message.botUser.guilds.size-1;
        let averageChannels = channels/message.botUser.guilds.size-1;
        table
            .addRow(t('bot-info.uptime', {lngs:message.lang}), duration.humanize())
            .addRow(t('bot-info.guilds', {lngs:message.lang}), message.botUser.guilds.size-1)
            .addRow(t('bot-info.channels', {lngs:message.lang}), channels)
            .addRow(t('bot-info.users', {lngs:message.lang}), users)
            .addRow(t('bot-info.avg-users', {lngs:message.lang}), averageUsers.toFixed(2))
            .addRow(t('bot-info.avg-channels', {lngs:message.lang}), averageChannels.toFixed(2))
            .addRow(t('bot-info.voice', {lngs:message.lang}), voice);
        message.reply(`\n\`\`\`${table.toString()}\`\`\``);
    }
};
module.exports = {cmd:cmd, accessLevel:0, exec:execute};