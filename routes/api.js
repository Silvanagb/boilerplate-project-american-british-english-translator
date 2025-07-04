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

    const rawTranslation = translator.translate(text, locale);

    if (rawTranslation === text) {
      return res.json({ text, translation: 'Everything looks good to me!' });
    }

    const highlighted = translator.translateAndHighlight(text, locale);
    return res.json({ text, translation: highlighted });
  });
