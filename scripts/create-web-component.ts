import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const webBasePath = path.resolve(__dirname, '../packages/tenon-cms/src/materials/base');

const promptList = [
  {
    type: "input",
    name: "name",
    message: "What is the name of your component?",
    required: true,
  },
  {
    type: "confirm",
    name: "isBase",
    message: "Is this a base component?",
    default: false,
  }
];

inquirer.prompt(promptList).then(answers => {
  console.log('>> 正在生成组件...');

  let { name, isBase } = answers;
  name = name[0].toUpperCase() + name.slice(1);
  if (isBase) createBaseComponent(name);
});

function createBaseComponent(compName) {
  if (fs.existsSync(path.resolve(webBasePath, compName))) {
    console.log('>> 组件已存在!');
    return;
  }
  fs.mkdirSync(path.resolve(webBasePath, compName));
  let compFilesName = fs.readdirSync(path.resolve(__dirname, '../templates/base-web-component'));
  let compFiles = {};
  compFilesName.forEach(fileName => {
    const generateCompName = fileName.replace(/{%Name%}/g, compName);
    compFiles[generateCompName] = fs.readFileSync(
      path.resolve(__dirname, '../templates/base-web-component', fileName),
      'utf-8')
      .replace(/{%Name%}/g, compName);
  });
  Object.keys(compFiles).forEach(fileName => {
    fs.writeFileSync(path.resolve(webBasePath, compName, fileName), compFiles[fileName]);
  });
  console.log('>> 组件生成成功!');
}