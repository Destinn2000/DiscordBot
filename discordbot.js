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

// TODO: put commands in an JSON object
// TODO: make a config file

const commands = {
    "!ping": {
        desc: "Pong!",
        actual: "!ping",
        usage: "!ping",
        func: function(bot, message) {
        	message.channel.sendMessage('Pong');
        }
    },
    "!music": {
    	desc: "Play music in the channel you're currently in.",
    	actual: "!music",
    	usage: "!music [play/stop/volume] [YouTube link/-/0-100]",
    	func: function(bot, message, suffix) {
		console.log(suffix);
	        if (suffix.length == 1) {
	            const m_url = url.parse(suffix[0]);
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
	                                    const stream = ytdl('https://www.youtube.com/watch?v=' + yId.v, { filter: 'audioonly' });
	                                    const dispatcher = connection.playStream(stream);
	                                })
	                                .catch(console.error);
	                        }
	                    });
	                }
	            }
	        }
    	}
    }
}

bot.on('ready', () => {
    console.log('Bot joined ' + bot.guilds.array());
});

bot.on('message', message => {
    const msg = message.content;

    // Commands with no suffix
    if (msg.startsWith('!') && !(msg.indexOf(' ') >= 0)) {
        const cmd = msg.toLowerCase();
        const command = _.find(commands, function(o) { return o.actual == cmd; } );

        if (command != undefined) {
        	command.func(bot, message);
        }

    // Commands with suffix
    } else if (msg.startsWith('!') && msg.indexOf(' ') >= 0) {
        const cmd = msg.toLowerCase();
        const cmdArray = msg.split(" ");
        const suffix = msg.split(" ").splice(1, 2);

	console.log(suffix);

        const command = _.find(commands, function(o) {return o.actual == cmdArray[0] } );

        if (command != undefined) {
        	command.func(bot, message, suffix)
        }

    }
});

bot.login(token);

