import React from 'react';
import { TextWidget, SelectWidget, DateWidget } from 'react-query-builder';
import { ProximityOperator } from 'react-query-builder';

export default {
  conjunctions: {
    and: {
      label: 'And',
      value: value =>
        value.size > 1 ? `(${value.join(' AND ')})` : value.first(),
    },
    or: {
      label: 'Or',
      value: value =>
        value.size > 1 ? `(${value.join(' OR ')})` : value.first(),
    },
  },
  fields: {
    name: {
      label: 'Name',
      widget: 'text',
      operators: [
        'contains',
        'startsWith',
        'endsWith',
        'wordsOne',
        'termsAll',
        'exactPhrase',
        'termsNone',
        'proximity',
      ],
    },
    date: {
      label: 'Date',
      widget: 'date',
      operators: ['equals', 'range', 'minimum', 'maximum'],
    },
    color: {
      label: 'Color',
      widget: [
        'select',
        {
          options: {
            yellow: 'Yellow',
            green: 'Green',
            orange: 'Orange',
          },
        },
      ],
      operators: ['equals'],
    },
  },
  operators: {
    equals: {
      label: 'Equals',
      value: (value, field) => `${field}:${value.first()}`,
    },
    contains: {
      label: 'Contains',
      value: (value, field) => `${field}:*${value.first()}*`,
    },
    startsWith: {
      label: 'Starts with',
      value: (value, field) => `${field}:${value.first()}*`,
    },
    endsWith: {
      label: 'Ends with',
      value: (value, field) => `${field}:*${value.first()}`,
    },
    exactPhrase: {
      label: 'Exact phrase',
      value: (value, field) => `${field}:"${value.first()}"`,
    },
    termsOne: {
      label: 'At least one of the words',
      value: (value, field) =>
        `${field}:(${value
          .first()
          .trim()
          .split(' ')
          .join(' OR ')})`,
    },
    termsAll: {
      label: 'All of the words',
      value: (value, field) =>
        `${field}:(${value
          .first()
          .trim()
          .split(' ')
          .join(' AND ')})`,
    },
    termsNone: {
      label: 'Without the words',
      value: (value, field) =>
        `-${field}:(${value
          .first()
          .trim()
          .split(' ')
          .join(' OR ')})`,
    },
    proximity: {
      label: 'Proximity search',
      cardinality: 2,
      value: (values, field, options) => {
        const whitespace = value => value.indexOf(' ') !== -1;
        const output = values.map(
          value => (whitespace(value) ? `"${value}"` : value),
        );

        return `${field}:"(${output.join(') (')})"~${options.get('proximity')}`;
      },
      options: {
        factory: props => <ProximityOperator {...props} />,
        defaults: {
          proximity: 2,
        },
      },
    },
    range: {
      label: 'Range',
      cardinality: 2,
      value: (values, field) =>
        `[${field}:${values.get(0)} TO ${values.get(1)}]`,
    },
    minimum: {
      label: 'Minimum',
      value: (values, field) => `[${field}:${values.first()} TO *]`,
    },
    maximum: {
      label: 'Maximum',
      value: (values, field) => `[${field}:* TO ${values.first()}]`,
    },
  },
  widgets: {
    text: {
      factory: props => <TextWidget {...props} />,
    },
    select: {
      factory: props => <SelectWidget {...props} />,
    },
    date: {
      factory: props => <DateWidget {...props} />,
    },
  },
  settings: {
    maxNesting: 10,
  },
};
