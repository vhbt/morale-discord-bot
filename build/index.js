"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _discordjs = require('discord.js'); var _discordjs2 = _interopRequireDefault(_discordjs);
var _commands = require('./commands'); var _commands2 = _interopRequireDefault(_commands);

const client = new _discordjs2.default.Client();

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    game: {
      name: 'Being awesome!',
    },
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  _commands2.default.call(void 0, msg, client);
});

client.login(process.env.BOT_TOKEN);
