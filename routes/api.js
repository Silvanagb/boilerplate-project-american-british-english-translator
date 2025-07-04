'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();

module.exports = function (app) {
  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      const translation = translator.translateAndHighlight(text, locale);

      if (translation === text) {
        return res.json({ text, translation: 'Everything looks good to me!' });
      }

      return res.json({ text, translation });
    });
};
