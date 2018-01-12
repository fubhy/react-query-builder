import React from 'react';

export const TextWidget = props => (
  <input
    autoFocus={props.delta === 0}
    type="text"
    value={props.value}
    onChange={event => props.setValue(event.target.value)}
  />
);
