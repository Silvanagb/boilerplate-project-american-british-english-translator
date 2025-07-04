const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

  translateAndHighlight(strText, strLocale) {
    let strTranslated = '' + strText;

    // SPELLING
    if (strLocale === 'american-to-british') {
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + americanToBritishSpelling[key] + '</span>');
      }
    }

    if (strLocale === 'british-to-american') {
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let val = americanToBritishSpelling[key];
        let regex = new RegExp('(?<![\\w-])' + val + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + key + '</span>');
      }
    }

    // TITLES/HONORIFICS
    let keys = Object.keys(americanToBritishTitles);
    for (let key of keys) {
      let brit = americanToBritishTitles[key];

      if (strLocale === 'american-to-british') {
        let regex = new RegExp(`\\b${key.replace('.', '\\.')}\\s(?=[A-Z])`, 'g');
        strTranslated = strTranslated.replace(regex, (match) => {
          let replacement = '<span class="highlight">' + brit + '</span>' + ' ';
          if (match[0] === match[0].toUpperCase()) {
            replacement = '<span class="highlight">' + brit.charAt(0).toUpperCase() + brit.slice(1) + '</span>' + ' ';
          }
          return replacement;
        });
      }

      if (strLocale === 'british-to-american') {
        let regex = new RegExp(`\\b${brit}\\s(?=[A-Z])`, 'g');
        strTranslated = strTranslated.replace(regex, (match) => {
          let replacement = '<span class="highlight">' + key + '</span>' + ' ';
          if (match[0] === match[0].toUpperCase()) {
            replacement = '<span class="highlight">' + key.charAt(0).toUpperCase() + key.slice(1) + '</span>' + ' ';
          }
          return replacement;
        });
      }
    }

    // EXPRESSIONS
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanOnly);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + americanOnly[key] + '</span>');
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(britishOnly);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + britishOnly[key] + '</span>');
      }
    }

    // TIME FORMAT
    if (strLocale === 'american-to-british') {
      let regex = /(\d{1,2}):(\d{2})/g;
      strTranslated = strTranslated.replace(regex, '<span class="highlight">$1.$2</span>');
    }

    if (strLocale === 'british-to-american') {
      let regex = /(\d{1,2})\.(\d{2})/g;
      strTranslated = strTranslated.replace(regex, '<span class="highlight">$1:$2</span>');
    }

    return strTranslated.trim();
  }

  translate(strText, strLocale) {
    let strTranslated = '' + strText;

    // SPELLING
    if (strLocale === 'american-to-british') {
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, americanToBritishSpelling[key]);
      }
    }

    if (strLocale === 'british-to-american') {
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let val = americanToBritishSpelling[key];
        let regex = new RegExp('(?<![\\w-])' + val + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, key);
      }
    }

    // TITLES/HONORIFICS
    let keys = Object.keys(americanToBritishTitles);
    for (let key of keys) {
      let brit = americanToBritishTitles[key];

      if (strLocale === 'american-to-british') {
        let regex = new RegExp(`\\b${key.replace('.', '\\.')}\\s(?=[A-Z])`, 'g');
        strTranslated = strTranslated.replace(regex, (match) => {
          let replacement = brit + ' ';
          if (match[0] === match[0].toUpperCase()) {
            replacement = brit.charAt(0).toUpperCase() + brit.slice(1) + ' ';
          }
          return replacement;
        });
      }

      if (strLocale === 'british-to-american') {
        let regex = new RegExp(`\\b${brit}\\s(?=[A-Z])`, 'g');
        strTranslated = strTranslated.replace(regex, (match) => {
          let replacement = key + ' ';
          if (match[0] === match[0].toUpperCase()) {
            replacement = key.charAt(0).toUpperCase() + key.slice(1) + ' ';
          }
          return replacement;
        });
      }
    }

    // EXPRESSIONS
    if (strLocale === 'american-to-british') {
      keys = Object.keys(americanOnly);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, americanOnly[key]);
      }
    }

    if (strLocale === 'british-to-american') {
      keys = Object.keys(britishOnly);
      for (let key of keys) {
        let regex = new RegExp('(?<![\\w-])' + key + '(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, britishOnly[key]);
      }
    }

    // TIME FORMAT
    if (strLocale === 'american-to-british') {
      let regex = /(\d{1,2}):(\d{2})/g;
      strTranslated = strTranslated.replace(regex, '$1.$2');
    }

    if (strLocale === 'british-to-american') {
      let regex = /(\d{1,2})\.(\d{2})/g;
      strTranslated = strTranslated.replace(regex, '$1:$2');
    }

    return strTranslated.trim();
  }
}

module.exports = Translator;
