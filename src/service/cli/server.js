'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {HttpCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);
const {getMockData} = require(`../lib/get-mock-data`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE_TEXT = `Not found`;

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    getMockData();

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(NOT_FOUND_MESSAGE_TEXT));

    app.listen(port, () => {
      console.info(chalk.green(`Сервер запущен на: http://localhost:${port}`));
    });
  }
};
