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
  AdType,
  AD_PRICE_MIN,
  AD_PRICE_MAX,
  PICTURE_NAME_MIN,
  PICTURE_NAME_MAX
} = require(`./mockData`);

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const generateAds = (count) => (
  Array(count).fill().map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PICTURE_NAME_MIN, PICTURE_NAME_MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(AdType)[Math.floor(Math.random() * Object.keys(AdType).length)],
    sum: getRandomInt(AD_PRICE_MIN, AD_PRICE_MAX),
  }))
);

const run = (args) => {
  const [count] = args;
  const countAd = Number.parseInt(count, 10) || DEFAULT_COUNT;
  const content = JSON.stringify(generateAds(countAd));

  try {
    fs.writeFileSync(FILE_NAME, content);
    console.info(`Operation success. File created.`);
    process.exitCode = EXIT_CODE.success;
  } catch (err) {
    console.error(`Can't write data to file...`);
    process.exitCode = EXIT_CODE.error;
  }
};

module.exports = {
  name: `--generate`,
  run
};
