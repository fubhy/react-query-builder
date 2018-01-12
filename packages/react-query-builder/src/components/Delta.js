import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Delta extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    delta: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className={`widget--delta widget--delta-${this.props.delta}`}>
        {[
          <div key="widget" className="widget--widget">
            {this.props.children[0]}
          </div>,
          this.props.children[1] ? (
            <div key="options" className="widget--options">
              {this.props.children[1]}
            </div>
          ) : null,
        ]}
      </div>
    );
  }
}
