require('dotenv').config()
let express = require('express');
let packageInfo = require('./package.json');
let unirest = require("unirest");

const { Telegraf, Scenes, session, Extra, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN)
const { inline_keyboard, likes } = require('./keyboard')
const SceneGenerator = require('./Scenes')
const fetch = require('node-fetch')
const curScene = new SceneGenerator()
const ageScene = curScene.GenAgeScene();
const nameScene = curScene.GenNameScene();
// const scenarioTypeScene = curScene.ScenarioTypeScene()

bot.use(Telegraf.log())

const stage = new Scenes.Stage([ageScene, nameScene])

bot.use(session())
bot.use(stage.middleware())

// let sourceText;

bot.start((ctx) => ctx.reply('Привет! Получи от меня совет. Get_Advace и проверь, свои знания English', inline_keyboard));
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('test', (ctx) => ctx.reply('TEST'))

bot.command('Get_advice', async (ctx) => {
  const response = await fetch('https://api.adviceslip.com/advice')
  const result = await response.json()
   let sourceText = result.slip.advice
   ctx.session.advice = sourceText
   ctx.reply(sourceText)
})
  // ctx.reply(sourceText) // текст без перевода
  // const translateText = async (sourceText, fromLang = 'en', toLang = 'ru') => {
  //   const resp = await fetch(`https://just-translated.p.rapidapi.com/?text=${sourceText}&lang_from=${fromLang}&lang_to=${toLang}`, { // lang_from определяет автоматически
  //     headers: {
  //       'x-rapidapi-key': 
  //       'x-rapidapi-host': 'just-translated.p.rapidapi.com',
  //     },
  //   });
  //   const result2 = (await resp.json()).text[0];
  //   ctx.reply(result2) // получаем перевод
  //   // return result2;
  // };
  // translateText(ctx.session.advice);

  bot.command('translate_advice', async (ctx) => {
 const translateText = async (sourceText, fromLang = 'en', toLang = 'ru') => {
  const resp = await fetch(`https://just-translated.p.rapidapi.com/?text=${sourceText}&lang_from=${fromLang}&lang_to=${toLang}`, { // lang_from определяет автоматически
    headers: {
      'x-rapidapi-key': process.env.X_RAPIDAPI_KEY , 
      'x-rapidapi-host': 'just-translated.p.rapidapi.com',
    },
  });
  const result2 = (await resp.json()).text[0];
  ctx.reply(result2) // получаем перевод
  // return result2;
};
translateText(ctx.session.advice);
//   const req = await fetch('https://rapid-translate.p.rapidapi.com/TranslateText',{ 
//     method: "POST",
//     type: 'json',
//     headers: {
//       "Content-type": "application/json",
//       "x-rapidapi-key": process.env.X_RAPIDAPI_KEY_MIKE,
//       "x-rapidapi-host": "rapid-translate.p.rapidapi.com",
//       "useQueryString": true
//     },
//     body: JSON.stringify(({
//       "from": "en",
//       "text": ctx.session.advice,
//       "to": "ru"
//     }))
//   });
//   const data = await req.json()
//   console.log(data);
  
  
//   ctx.reply(`${data.result}`) // получаем перевод
  })


bot.command('Who_are_you', async (ctx) => {
  ctx.scene.enter('age')
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('HeY!'))
bot.launch()


const app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

const server = app.listen(process.env.PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});
//http://translate.google.ru/translate_a/t?client=x&text={textToTranslate}&hl=en&sl=en&tl=ru

//{textToTranslate}, собственно и есть то, что нам надо перевести (с предложениями справлялось)
//Ответ приходит в виде строки json, который нужно распарсить и получить 
//   translatedText = myJSON.sentences[0].trans;
