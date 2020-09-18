const apiReferenceModule            = 'scrapper';
const Joi                           = require('joi');
const common                        = require('../../routes/commonfunction');
const logging                       = require('../../routes/logging');

const scrapurl = (req, res, next) => {
  logging.log('inside validator-->', req.body);
  const schema = Joi.object().keys({
      url          : Joi.string().required()
  });
  if(common.validateFields(req.body, res, schema)) {
      req.body.apiReference = {
          module  : apiReferenceModule,
          api     : "scrapurl"
      };
      req.body.lang = req.headers['content-language'] || 'en';
      next()
  }
};

exports.scrapurl = scrapurl;