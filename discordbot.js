// Link: http://bit.ly/2hkQM1j
const Discord = require('discord.js');
const YouTube = require('youtube-node');
const Auth = require('./auth.json');

const bot = new Discord.Client();
const youTube = new YouTube();

const token = Auth.d_token;
youTube.setKey(Auth.y_token);

bot.on('ready', () => {
	console.log('Bot joined ' + bot.guilds.array());
});

bot.on('message', message => {
	const rawmsg = message.content;
	if(rawmsg.startsWith('!') && !(rawmsg.indexOf(' ') >= 0)) {
		const command = rawmsg.toLowerCase();

		switch(command) {
			case '!ping':
				message.channel.sendMessage('Pong');
			break;
		}
	}
	else if(rawmsg.startsWith('!music')) {
		const result = rawmsg.split(" ");

		if(result.length == 2) {
			message.channel.sendMessage(JSON.stringify(result));
		}
	}
});

bot.login(token);

