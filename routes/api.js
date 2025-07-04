'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (text === undefined || locale === undefined) {
  return res.status(200).json({ error: 'Required field(s) missing' });
}

if (text.trim() === '') {
  return res.status(200).json({ error: 'No text to translate' });
}

      if (!['american-to-british', 'british-to-american'].includes(locale)) {
        return res.status(200).json({ error: 'Invalid value for locale field' });
      }

      const plain = translator.translate(text, locale);
      const highlighted = translator.translateAndHighlight(text, locale);

      if (plain === text) {
        return res.status(200).json({
          text,
          translation: "Everything looks good to me!"
        });
      }

      return res.status(200).json({
        text,
        translation: highlighted
      });
    });
};
