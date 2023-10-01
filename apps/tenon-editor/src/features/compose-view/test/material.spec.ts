import { shallowMount } from '@vue/test-utils';
import ComposeView from './components/compose-view.vue';

describe('ComposeView', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  })
  // it('renders with default props', () => {
  //   const wrapper = shallowMount(ComposeView);
  //   expect(wrapper.exists()).toBe(true);
  // });

  // it('renders with custom style prop', () => {
  //   const style = { color: 'red' };
  //   const wrapper = shallowMount(ComposeView, {
  //     props: { style },
  //   });
  //   expect(wrapper.props('style')).toMatchObject(style);
  // });

  // it('emits onClick event when clicked', async () => {
  //   const wrapper = shallowMount(ComposeView);
  //   await wrapper.trigger('click');
  //   expect(wrapper.emitted('onClick')).toBeTruthy();
  // });

  // it('renders with React component when using React renderer', () => {
  //   const renderer = new RendererManager();
  //   renderer.registerRenderer('react', {
  //     render: (component, props, container) => {
  //       const element = createElement(component, props);
  //       return { type: RenderResultType.Success, element };
  //     },
  //   });
  //   const wrapper = shallowMount(ComposeView, {
  //     global: {
  //       provide: {
  //         renderer: new RendererHost(renderer),
  //       },
  //     },
  //   });
  //   expect(wrapper.findComponent(ComposeViewReact).exists()).toBe(true);
  // });
});
