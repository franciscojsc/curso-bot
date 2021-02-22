const env = require('../../.env');
const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(env.token);

const downloadFile = require('./download-file');

bot.on('voice', async (ctx) => {
  const id = ctx.update.message.voice.file_id;
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
  const urlFile = `${env.apiFileUrl}/${res.data.result.file_path}`;

  const folder = res.data.result.file_path.split('/')[0];
  const file = res.data.result.file_path.split('/')[1];
  await downloadFile(urlFile, `${__dirname}/${folder}`, file);

  ctx.replyWithVoice({ url: urlFile });
});

bot.on('photo', async (ctx) => {
  const id = ctx.update.message.photo[0].file_id;
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);

  const urlFile = `${env.apiFileUrl}/${res.data.result.file_path}`;

  const folder = res.data.result.file_path.split('/')[0];
  const file = res.data.result.file_path.split('/')[1];
  await downloadFile(urlFile, `${__dirname}/${folder}`, file);

  ctx.replyWithPhoto({ url: urlFile });
});

bot.startPolling();
