import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OperatorContainer from './containers/OperatorContainer';

class Operator extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  };

  render() {
    return (
      <div
        className={`rule--operator rule--operator--${this.props.name.toUpperCase()}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default OperatorContainer(Operator);
