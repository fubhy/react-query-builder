import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { range } from 'ramda';
import Delta from '../Delta';

export default Widget => {
  return class WidgetContainer extends Component {
    static propTypes = {
      config: PropTypes.object.isRequired,
      path: PropTypes.instanceOf(Immutable.List).isRequired,
      value: PropTypes.instanceOf(Immutable.List).isRequired,
      field: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
    };

    setValue = (delta, value) => {
      this.props.actions.setValue(this.props.path, delta, value);
    };

    setValueOption = (delta, name, value) => {
      this.props.actions.setValueOption(this.props.path, delta, name, value);
    };

    renderOptions = delta => {
      const operatorDefinitions = this.props.config.operators[
        this.props.operator
      ];
      if (typeof operatorDefinitions.valueOptions === 'undefined') {
        return null;
      }

      const {
        factory: optionsFactory,
        ...optionsProps
      } = operatorDefinitions.valueOptions;

      return optionsFactory(
        Object.assign({}, optionsProps, {
          config: this.props.config,
          field: this.props.field,
          operator: this.props.operator,
          delta: delta,
          options: this.props.options.get(delta + '', new Immutable.Map()),
          setOption: (name, value) => this.setValueOption(delta, name, value),
        }),
      );
    };

    renderWidget = delta => {
      const fieldDefinition = this.props.config.fields[this.props.field];

      const widgetName = Array.isArray(fieldDefinition.widget)
        ? fieldDefinition.widget[0]
        : fieldDefinition.widget;

      const widgetOptions = Array.isArray(fieldDefinition.widget)
        ? fieldDefinition.widget[1]
        : undefined;

      const {
        factory: widgetFactory,
        ...widgetProps
      } = this.props.config.widgets[widgetName];

      return widgetFactory(
        Object.assign({}, widgetProps, {
          options: widgetOptions,
          config: this.props.config,
          field: this.props.field,
          operator: this.props.operator,
          delta: delta,
          value: this.props.value.get(delta),
          setValue: value => this.setValue(delta, value),
        }),
      );
    };

    render() {
      const fieldDefinition = this.props.config.fields[this.props.field];
      const operatorDefinition = this.props.config.operators[
        this.props.operator
      ];
      if (
        typeof fieldDefinition === 'undefined' ||
        typeof operatorDefinition === 'undefined'
      ) {
        return null;
      }

      const widgetName = Array.isArray(fieldDefinition.widget)
        ? fieldDefinition.widget[0]
        : fieldDefinition.widget;

      const widgetDefinition = this.props.config.widgets[widgetName];
      if (typeof widgetDefinition === 'undefined') {
        return null;
      }

      const cardinality = operatorDefinition.cardinality || 1;
      if (typeof widgetBehavior === 'undefined') {
        return (
          <Widget name={widgetName}>
            {range(0, cardinality).map(delta => (
              <Delta key={delta} delta={delta}>
                {this.renderWidget(delta)}
                {this.renderOptions(delta)}
              </Delta>
            ))}
          </Widget>
        );
      }

      // @todo Implement custom widget behavior rendering.
      // const widget = widgetFactory({
      //   definition: widgetDefinition,
      //   config: this.props.config,
      //   field: this.props.field,
      //   cardinality: cardinality,
      //   value: this.props.value,
      //   setValue: this.setValue,
      // }, delta => this.props.operator.valueOptions ? this.props.operator.valueOptions.factory({
      //   definition: this.props.operator,
      //   config: this.props.config,
      //   field: this.props.field,
      //   delta: delta,
      //   options: this.props.valueOptions.get(delta),
      //   setOption: (name, value) => this.setValueOption(delta, name, value)
      // }) : null);

      return null;
    }
  };
};
