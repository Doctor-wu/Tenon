import { IMaterial } from "../store/modules/materials";

export const setupMaterials = (store: any) => {
  const materialsRaw = import.meta.globEager('../materials/**/*.vue');
  const configRaw = import.meta.globEager('../materials/**/*.config.json');
  const materials = new Map<string, (() => IMaterial)[]>();
  const materialsMap = new Map<string, () => IMaterial>();
  Object.keys(materialsRaw).forEach(key => {
    const m = key.replace('../materials/', '');
    const configPath = key.replace('.vue', '.config.json');
    const config = configRaw[configPath].default;

    const category = m.split('/')[0];
    if (!materials.get(category)) {
      materials.set(category, []);
    }
    const comp: () => IMaterial = () => {

      const base: IMaterial = {
        name: m.split('/')[1],
        component: materialsRaw[key].default,
        config,
      };
      return base;
    };

    materials.get(category)!.push(comp);
    materialsMap.set(m.split('/')[1], comp);
  });

  store.dispatch('materials/setMaterials', materials);
  store.dispatch('materials/setMaterialsMap', materialsMap);
}