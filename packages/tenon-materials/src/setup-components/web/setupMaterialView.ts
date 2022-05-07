import { Transform } from "../../compiler/transform";
import { IViewConfig } from "../../type";

export const setupMaterialView = (view: Transform.JSXElement): IViewConfig | string => {
  if (view.elementType === "Text") return view.value!;
  const tree: any = {};
  tree.el = view.identifier;
  tree.props = {};
  if (view.Attributes.length) {
    view.Attributes.forEach(({ key, value, modifiers }) => {
      if (typeof value === "string") {
        try {
          if (value.trim().startsWith('{') && value.trim().endsWith('}'))
            tree.props[key] = new Function(`return ${value}`)();
          else if (value.trim() === 'true' || value.trim() === 'false') {
            tree.props[key] = value.trim() === 'true' ? true : false;
          }
          else tree.props[key] = value;
        } catch (e) {
          tree.props[key] = value;
        }
      } else {
        tree.props[key] = value;
      }
    });
  }
  if (view.children?.length) {
    tree.children = [];
    view.children.forEach(child => {
      tree.children.push(
        setupMaterialView(child)
      );
    });
  }
  tree.type = view.elementType;
  return tree;
}