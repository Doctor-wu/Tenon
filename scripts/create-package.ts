import inquirer from "inquirer";
import { askByShell } from "./utils";

const questions: inquirer.EditorQuestionOptions = [
  {
    type: "input",
    name: "pkgName",
    message: "What is the name of the package?",
    validate: (value) => {
      if (!value.length) {
        return "Please enter a name";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "type",
    message: "Choose a build type for the package",
    choices: ["rollup", "vite"],
    validate: (value) => {
      if (!value.length) {
        return "Please select a type";
      }
      return true;
    },
  },
];

askByShell(questions).then((meta) => {
  console.log(meta);
});
