const Promise = require('bluebird');
const _ = require('underscore');
const scrapper = require('./service');
const cheerio = require('cheerio');
const logging = require('../../routes/logging');
const common = require('../../routes/commonfunction');

const scrapurl = (payload) => {
  return new Promise((resolve, reject) => {
    Promise.coroutine(function* () {
      let html = yield scrapper.getHtmlData(payload.apiReference, payload.url);
      const $ = cheerio.load(html);
      let post = {
        title: $('#productTitle').text().replace(/\n/g, ''),
        canonical: $('link[rel="canonical"]').attr('href'),
        rating : $('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4-5').text(),
        og_description: $('meta[name="description"]').attr('content'),
        og_title: $('meta[property="og:title"]').attr('content'),
        og_url: $('meta[property="og:url"]').attr('content'),
        og_img: $('meta[property="og:image"]').attr('content'),
        og_type: $('meta[property="og:type"]').attr('content'),
        price : $('#priceblock_ourprice').text().replace(/\n/g, ''),
        images: $('img').map(function () { return $(this).attr('src') })
        .get().
        filter(v => {
          var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
          var url = new RegExp(regexQuery, "i");
          return typeof v === "string" && url.test(v);
        })
    }
    logging.log('post--->',post);
    yield common.setDataInRedis(payload.apiReference,'SETTING DATA INTO REDIS',`link-${payload.url}`,post, 3600);
    return post;
    })().then((data) => {
      resolve(data);
    }, () => {
      reject();
    });
  });
}

exports.scrapurl = scrapurl