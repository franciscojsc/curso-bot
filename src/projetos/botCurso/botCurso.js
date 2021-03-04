const env = require('../../../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const axios = require('axios');
const bot = new Telegraf(env.token);

const tecladoOpcoes = Markup.keyboard([
  ['O que são bots 🤖?', 'O que verei no curso?'],
  ['Posso mesmo automatizar tarefas'],
  ['Como comprar o curso?'],
])
  .resize()
  .extra();

const botoes = Extra.markup(
  Markup.inlineKeyboard(
    [Markup.callbackButton('Sim', 's'), Markup.callbackButton('Não', 'n')],
    { columns: 2 }
  )
);

const localizacao = Markup.keyboard([
  Markup.locationRequestButton('Clique aqui para enviar sua localização'),
])
  .resize()
  .oneTime()
  .extra();

bot.start(async (ctx) => {
  const name = ctx.update.message.from.first_name;
  await ctx.replyWithMarkdown(`*Olá, ${name}!*\nEu sou o ChatBot do curso`);
  await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/bot.png');
  await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes);
});

bot.hears('O que são bots 🤖?', (ctx) => {
  ctx.replyWithMarkdown(
    'Bots são blá, blá, blá...\n_Algo mais?_',
    tecladoOpcoes
  );
});

bot.hears('O que verei no curso?', async (ctx) => {
  await ctx.replyWithMarkdown('No *curso* ... tb vamos criar *3 projetos*:');
  await ctx.replyWithMarkdown(
    '1. Um bot que vai gerenciar a sua lista de compras'
  );
  await ctx.replyWithMarkdown(
    '2. Um bot que vai te permitir cadastrar seus eventos'
  );
  await ctx.replyWithMarkdown(
    '3. E você verá como eu fui feito, isso mesmo, você poderá fazer uma cópia de mim'
  );
  await ctx.replyWithMarkdown('\n\n_Algo mais?_', tecladoOpcoes);
});

bot.hears('Posso mesmo automatizar tarefas', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Claro que sim, o bot servirá...\nQuer uma palhinha?',
    botoes
  );
});

bot.hears('Como comprar o curso?', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Que bom... [link](https://www.cod3r.com.br)',
    tecladoOpcoes
  );
});

bot.action('n', (ctx) => {
  ctx.reply('Ok, não precisa ser grosso :(', tecladoOpcoes);
});

bot.action('s', async (ctx) => {
  ctx.reply(
    'Que legal, tente me enviar a sua localização, ou escreva uma mensagem qualquer...',
    localizacao
  );
});

bot.hears(/mensagem qualquer/i, (ctx) => {
  ctx.reply('Essa piada é velha, tente outra...');
});

bot.on('text', async (ctx) => {
  let msg = ctx.message.text;
  msg = msg.split('').reverse().join('');
  await ctx.reply(`A sua mensagem, ao contrário é: ${msg}`);
  await ctx.reply(
    'Isso mostra que eu consigo ler o que você escreve e processar sua mensagem',
    tecladoOpcoes
  );
});

bot.on('location', async (ctx) => {
  try {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const { apiKeyOpenWeatherMap } = env;
    const { latitude: lat, longitude: lon } = ctx.message.location;
    // console.log(lat, lon);
    const res = await axios.get(
      `${url}?lat=${lat}&lon=${lon}&APPID=${apiKeyOpenWeatherMap}&units=metric`
    );
    await ctx.reply(`Hum... Você está em ${res.data.name}`);
    await ctx.reply(
      `A temperatura por aí está em ${res.data.main.temp} ºC`,
      tecladoOpcoes
    );
  } catch (err) {
    ctx.reply(
      'Estou tendo problemas para pegar a tua localização, você está no planeta terra? :P',
      tecladoOpcoes
    );
  }
});

bot.startPolling();
