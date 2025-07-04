const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  translate(strText, strLocale) {
    let strTranslated = '' + strText;

    // Honórificos (títulos)
    let keys = Object.keys(americanToBritishTitles);
    for (let key of keys) {
      const brit = americanToBritishTitles[key];

      if (strLocale === 'american-to-british') {
        const regex = new RegExp(`\\b${key.replace('.', '\\.')}\\b`, 'gi');
        strTranslated = strTranslated.replace(regex, (match) => {
          const replacement = brit;
          return match[0] === match[0].toUpperCase()
            ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
            : replacement;
        });
      }

      if (strLocale === 'british-to-american') {
        const regex = new RegExp(`\\b${brit}\\b`, 'gi');
        strTranslated = strTranslated.replace(regex, (match) => {
          const replacement = key;
          return match[0] === match[0].toUpperCase()
            ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
            : replacement;
        });
      }
    }

    // Spelling
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(regex, americanToBritishSpelling[key]);
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        const brit = americanToBritishSpelling[key];
        const regex = new RegExp(`(?<![\\w-])${brit}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(regex, key);
      }
    }

    // Expresiones únicas
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanOnly);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(regex, americanOnly[key]);
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(britishOnly);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(regex, britishOnly[key]);
      }
    }

    // Formato de hora
    if (strLocale === 'american-to-british') {
      strTranslated = strTranslated.replace(/(\d{1,2}):(\d{2})/g, '$1.$2');
    }

    if (strLocale === 'british-to-american') {
      strTranslated = strTranslated.replace(/(\d{1,2})\.(\d{2})/g, '$1:$2');
    }

    return strTranslated;
  }

  translateAndHighlight(strText, strLocale) {
    let strTranslated = '' + strText;

    // Honórificos
    let keys = Object.keys(americanToBritishTitles);
    for (let key of keys) {
      const brit = americanToBritishTitles[key];

      if (strLocale === 'american-to-british') {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        strTranslated = strTranslated.replace(regex, (match) => {
          const replacement = brit;
          return match[0] === match[0].toUpperCase()
            ? `<span class="highlight">${replacement.charAt(0).toUpperCase() + replacement.slice(1)}</span>`
            : `<span class="highlight">${replacement}</span>`;
        });
      }

      if (strLocale === 'british-to-american') {
        const regex = new RegExp(`\\b${brit}\\b`, 'gi');
        strTranslated = strTranslated.replace(regex, (match) => {
          const replacement = key;
          return match[0] === match[0].toUpperCase()
            ? `<span class="highlight">${replacement.charAt(0).toUpperCase() + replacement.slice(1)}</span>`
            : `<span class="highlight">${replacement}</span>`;
        });
      }
    }

    // Spelling
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(
          regex,
          `<span class="highlight">${americanToBritishSpelling[key]}</span>`
        );
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        const brit = americanToBritishSpelling[key];
        const regex = new RegExp(`(?<![\\w-])${brit}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(regex, `<span class="highlight">${key}</span>`);
      }
    }

    // Expresiones únicas
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanOnly);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(
          regex,
          `<span class="highlight">${americanOnly[key]}</span>`
        );
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(britishOnly);
      for (let key of keys) {
        const regex = new RegExp(`(?<![\\w-])${key}(?![\\w-])`, 'gi');
        strTranslated = strTranslated.replace(
          regex,
          `<span class="highlight">${britishOnly[key]}</span>`
        );
      }
    }

    // Formato de hora
    if (strLocale === 'american-to-british') {
      strTranslated = strTranslated.replace(
        /(\d{1,2}):(\d{2})/g,
        '<span class="highlight">$1.$2</span>'
      );
    }

    if (strLocale === 'british-to-american') {
      strTranslated = strTranslated.replace(
        /(\d{1,2})\.(\d{2})/g,
        '<span class="highlight">$1:$2</span>'
      );
    }

    return strTranslated;
  }
}

module.exports = Translator;
