import path from "path";
import fs from "fs";
import { compiler } from "./compiler";
import { asyncCompose } from "@tenon/shared";

type componentsType = {
  [props: string]: {
    [props: string]: componentsMeta;
  }
};

type componentsMeta = {
  view: any;
  logic: any;
  config: any;
  doc: any;
};

export const loadComponents = async () => {
  const components: componentsType = {};
  await buildComponents(components);
  return components;
};

const buildComponents = async (components: componentsType) => {
  const dirs = path.resolve(__dirname, './components/web');
  const compSource = fs.readdirSync(dirs);
  await asyncCompose(
    compSource.map.bind(compSource),
    Promise.all.bind(Promise)
  )(async (compGroup) => {
    components[compGroup] = {};
    const compGroupItems = fs.readdirSync(path.join(dirs, compGroup));
    await asyncCompose(
      compGroupItems.map.bind(compGroupItems),
      Promise.all.bind(Promise)
    )(async comp => {
      const compDir = path.join(dirs, compGroup, comp);
      components[compGroup][comp] = {} as componentsMeta;

      // 组件视图
      components[compGroup][comp].view = compiler.compile(
        fs.readFileSync(
          path.join(compDir, `${comp}.view.tenon`)
        ).toString()
      );

      // 组件逻辑
      components[compGroup][comp].logic = (await import( /* @vite-ignore */ `${path.join(compDir, `${comp}.ts`)}`)).default.toString();

      // 组件文档
      components[compGroup][comp].doc =
        fs.readFileSync(
          path.join(compDir, `${comp}.md`)
        ).toString();

      // 组件配置
      components[compGroup][comp].config = await import( /* @vite-ignore */ path.join(compDir, `${comp}.config.json`));

    });
  });
}

loadComponents()