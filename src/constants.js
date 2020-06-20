'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  MAX_ID_LENGTH: 6,
  MAX_COMMENTS: 10,
  FILE_NAME: `mocks.json`,
  FILE_SENTENCES_PATH: `./src/data/sentences.txt`,
  FILE_TITLES_PATH: `./src/data/titles.txt`,
  FILE_CATEGORIES_PATH: `./src/data/categories.txt`,
  FILE_COMMENTS_PATH: `./src/data/comments.txt`,
  EXIT_CODE: {
    error: 1,
    success: 0,
  }
};
