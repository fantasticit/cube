import React from 'react';
import { getProps, getSchema } from '@/plugins/shared';
import { Registry } from './registry';
import { Button } from './Button';
import { Container } from './Container';
import { JSONSchemaForm } from './JSONSchemaForm';
import { Table } from './Table';
import { Text } from './Text';

export const plugins = new Registry();

const withCommon = (Component) => {
  Component.defaultProps = getProps(Component.defaultProps);
  Component.schema = getSchema(Component.schema);
  return Component;
};

const withWrapper = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <div className="component-indicator-wrapper">
        {props.indicator}
        <Component {...props} />
      </div>
    );
  };
  WrappedComponent.componentInfo = Component.componentInfo;
  WrappedComponent.defaultProps = Component.defaultProps;
  WrappedComponent.schema = Component.schema;
  return WrappedComponent;
};

plugins.register(withCommon(Text));
plugins.register(withCommon(Container));
plugins.register(withWrapper(withCommon(Button)));
plugins.register(withCommon(Table));
plugins.register(withCommon(JSONSchemaForm));
