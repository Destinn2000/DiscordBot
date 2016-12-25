// Link: http://bit.ly/2hkQM1j
const Discord = require('discord.js');
const YouTube = require('youtube-node');
const url = require('url');
const querystring = require('querystring');
const ytdl = require('ytdl-core');
const _ = require('lodash');
const Auth = require('./auth.json');

const bot = new Discord.Client();
const youTube = new YouTube();

const token = Auth.d_token;
youTube.setKey(Auth.y_token);

bot.on('ready', () => {
    console.log('Bot joined ' + bot.guilds.array());
});

// TODO: put commands in an JSON object

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
        const res = rawmsg.split(" ");

        if(res.length == 2) {
            const m_url = url.parse(res[1]);
            const query = m_url.query;
            const yId = querystring.parse(query);
		const msg_author = message.member;
		if (msg_author.voiceChannel != undefined) {
			vc = msg_author.voiceChannel;
			if (yId.v != undefined) {
	            		youTube.getById(yId.v, function(error, result) {
            		if (error) {
            			console.log('ERROR OCCURED: ' + error);
            		} else {
				vc.join()
				.then(connection => {
					const stream = ytdl('https://www.youtube.com/watch?v=' + yId.v, {filter : 'audioonly'});
					const dispatcher = connection.playStream(stream);
				})
				.catch(console.error);
            		}
		});
		}
		}
        }
    }
});

bot.login(token);

