const env = require('../../.env');
const Telegram = require('telegraf/telegram');
const axios = require('axios');
const Markup = require('telegraf/markup');

const enviarMensagem = (msg) => {
  axios
    .get(
      `${env.apiUrl}/sendMessage?chat_id=${env.usersIds[0]}&text=${encodeURI(
        msg
      )}`
    )
    .catch((e) => console.log(e));
};

setInterval(() => {
  enviarMensagem('Enviando a mensagem de forma assíncrona');
}, 3000);

const teclado = Markup.keyboard([['Ok', 'Cancelar']])
  .resize()
  .oneTime()
  .extra();

const telegram = new Telegram(env.token);
telegram.sendMessage(
  env.usersIds[0],
  'Essa é uma mensagem com teclado',
  teclado
);
