'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  MAX_COUNT,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  FILE_NAME,
  EXIT_CODE,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH
} = require(`../../constants`);

const {
  AdType,
  AD_PRICE_MIN,
  AD_PRICE_MAX,
  PICTURE_NAME_MIN,
  PICTURE_NAME_MAX
} = require(`./mockData`);

const getPictureFileName = (number) => number > 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateAds = (count, titles, categories, sentences, comments) => (
  Array(count).fill().map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: shuffle(categories)
            .slice(getRandomInt(0, categories.length - 1)),
    description: shuffle(sentences)
            .slice(1, 5)
            .join(` `),
    picture: getPictureFileName(getRandomInt(PICTURE_NAME_MIN, PICTURE_NAME_MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(AdType)[Math.floor(Math.random() * Object.keys(AdType).length)],
    sum: getRandomInt(AD_PRICE_MIN, AD_PRICE_MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

const run = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);
  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > MAX_COUNT) {
    console.error(chalk.green(`Не больше 1000 объявлений`));
    process.exitCode = EXIT_CODE.success;
  } else if (titles.length && sentences.length && categories.length) {
    const content = JSON.stringify(generateAds(countOffer, titles, categories, sentences, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exitCode = EXIT_CODE.success;
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exitCode = EXIT_CODE.error;
    }
  } else {
    console.error(chalk.red(`Can't read file...`));
    process.exitCode = EXIT_CODE.error;
  }
};

module.exports = {
  name: `--generate`,
  run
};
