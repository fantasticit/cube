import React from 'react';
import cls from 'classnames';
import { Observer } from 'mobx-react';
import { getProps, getSchema, transformStyle, isHidden } from '@/plugins/shared';

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
    const { indicator, style, store, path, hidden } = props;

    if (isHidden(hidden)) {
      return null;
    }

    return store.readonly ? (
      <Component {...props} />
    ) : (
      <Observer
        render={() => (
          <span
            className={cls({
              'component-indicator-wrapper': true,
              'active': store.selectedComponentInfo.path === path,
            })}
            style={transformStyle(style)}
          >
            {indicator}
            <Component {...props} />
          </span>
        )}
      ></Observer>
    );
  };
  WrappedComponent.componentInfo = Component.componentInfo;
  WrappedComponent.defaultProps = Component.defaultProps;
  WrappedComponent.schema = Component.schema;
  return WrappedComponent;
};

plugins.register(withWrapper(withCommon(Text)));
plugins.register(withWrapper(withCommon(Container)));
plugins.register(withWrapper(withCommon(Button)));
plugins.register(withWrapper(withCommon(Table)));
plugins.register(withWrapper(withCommon(JSONSchemaForm)));
