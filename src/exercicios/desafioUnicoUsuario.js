const env = require('../../.env');
const Telegraf = require('telegraf');
const { usersIds, token } = env;
const bot = new Telegraf(token);

bot.start((ctx) => {
  const { id, first_name } = ctx.update.message.from;
  if (usersIds.indexOf(id) >= 0) {
    ctx.reply(`Ao seu dispor, mestre ${first_name}!`);
  } else {
    ctx.reply(`Sinto muito, mas eu só falo com os meus mestres.`);
  }
});

bot.startPolling();
