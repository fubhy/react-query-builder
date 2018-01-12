import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from '../utils/queryString';

export class Preview extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  };

  render() {
    return this.props.children(queryString(this.props.tree, this.props.config));
  }
}
