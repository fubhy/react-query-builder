import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed, values, compose } from 'ramda';
import RuleContainer from './containers/RuleContainer';

const mapValues = compose(values, mapObjIndexed);

class Rule extends Component {
  static propTypes = {
    fieldOptions: PropTypes.object.isRequired,
    operatorOptions: PropTypes.object.isRequired,
    setField: PropTypes.func.isRequired,
    setOperator: PropTypes.func.isRequired,
    removeSelf: PropTypes.func.isRequired,
    selectedField: PropTypes.string,
    selectedOperator: PropTypes.string,
  };

  handleFieldSelect = () => {
    this.props.setField(this.field.value);
  };

  handleOperatorSelect = () => {
    this.props.setOperator(this.operator.value);
  };

  render() {
    return (
      <div className="rule">
        <div className="rule--header">
          <div className="rule--actions">
            <button
              className="action action--DELETE"
              onClick={this.props.removeSelf}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="rule--body">
          {this.props.fieldOptions ? (
            <div key="field" className="rule--field">
              <label>Field</label>
              <select
                ref={node => {
                  this.field = node;
                }}
                value={this.props.selectedField}
                onChange={this.handleFieldSelect}
              >
                {mapValues(
                  (label, value) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ),
                  this.props.fieldOptions,
                )}
              </select>
            </div>
          ) : null}
          {this.props.operatorOptions ? (
            <div key="operator" className="rule--operator">
              <label>Operator</label>
              <select
                ref={node => {
                  this.operator = node;
                }}
                value={this.props.selectedOperator}
                onChange={this.handleOperatorSelect}
              >
                {mapValues(
                  (label, value) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ),
                  this.props.operatorOptions,
                )}
              </select>
            </div>
          ) : null}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default RuleContainer(Rule);
