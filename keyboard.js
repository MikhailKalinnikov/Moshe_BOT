const { Markup } = require('telegraf');
const inline_keyboard = Markup.keyboard(
  [
    Markup.button.callback('/start', 'scene'),
    // Markup.button.callback('/Who_are_you', 'scene'),

    Markup.button.callback('/Get_advice', 'scene'),
    Markup.button.callback('/translate_advice', 'scene'),
    // Markup.button.callback('Любимая картинка', 'lovedPic'),
  ],
  { columns: 2 }
);
const likes = Markup.inlineKeyboard(
  [
    Markup.button.callback(':+1:', 'like'),
    Markup.button.callback(':-1:', 'dislike'),
    Markup.button.callback(':x:', 'disable'),
  ],
  { columns: 2 }
);
module.exports = { inline_keyboard, likes };
