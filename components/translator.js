const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translateAndHighlight(strText, strLocale) {
    let strTranslated = '' + strText;
    if(strLocale == 'american-to-british') {
      // translate spelling
      let keys = Object.keys(americanToBritishSpelling);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+americanToBritishSpelling[key]+'</span>');
      }
      // translate titles
      keys = Object.keys(americanToBritishTitles);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+americanToBritishTitles[key]+'</span>');
      }
      // replace untranslatable words
      keys = Object.keys(americanOnly);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+americanOnly[key]+'</span>');
      }
      // format time (ex: 10:30 to 10.30)
      let regex = /([0-9]{1,2})([:])([0-9]{1,2})/g;
      strTranslated = strTranslated.replace(regex, '<span class="highlight">$1.$3</span>');
    }

    if(strLocale == 'british-to-american') {
      let keys = Object.keys(americanToBritishSpelling);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+americanToBritishSpelling[key]+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+key+'</span>');
      }

      keys = Object.keys(americanToBritishTitles);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+americanToBritishTitles[key]+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+key+'</span>');
      }

      keys = Object.keys(britishOnly);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">'+britishOnly[key]+'</span>');
      }

      let regex = /([0-9]{1,2})([\.])([0-9]{1,2})/g;
      strTranslated = strTranslated.replace(regex, '<span class="highlight">$1:$3</span>');
    }

    return strTranslated;
  }

  translate(strText, strLocale) {
    let strTranslated = '' + strText;

    if(strLocale == 'american-to-british') {
      let keys = Object.keys(americanToBritishSpelling);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, americanToBritishSpelling[key]);
      }

     keys = Object.keys(americanToBritishTitles);
for (let key of keys) {
  let regex = new RegExp(`\\b${americanToBritishTitles[key]}\\b`, 'gi');
  let replacement = key;
  strTranslated = strTranslated.replace(regex, (match) => {
    let formatted = replacement;
    if (match[0] === match[0].toUpperCase()) {
      formatted = replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return formatted;
  });
}

      keys = Object.keys(americanOnly);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, americanOnly[key]);
      }

      let regex = /([0-9]{1,2})([:])([0-9]{1,2})/g;
      strTranslated = strTranslated.replace(regex, '$1.$3');
    }

    if(strLocale == 'british-to-american') {
      let keys = Object.keys(americanToBritishSpelling);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+americanToBritishSpelling[key]+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, key);
      }

      keys = Object.keys(americanToBritishTitles);
      for (let key of keys) {
        let regex = new RegExp(`\\b${americanToBritishTitles[key]}\\b`, 'gi');
        let replacement = key;
        strTranslated = strTranslated.replace(regex, (match) => {
          let formatted = replacement;
          if (match[0] === match[0].toUpperCase()) {
            formatted = replacement.charAt(0).toUpperCase() + replacement.slice(1);
          }
          return formatted;
        });
      }

      keys = Object.keys(britishOnly);
      for(let key of keys) {
        let regex = new RegExp('(?<![\\w-])'+key+'(?![\\w-])', 'gi');
        strTranslated = strTranslated.replace(regex, britishOnly[key]);
      }

      let regex = /([0-9]{1,2})([\.])([0-9]{1,2})/g;
      strTranslated = strTranslated.replace(regex, '$1:$3');
    }

    return strTranslated;
  }
}

module.exports = Translator;
