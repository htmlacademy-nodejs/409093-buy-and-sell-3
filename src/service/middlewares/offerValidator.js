'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));
  newOffer.title = newOffer.title.replace(/\s+/g, ` `).trim();
  newOffer.description = newOffer.description.replace(/\s+/g, ` `).trim();

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Bad request`);
  }

  if (!newOffer.title.length || newOffer.title.length < 10) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect title`);
  } else if (!newOffer.description.length || newOffer.description.length < 50 || newOffer.description.length > 1000) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect description`);
  } else if (!newOffer.picture.length) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect picture`);
  } else if (!newOffer.type.length || !newOffer.type.includes(`offer` || `sale`)) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect type`);
  } else if (!newOffer.category.length || typeof newOffer.category !== `object`) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect category`);
  } else if (!newOffer.sum || typeof newOffer.sum !== `number` || newOffer.sum < 100) {
    res.status(HttpCode.BAD_REQUEST);
    return res.send(`Incorrect sum`);
  }

  return next();
};
