import path from "path";
import fs from "fs/promises";

const FEATURE_DIR = path.resolve('./src/features');

async function addFeature(featureName: string) {
  let pascalFeatureName = `${featureName[0].toUpperCase()}${featureName.slice(1)}`;
  while (pascalFeatureName.includes('-')) {
    const [beReplace, group] = /-([a-z])/.exec(pascalFeatureName)!;
    pascalFeatureName = pascalFeatureName.replace(beReplace, group.toUpperCase())
  }
  const indexTxt = (await fs.readFile(path.resolve(__dirname, './demo-feature/index.txt')))
    .toString()
    .replace(/\{Name\}/g, pascalFeatureName)
    .replace(/\{name\}/g, featureName)
  const handlerTxt = (await fs.readFile(path.resolve(__dirname, './demo-feature/{Name}.handler.txt')))
    .toString()
    //@ts-ignore
    .replace(/\{Name\}/g, pascalFeatureName)
    .replace(/\{name\}/g, featureName)
  const interfaceTxt = (await fs.readFile(path.resolve(__dirname, './demo-feature/{Name}.interface.txt')))
    .toString()
    //@ts-ignore
    .replace(/\{Name\}/g, pascalFeatureName)
    .replace(/\{name\}/g, featureName)
  const controllerTxt = (await fs.readFile(path.resolve(__dirname, './demo-feature/{Name}.controller.txt')))
    .toString()
    //@ts-ignore
    .replace(/\{Name\}/g, pascalFeatureName)
    .replace(/\{name\}/g, featureName);

  await fs.mkdir(
    path.resolve(FEATURE_DIR, featureName),
  );
  await fs.writeFile(
    path.resolve(FEATURE_DIR, featureName, `index.ts`),
    indexTxt,
  );
  await fs.writeFile(
    path.resolve(FEATURE_DIR, featureName, `${featureName}.handler.ts`),
    handlerTxt,
  );
  await fs.writeFile(
    path.resolve(FEATURE_DIR, featureName, `${featureName}.interface.ts`),
    interfaceTxt,
  );
  await fs.writeFile(
    path.resolve(FEATURE_DIR, featureName, `${featureName}.controller.ts`),
    controllerTxt,
  );
  console.log(`${pascalFeatureName} 添加成功`);
}


const [, , featureName] = process.argv;
console.log('Adding', featureName);
featureName && addFeature(featureName);
