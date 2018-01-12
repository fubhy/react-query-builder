import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetContainer from './containers/WidgetContainer';

class Widget extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  };

  render() {
    return (
      <div
        className={`rule--widget rule--widget--${this.props.name.toUpperCase()}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default WidgetContainer(Widget);
