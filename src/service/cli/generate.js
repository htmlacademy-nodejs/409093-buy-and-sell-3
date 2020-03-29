'use strict';

const fs = require(`fs`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  EXIT_CODE
} = require(`../../constants`);

const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  OFFER_TYPE,
  SUM_RESTRICT,
  PICTURE_RESTRICT
} = require(`./mockData`);

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PICTURE_RESTRICT.min, PICTURE_RESTRICT.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OFFER_TYPE)[Math.floor(Math.random() * Object.keys(OFFER_TYPE).length)],
    sum: getRandomInt(SUM_RESTRICT.min, SUM_RESTRICT.max),
  }))
);

const run = (args) => {
  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
  const content = JSON.stringify(generateOffers(countOffer));

  try {
    fs.writeFileSync(FILE_NAME, content);
    console.info(`Operation success. File created.`);
    process.exit(EXIT_CODE.success);
  } catch (err) {
    console.error(`Can't write data to file...`);
    process.exit(EXIT_CODE.error);
  }
};

module.exports = {
  name: `--generate`,
  run
};
