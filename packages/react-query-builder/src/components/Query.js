import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'ramda';
import defaultRoot from '../utils/defaultRoot';
import reducer from '../reducer';
import * as actionCreators from '../actions';

export class Query extends Component {
  state = (props => {
    return {
      tree: reducer(defaultRoot(props.config), undefined),
    };
  })(this.props);

  actions = (props => {
    return map(action => {
      return (...args) =>
        this.update(action(...args)(this.state, this.props.config));
    }, actionCreators);
  })(this.props);

  update = action => {
    this.setState(state => ({
      tree: reducer(state.tree, action),
    }));
  };

  render() {
    return this.props.children(
      this.props.config,
      this.state.tree,
      this.actions,
    );
  }
}
