var Joi = require('joi');

module.exports = {
  headers: {
    content-type: Joi.string().required()
  }
};