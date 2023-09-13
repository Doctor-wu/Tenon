import { internalSchema, ISchema } from "@tenon/legacy-engine";

export function setupConfigSchemas(config) {
  const {
    schemas = [],
  } = config;
  config.schemas = schemas.map((schema: ISchema) => {
    const {
      type,
      key = "",
      title,
      fieldName,
    } = schema;
    switch (type) {
      case 'object':
      case 'custom':
        return schema;
      case 'internal':
        const specSchema = Object.assign({}, internalSchema[key]);
        if (!specSchema) return schema;
        specSchema.title = title;
        specSchema.fieldName = fieldName;
        return specSchema;
      default:
        return schema;
    }
  });
  config.schemas?.push(internalSchema.containerLayout);
  config.schemas?.push(internalSchema.containerBackground);
}
