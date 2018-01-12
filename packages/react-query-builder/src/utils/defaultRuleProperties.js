import Immutable from 'immutable';
import { repeat, map } from 'ramda';

export const defaultField = config => {
  const field = config.settings.defaultField;

  if (typeof field === 'function') {
    return field(config);
  }

  return field || Object.keys(config.fields)[0];
};

export const defaultOperator = (config, field) => {
  const operator = config.settings.defaultOperator;

  if (typeof operator === 'function') {
    return operator(field, config);
  }

  return operator || Object.values(config.fields[field].operators)[0];
};

export const defaultOperatorOptions = (config, operator) => {
  const options = config.operators[operator].options;

  return new Immutable.Map((options && options.defaults) || {});
};

export const defaultValueOptions = (config, operator) => {
  const item = config.operators[operator];
  const options = item.valueOptions;
  const value = new Immutable.Map((options && options.defaults) || {});
  const items = repeat(value, item.cardinality || 1);

  return new Immutable.List(items);
};

export default config => {
  const field = defaultField(config, field);
  const operator = defaultOperator(config, field);

  return new Immutable.Map({
    field: field,
    operator: operator,
    value: new Immutable.List(),
    operatorOptions: defaultOperatorOptions(config, operator),
    valueOptions: defaultValueOptions(config, operator),
  });
};
