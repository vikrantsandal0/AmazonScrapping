const { json } = require('body-parser');
const common = require('../../routes/commonfunction');
const logging = require('../../routes/logging');

const scrapurl = (req, res, next) => {
  logging.log('inside cache service-->', req.body);
  common.getDataFromRedis(req.body.apiReference, "GETTING DATA FROM REDIS", `link-${req.body.url}`)
    .then(data => {
      logging.log('cache data--->', data);
      if (data && data.length > 0) {
        let response = {
          "message": 'Successful',
          "status": 200,
          "data": JSON.parse(data)
        }
        res.send(JSON.stringify(response));
      } else {
        next()
      }

    })

};

exports.scrapurl = scrapurl;