import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';

export default Group => {
  return class GroupContainer extends Component {
    static propTypes = {
      config: PropTypes.object.isRequired,
    };

    setConjunction = conjunction => {
      this.props.actions.setConjunction(this.props.path, conjunction);
    };

    removeSelf = () => {
      this.props.actions.removeGroup(this.props.path);
    };

    addGroup = () => {
      this.props.actions.addGroup(this.props.path);
    };

    addRule = () => {
      this.props.actions.addRule(this.props.path);
    };

    render() {
      const currentNesting = this.props.path.size;
      const maxNesting = this.props.config.settings.maxNesting;

      // Don't allow nesting further than the maximum configured depth and don't
      // allow removal of the root group.
      const allowFurtherNesting =
        typeof maxNesting === 'undefined' || currentNesting < maxNesting;
      const allowRemoval = currentNesting > 1;

      const conjunctionOptions = mapObjIndexed(
        (item, index) => ({
          id: `conjunction-${this.props.id}-${index}`,
          name: `conjunction[${this.props.id}]`,
          label: item.label,
          checked: index === this.props.conjunction,
          setConjunction: () => this.setConjunction(index),
        }),
        this.props.config.conjunctions,
      );

      return (
        <Group
          id={this.props.id}
          allowRemoval={allowRemoval}
          allowFurtherNesting={allowFurtherNesting}
          conjunctionOptions={conjunctionOptions}
          removeSelf={this.removeSelf}
          addGroup={this.addGroup}
          addRule={this.addRule}
        >
          {this.props.children}
        </Group>
      );
    }
  };
};
