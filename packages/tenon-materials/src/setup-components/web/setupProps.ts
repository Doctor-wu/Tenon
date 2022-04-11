import { getValueByHackContext, getValueByInjectContext, recursiveGetValue } from "@tenon/shared";

export function setupProps(this: any, props = {}) {
  const newProps = {};
  Object.keys(props).forEach(key => {
    injectDynamicPropsValue.call(this, props, key);
  });

  Object.keys(props).forEach(key => {
    key = key.trim();
    let value = props[key];
    switch (key) {
      case "style":
        if (typeof value === "string") {
          newProps[key] = recursiveGetValue(this, value);
        } else if (typeof value === "object") {
          newProps["style"] = value;
        }
        break;
      case "t-bind":
        value = value instanceof Array ? value : [value];
        value.forEach(val => {
          const bindings = typeof val === 'string' ? getValueByInjectContext(this, val) : val;
          Object.keys(bindings).forEach((bindingKey) => {
            newProps[bindingKey] = bindings[bindingKey];
          });
        });
        break;
      default:
        newProps[key] = value;
        break;
    }
  });
  return newProps;
}

export function injectDynamicPropsValue(this: any, value: any, key: string) {
  if (!value[key]) return;
  const type = typeof value[key];
  switch (type) {
    case "object":
      Object.keys(value[key]).forEach(subKey => {
        injectDynamicPropsValue.call(this, value[key], subKey);
      });
      break;
    case "string":
      if (value[key].startsWith("{{") && value[key].endsWith("}}")) {
        value[key] = getValueByHackContext(this, value[key].slice(2, -2))
      }
      break;
    default:
      break;
  }
}
