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
        arguments: ['play', 'stop', 'volume'],
        usage: "!music [play/stop/volume] [YouTube link/-/0-100]",
        func: function(bot, message, suffix) {
            if (suffix[0] == 'play') {
                const m_url = url.parse(suffix[1]);
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
            } else if (suffix[0] == 'stop') {
                //check if there is a song playing
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
        const command = _.find(commands, function(o) {
            return o.actual == cmd; });

        if (command != undefined) {
            command.func(bot, message);
        }

    // Commands with suffix
    } else if (msg.startsWith('!') && msg.indexOf(' ') >= 0) {
        const cmd = msg.toLowerCase();
        const suffix = cmd.split(" ").slice(1);

        const command = _.find(commands, function(o) {
            return o.actual == cmdArray[0] });

        if (command != undefined) {
            if (suffix.length > 0 && command.arguments.indexOf(suffix) > -1) {
                command.func(bot, message, suffix);
            } else {
                message.channel.sendMessage('[ERROR] Correct usage: ' + command.usage);
            }
        }

    }
});

bot.login(token);
