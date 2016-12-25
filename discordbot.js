// Link: http://bit.ly/2hkQM1j
var Discord = require('discord.js');

var bot = new Discord.Client();

var token = 'MjYyNTQ3NjQyNjc5MDMzODc3.C0FEIg.tncczxyPBUsymnf_fflfEAM3bkA';

bot.on('ready', () => {
	console.log('Bot joined ' + bot.guilds.array());
});

bot.on('message', message => {
	if(message.content == '!ping') {
		message.channel.sendMessage('Pong');
	}
});

bot.login(token);

