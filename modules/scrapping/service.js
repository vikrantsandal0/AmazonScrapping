const Promise = require('bluebird');
const moment = require('moment');
const _ = require('underscore');
const axios = require('axios');
const logging = require('../../routes/logging');



const getHtmlData = (apiReference, url) => {
  return new Promise((resolve, reject) => {
    Promise.coroutine(function* () {
      const { data: html } = yield axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
      })
      return html;
    })().then((data) => {
      resolve(data);
    }, (error) => {
      logging.log2(apiReference, { ERROR: error, DATA: {} });
      reject(error);
    });
  });
}

exports.getHtmlData = getHtmlData;