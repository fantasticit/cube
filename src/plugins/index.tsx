import React from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { Table } from './Table';
import { JSONSchemaForm } from './JSONSchemaForm';

export const plugins = new Map();

const createWrapperComponent = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <div
        className="component-indicator-wrapper"
        style={{
          padding: 2,
          background: 'transparent',
          display: 'inline-block',
          position: 'relative',
        }}
      >
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

plugins.set(Button.componentInfo.name.toLowerCase(), createWrapperComponent(Button));
plugins.set(Container.componentInfo.name.toLowerCase(), Container);
plugins.set(Table.componentInfo.name.toLowerCase(), createWrapperComponent(Table));
plugins.set(
  JSONSchemaForm.componentInfo.name.toLowerCase(),
  createWrapperComponent(JSONSchemaForm)
);
