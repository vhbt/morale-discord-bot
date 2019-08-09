const runPing = msg => {
  msg.reply('pong');
};

const runInvite = async msg => {
  const invite = await msg.channel.createInvite().catch(console.log);
  msg.reply(`${invite}`);
};

const runHelp = async msg => {
  await msg.author.createDM();
  await msg.author.dmChannel.send(`
  Hi ${msg.author.toString()}!\n\nAny time you need help, you can send me a message here! :smile:
  `);
};

const dmHelp = async msg => {
  if (!msg.author.bot) {
    await msg.author.createDM();
    await msg.author.dmChannel.send(
      'We will delivery this message to one of your staff. Thank you!'
    );
    const channel = msg.client.channels.find(
      channel => channel.name === process.env.SERVER_STAFF_HELP_CHANNEL
    );
    await channel.send(`Help from ${msg.author.toString()}:\n\n${msg.content}`);
  }
};

const commands = [
  {
    message: 'ping',
    run: runPing,
  },
  {
    message: 'invite',
    run: runInvite,
  },
  {
    message: 'help',
    run: runHelp,
  },
];

export default function listenMessage(msg) {
  const prefix = process.env.BOT_COMMAND_PREFIX;
  const { content } = msg;
  let found = false;

  if (msg.channel.type !== 'dm') {
    if (content.startsWith(prefix) && content !== prefix) {
      commands.forEach(command => {
        if (content.substring(prefix.length) === command.message) {
          found = true;
          return command.run(msg);
        }
      });
      if (!found) return msg.reply('Command not found!');
    }
  } else {
    return dmHelp(msg);
  }
}
