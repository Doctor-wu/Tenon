import { ISchema, TenonComponent, TenonPropsBinding } from '@tenon/legacy-engine';
import { IMaterial, webMaterialConfig, setupConfigSchemas, setupWebComponents, IMaterialConfig } from '@tenon/legacy-materials';
import { materialDependency } from '@tenon/legacy-internal-components';
import ComposeViewConfig from './components/Compose-View/Compose-View.config.json';
import ComposeViewVue from './components/Compose-View/Compose-View.vue';
import { cloneDeep } from 'lodash';
import TenonSDKPage, { SDKPageEvents } from './page';
import { watchEffect } from 'vue';
import { TenonWebSDKRenderer } from './render';
import { TenonSDKProject } from './project';
import { Message } from '@arco-design/web-vue';
import { TenonStore } from '@tenon/legacy-engine';

export interface ITenonWebSDKConfig {
  SDKKey: string;
  homePageId: string;
  el: string | HTMLElement;
  mode?: 'prod' | 'dev';
  request: any;
  prefix?: string;
}

export class TenonWebSDK {
  public componentsMap: Map<string, () => IMaterial> = new Map();
  public componentsGroup: Map<string, Array<() => IMaterial>> = new Map();
  public page: TenonSDKPage;
  public project: TenonSDKProject;
  public renderer: TenonWebSDKRenderer;
  public config: ITenonWebSDKConfig;
  public store = new TenonStore();

  constructor(config: ITenonWebSDKConfig) {
    this.config = config;
    this.config.mode = config.mode || 'prod';
    this.renderer = new TenonWebSDKRenderer(this);
    this.page = new TenonSDKPage(this);
    this.project = new TenonSDKProject(this);
    this.initEvents();
    this.init();
  }

  async init() {
    this.page.setSDKKey(this.config.SDKKey);
    await this.page.changePage(this.config.homePageId);
    await this.project.init();
    await this.initTenonComponent();
    await this.renderer.render(this.page.pageInfo!);
  }

  initEvents() {
    this.page.emitter.on(SDKPageEvents.PageInfo_Changed, () => {
      window.scrollTo(0, 0);
    });
  };

  private async initTenonComponent() {
    TenonComponent.editMode = false;

    // 线上环境应该再将编译好的物料存入文件
    const components = webMaterialConfig as unknown as IMaterialConfig;
    const {
      componentsMap,
      componentsGroup,
    } = await setupWebComponents(components, materialDependency);


    setupConfigSchemas(ComposeViewConfig);
    const composeView = () => {
      const bornConfig = cloneDeep(ComposeViewConfig);
      const base: IMaterial = {
        name: "Compose-View",
        config: bornConfig,
        schemas: bornConfig.schemas as ISchema<"internal">[],
        component: ComposeViewVue,
      };
      return base;
    };
    componentsMap.set("Compose-View", composeView);
    componentsGroup.get("Base")?.unshift(composeView);

    this.componentsMap = componentsMap;
    this.componentsGroup = componentsGroup;

    TenonComponent.materialsMap = this.componentsMap;

    TenonComponent.customConfig.getPageStates = async () => {
      const pageInfo = this.page.pageInfo;
      const pageStates = pageInfo.value.pageStates;
      return pageStates;
    }

    TenonComponent._exec = (instance, expression: string, ...args: any[]) => {
      let executeEvent = args[0] === '__tenon-event__';
      try {
        const handler = executeEvent
          ? new Function('injectMeta', `
              const {$comp, $pageStates, $redirect, $args, $request, $message, $store, _editMode} = injectMeta;
              try {
                ${expression}
              } catch(e) {
                console.error(e);
                return '';
              }
            `)
          : new Function('injectMeta', `
              const {$comp, $pageStates, $redirect, $args, $request, $message, $store, _editMode} = injectMeta;
              try {
                return ${expression};
              } catch(e) {
                console.error(e);
                return '';
              }
            `);
        const injectMeta = {
          $comp: instance,
          $pageStates: this.page.pageInfo.value.pageStates,
          $args: executeEvent ? args.slice(1) : args,
          $redirect: (pageId: string) => this.page.changePage(pageId),
          $request: this.config.request,
          $message: Message,
          $store: this.store,
          _editMode: false,
        };
        handler(injectMeta);
      } catch (e) {
        console.error(expression);

        console.error(e);
      }
    }

    TenonPropsBinding.staticHook.afterAddingBinding((instance: TenonComponent, fieldName, propsKey, expression) => {
      const trigger = async () => {
        if (instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)]) {
          instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)]();
        }
        try {
          const handler = new Function('injectMeta', `
        const {
          $comp,
          $pageStates,
          _editMode,
        } = injectMeta;
        try {
          return ${expression};
        } catch(e) {
          console.error(e);
          return '';
        }
      `);
          const injectMeta = {
            $comp: instance,
            $pageStates: this.page.pageInfo.value.pageStates,
            _editMode: false,
          };
          const cancel = watchEffect(() => {
            try {
              instance.props[fieldName][propsKey] = handler(injectMeta);
            } catch (e) {
              console.error(e);
            }
          });
          instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)] = cancel;
        } catch (e) {
          console.error(e);
          // debugger;
        }
      };
      if (instance.mounted) {
        trigger();
      } else {
        instance.lifecycleHook.onMounted(trigger);
      }
    });

    console.log(componentsMap);
    console.log(componentsGroup);
    console.dir(TenonComponent);
  }
}
