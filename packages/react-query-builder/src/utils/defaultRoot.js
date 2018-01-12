import Immutable from 'immutable';
import { range } from 'ramda';
import uuid from './uuid';
import defaultRuleProperties from './defaultRuleProperties';
import defaultGroupProperties from './defaultGroupProperties';

export const getChild = (id, config) =>
  new Immutable.Map({
    type: 'rule',
    id: id,
    properties: defaultRuleProperties(config),
  });

export const getChildren = (count, config) =>
  new Immutable.OrderedMap(
    range(0, count)
      .map(() => uuid())
      .reduce(
        (carry, id) => ({
          ...carry,
          [id]: getChild(id, config),
        }),
        [],
      ),
  );

export default (config, children = 2) =>
  new Immutable.Map({
    type: 'group',
    id: uuid(),
    children: getChildren(children, config),
    properties: defaultGroupProperties(config),
  });
