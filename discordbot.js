// Link: http://bit.ly/2hkQM1j
const Discord = require('discord.js');
const Auth = require('./auth.json');

const bot = new Discord.Client();

const token = Auth.d_token;

bot.on('ready', () => {
	console.log('Bot joined ' + bot.guilds.array());
});

bot.on('message', message => {
	if(message.content == '!ping') {
		message.channel.sendMessage('Pong');
	}
});

bot.login(token);

