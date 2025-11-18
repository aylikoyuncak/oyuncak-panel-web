import fs from 'node:fs';

function deepTransform(obj, transformKey, transformValue) {
  if (Array.isArray(obj)) {
    return obj.map(item => deepTransform(item, transformKey, transformValue));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const newKey = transformKey ? transformKey(key) : key;
      const newValue = deepTransform(obj[key], transformKey, transformValue);
      result[newKey] = transformValue ? transformValue(newValue) : newValue;
      return result;
    }, {});
  }
  return obj;
}

function transformKeyOrValue(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/`\d+\[\[(.+?),.+?\]\]/g, (_, match) => {
    return match.replace(/, /g, '.');
  });
}

const swagger = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));
const transformedSwagger = deepTransform(swagger, transformKeyOrValue, transformKeyOrValue);
fs.writeFileSync('./swagger.json', JSON.stringify(transformedSwagger, null, 2));

