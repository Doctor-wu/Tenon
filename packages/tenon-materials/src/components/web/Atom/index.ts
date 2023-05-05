import { TenonText } from './Text/Text';

export const TenonAtomComponents = {
  TenonText,
};

export const renderAtomComponent = (name: string, props: any) => {
  const Component = TenonAtomComponents[name];
  return Component.render(props);
}
