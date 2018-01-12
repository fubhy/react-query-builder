import React from 'react';

export const DateWidget = props => (
  <input
    autoFocus={props.delta === 0}
    type="month"
    value={props.value}
    onChange={event => props.setValue(event.target.value)}
  />
);
