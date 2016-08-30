var Joi = require('joi');

module.exports = {
  headers: {
    "Content-Type": Joi.string().required()
  }
};