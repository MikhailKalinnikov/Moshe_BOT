
const { Scenes } = require('telegraf')

class SceneGenerator {
  GenAgeScene() {
    const age = new Scenes.BaseScene('age')
    age.enter(async (ctx) => {
      await ctx.reply('Какой Ваш возраст?')
    })
    age.on('text', async (ctx) => {
      const currAge = Number(ctx.message.text)
      if (currAge && currAge > 10 && currAge < 70) {
        await ctx.reply('Спасибо!')
        // ctx.scene.leave()  // leave( для выхода из этой сцены и возврат вначало)
        ctx.scene.enter('name')  //переход в другую сцену
      } else {
        await ctx.reply('Неверный возраст')
        ctx.scene.reenter() //возврат в начало сцены
      }
    })
    age.on('sticker', (ctx) => ctx.reply('👍'))
    age.on('message', (ctx) => ctx.reply('Пожалуйста, цифрами')) // age.on('message') обрабатываем message отличный от ожидаемого
    return age   //необходимо для завершения сцены age
  }

  GenNameScene() {
    const name = new Scenes.BaseScene('name')
    name.enter(async (ctx) => { await ctx.reply('Ваше имя?') })
    name.on('text', async (ctx) => {
      const name = ctx.message.text
      if (name) {
        await ctx.reply(`Привет, ${name}. Получи от меня совет. Get_Advice и проверь, свои знания English`)
        await ctx.scene.leave()
      } else {
        await ctx.reply('Несовсем понял......')
        await ctx.scene.reenter()
      }
    })
    name.on('sticker', (ctx) => ctx.reply('👍'))
    name.on('message', (ctx) => ctx.reply('Пожалуйста, Ваше имя')) // age.on('message') обрабатываем message отличный от ожидаемого
    return name   //необходимо для завершения сцены name
  }
}


  // ScenarioTypeScene() {

  //   const scenarioTypeScene = new Scenes.BaseScene('scenarioTypeScene');

  //   scenarioTypeScene.enter((ctx) => {
  //     ctx.session.myData = {};
  //     ctx.reply('What is your drug?', Markup.inlineKeyboard([
  //       Markup.callbackButton('Movie', 'MOVIE_ACTION'),
  //       Markup.callbackButton('Theater', 'THEATER_ACTION'),
  //     ]).extra());
  //   });

  //   scenarioTypeScene.action('THEATER_ACTION', (ctx) => {
  //     ctx.reply('You choose theater');
  //     ctx.session.myData.preferenceType = 'Theater';
  //     return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
  //   });

  //   scenarioTypeScene.action('MOVIE_ACTION', (ctx) => {
  //     ctx.reply('You choose movie, your loss');
  //     ctx.session.myData.preferenceType = 'Movie';
  //     return ctx.scene.leave(); // exit global namespace
  //   });

  //   scenarioTypeScene.leave((ctx) => {
  //     ctx.reply('Thank you for your time!');
  //   });

  //   // What to do if user entered a raw message or picked some other option?
  //   scenarioTypeScene.use((ctx) => ctx.replyWithMarkdown('Please choose either Movie or Theater'));
  // }


module.exports = SceneGenerator
