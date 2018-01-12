import React from 'react';
import { range } from 'ramda';

export const ProximityOperator = props => {
  const selectedProximity = props.options.get(
    'proximity',
    props.defaults.proximity,
  );

  const minProximity = props.minProximity || 2;
  const maxProximity = props.maxProximity || 10;
  const optionsRange = range(minProximity, maxProximity + 1);
  const selectOptions = optionsRange.map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <div className="operator--PROXIMITY">
      <div className="operator--proximity">
        <select
          value={selectedProximity}
          onChange={event => props.setOption('proximity', event.target.value)}
        >
          {selectOptions}
        </select>
      </div>
      <div className="operator--widgets">{props.children}</div>
    </div>
  );
};
