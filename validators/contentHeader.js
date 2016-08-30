var Joi = require('joi');

module.exports = {
  headers: {
    contenttype: Joi.string().required()
  }
};