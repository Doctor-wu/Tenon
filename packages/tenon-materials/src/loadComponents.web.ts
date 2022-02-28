import path from "path";
import fs from "fs";
import { asyncCompose } from "@tenon/shared";
import { compiler } from "./compiler";
import { IMaterialConfig, IMaterialMeta, IViewConfig } from "./type";
import { setupMaterialView } from "./setup-components/web";

export const loadWebComponents = async () => {
  const components: IMaterialConfig = {};
  await buildComponents(components);
  return components;
};

const buildComponents = async (components: IMaterialConfig) => {
  const dirs = path.resolve(__dirname, '../components/web');
  const compSource = fs.readdirSync(dirs);
  await asyncCompose(
    compSource.map.bind(compSource),
    Promise.all.bind(Promise)
  )(async (compGroup) => {
    components[compGroup] = {};
    const compGroupItems = fs.readdirSync(path.resolve(dirs, compGroup));
    await asyncCompose(
      compGroupItems.map.bind(compGroupItems),
      Promise.all.bind(Promise)
    )(async comp => {
      const compDir = path.resolve(dirs, compGroup, comp);
      components[compGroup][comp] = {} as IMaterialMeta;

      // 组件视图
      components[compGroup][comp].view = setupMaterialView(
        compiler.compile(
          fs.readFileSync(
            path.resolve(compDir, `${comp}.view.tenon`)
          ).toString()
        )?.children?.[0]!) as IViewConfig;

      // 组件逻辑
      delete require.cache[path.resolve(compDir, `${comp}.ts`)];
      components[compGroup][comp].logic = require(`${path.resolve(compDir, `${comp}.ts`)}`).default.toString();

      // 组件文档
      components[compGroup][comp].doc =
        fs.readFileSync(
          path.resolve(compDir, `${comp}.md`)
        ).toString();

      // 组件配置
      components[compGroup][comp].config = JSON.parse(fs.readFileSync(path.resolve(compDir, `${comp}.config.json`)).toString());
    });
  });
};