import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const webMaterialRootPath = path.resolve(__dirname, '../packages/tenon-cms/src/materials');
const webBasePath = path.resolve(webMaterialRootPath, './base');

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
  },
  {
    type: "input",
    name: "compType",
    message: "Please input the component's type",
    when: (answers) => answers.isBase === false,
  }
];

inquirer.prompt(promptList).then(answers => {
  console.log('>> 正在生成组件...');

  let { name, isBase, compType } = answers;
  name = name[0].toUpperCase() + name.slice(1);
  if (isBase) createBaseComponent(name);
  else createNormalComponent(name, path.resolve(webMaterialRootPath, compType));
});


function createNormalComponent(compName: string, compPath: string) {
  baseCreate(compName, compPath, [
    'config.json',
    'ts',
    'md',
    'view.json',
  ]);
}

function createBaseComponent(compName) {
  baseCreate(compName, webBasePath, [
    'config.json',
    'vue',
    'md',
  ]);
}


function baseCreate(compName: string, compPath: string, loadTails: string[]) {
  if (!fs.existsSync(compPath)) {
    fs.mkdirSync(compPath);
  }
  if (fs.existsSync(path.resolve(compPath, compName))) {
    console.log('>> 组件已存在!');
    return;
  }
  fs.mkdirSync(path.resolve(compPath, compName));
  let compFilesName = fs.readdirSync(path.resolve(__dirname, '../templates/base-web-component'));
  let compFiles = {};
  compFilesName.forEach(fileName => {
    if (!loadTails.some(tail => fileName.endsWith(tail))) return;
    const generateCompName = fileName.replace(/{%Name%}/g, compName);
    compFiles[generateCompName] = fs.readFileSync(
      path.resolve(__dirname, '../templates/base-web-component', fileName),
      'utf-8')
      .replace(/{%Name%}/g, compName);
  });
  Object.keys(compFiles).forEach(fileName => {
    fs.writeFileSync(path.resolve(compPath, compName, fileName), compFiles[fileName]);
  });
  console.log('>> 组件生成成功!');
}