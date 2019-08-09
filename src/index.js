import 'dotenv/config';
import Discord from 'discord.js';
import listenMessage from './commands';

const client = new Discord.Client();

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
  listenMessage(msg, client);
});

client.login(process.env.BOT_TOKEN);
