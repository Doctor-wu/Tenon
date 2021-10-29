import config from "../../config";

export default (source) => {
  return `{
    "name": "${config.cli.basePkgName}/${source.name}",
    "version": "0.0.1",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "doctorwu",
    "license": "MIT",
    "devDependencies": {
    }
}`;
}