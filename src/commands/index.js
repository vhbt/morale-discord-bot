const runPing = msg => {
  msg.reply('pong');
};

const runInvite = async msg => {
  const invite = await msg.channel.createInvite().catch(console.log);
  msg.reply(`${invite}`);
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
];

export default function listenMessage(msg) {
  const prefix = process.env.BOT_COMMAND_PREFIX;
  const { content } = msg;
  let found = false;

  if (content.startsWith(prefix) && content !== prefix) {
    commands.forEach(command => {
      if (content.substring(prefix.length) === command.message) {
        found = true;
        return command.run(msg);
      }
    });
    if (!found) return msg.reply('Command not found!');
  }
}
