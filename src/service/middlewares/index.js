'use strict';

const offerValidator = require(`../middlewares/offerValidator`);
const offerExist = require(`../middlewares/offerExists`);
const commentValidator = require(`../middlewares/commentValidator`);

module.exports = {
  offerValidator,
  offerExist,
  commentValidator
};
