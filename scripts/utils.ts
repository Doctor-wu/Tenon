const inquirer = require("inquirer");

export const askByShell = (questions) => {
  return inquirer.prompt(questions);
};
