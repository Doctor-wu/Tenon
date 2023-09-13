import { asyncCompose } from "@tenon/shared";
import { parseSchemas2Props } from "@tenon/legacy-engine";
import { cloneDeep } from "lodash";
import { IMaterial, IMaterialConfig, IMaterialMeta } from "../../type";
import { defineComponent } from "vue";
import { setupConfigSchemas } from "./setupSchemas";
import { parseConfig2RenderFn } from "./setupRender";
import { setupComponent } from "./setupFunc";

export const componentsMap = new Map<string, any>();
export const componentsGroup = new Map<string, any[]>();
export let materialDependency: any;

export const setupWebComponents = async (materials: IMaterialConfig, dependency: any) => {
  materialDependency = dependency;
  const groupNames = Object.keys(materials);
  await asyncCompose(
    groupNames.forEach.bind(groupNames),
  )(processGroup.bind(null, componentsGroup, componentsMap, materials));
  return { componentsMap, componentsGroup };
}

const processGroup = async (
  componentsGroup: Map<string, any[]>,
  componentsMap: Map<string, any>,
  materials: IMaterialConfig,
  groupName: string
) => {
  componentsGroup.set(groupName, []);
  const group = materials[groupName];
  const compNames = Object.keys(group);

  await asyncCompose(compNames.forEach.bind(compNames))(
    processComponent.bind(null, groupName, group, componentsGroup, componentsMap)
  );
}

const processComponent = async (
  groupName: string,
  group: {
    [props: string]: IMaterialMeta;
  },
  componentsGroup: Map<string, any[]>,
  componentsMap: Map<string, any>,
  compName: string,
) => {
  const materialMeta = group[compName];
  materialMeta.logic = new Function(`return ${materialMeta.logic}`)();

  const {
    view,
    logic,
    doc,
    config,
  } = materialMeta;

  setupConfigSchemas(config);
  const compFactory: () => IMaterial = () => {
    const bornConfig = cloneDeep(config);
    const base: IMaterial = {
      name: compName,
      config: bornConfig,
      schemas: bornConfig.schemas,
      component: createComponent(view, logic, doc, materialMeta),
    };

    return base;
  };
  componentsMap.set(config.name, compFactory);
  componentsGroup.get(groupName)?.push(compFactory);
}

const componentCache = new Map();

function createComponent(viewConfig, logic, doc, material: IMaterialMeta) {
  if (componentCache.has(material.config.name)) {
    return { ...componentCache.get(material.config.name) };
  }
  const comp = defineComponent({
    name: material.config.name,
    render: function (this: any) {
      return parseConfig2RenderFn.call(this, cloneDeep(viewConfig)).call(this);
    },
    inheritAttrs: false,
    props: {
      tenonCompProps: {
        type: Object,
        default: () => ({}),
      },
      ...parseSchemas2Props(material.config.schemas),
    },
    setup: function (props, ctx) {
      return setupComponent(props, ctx, logic);
    },
    doc,
  });

  componentCache.set(material.config.name, comp);
  return comp;
}
