import uuid from './utils/uuid';
import expandTreePath from './utils/expandTreePath';
import defaultRuleProperties from './utils/defaultRuleProperties';
import defaultGroupProperties from './utils/defaultGroupProperties';
import * as constants from './constants';

const hasChildren = (tree, path) =>
  tree.getIn(expandTreePath(path, 'children')).size > 0;

/**
 * @param {object} config
 * @param {Immutable.Map} tree
 */
export const setTree = tree => (state, config) => ({
  type: constants.SET_TREE,
  tree: tree,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {object} properties
 */
export const addRule = (path, properties) => (state, config) => ({
  type: constants.ADD_RULE,
  path: path,
  id: uuid(),
  properties: defaultRuleProperties(config).merge(properties || {}),
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 */
export const removeRule = path => (state, config) => ({
  type: constants.REMOVE_RULE,
  path: path,
  config: config,
});

// const { tree } = getState();
// const parentPath = path.slice(0, -1);
// if (!hasChildren(tree, parentPath)) {
//   dispatch(addRule(config, parentPath));
// }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {object} properties
 */
export const addGroup = (path, properties) => (state, config) => ({
  type: constants.ADD_GROUP,
  path: path,
  id: uuid(),
  properties: defaultGroupProperties(config).merge(properties || {}),
  config: config,
});

// const groupPath = path.push(groupUuid);
// dispatch(addRule(config, groupPath));
// dispatch(addRule(config, groupPath));

/**
 * @param {object} config
 * @param {Immutable.List} path
 */
export const removeGroup = path => (state, config) => ({
  type: constants.REMOVE_GROUP,
  path: path,
  config: config,
});

// const { tree } = getState();
// const parentPath = path.slice(0, -1);
// if (!hasChildren(tree, parentPath)) {
//   dispatch(addRule(config, parentPath));
// }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} field
 */
export const setField = (path, field) => (state, config) => ({
  type: constants.SET_FIELD,
  path: path,
  field: field,
  config: config,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} operator
 */
export const setOperator = (path, operator) => (state, config) => ({
  type: constants.SET_OPERATOR,
  path: path,
  operator: operator,
  config: config,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} value
 */
export const setValue = (path, delta, value) => (state, config) => ({
  type: constants.SET_VALUE,
  path: path,
  delta: delta,
  value: value,
  config: config,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} name
 * @param {*} value
 */
export const setOperatorOption = (path, name, value) => (state, config) => ({
  type: constants.SET_OPERATOR_OPTION,
  path: path,
  name: name,
  value: value,
  config: config,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {string} name
 * @param {*} value
 */
export const setValueOption = (path, delta, name, value) => (
  state,
  config,
) => ({
  type: constants.SET_VALUE_OPTION,
  path: path,
  delta: delta,
  name: name,
  value: value,
  config: config,
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} conjunction
 */
export const setConjunction = (path, conjunction) => (state, config) => ({
  type: constants.SET_CONJUNCTION,
  path: path,
  conjunction: conjunction,
});
