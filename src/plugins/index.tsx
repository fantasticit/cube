import React from 'react';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { getProps, getSchema, transformStyle, isHidden } from '@/plugins/shared';
import { Registry } from './registry';
import { Button } from './Button';
import { Container } from './Container';
import { JSONSchemaForm } from './JSONSchemaForm';
import { Table } from './Table';
import { Text } from './Text';
import { TextInput } from './TextInput';

export const plugins = new Registry();

const withCommon = (Component) => {
  Component.defaultProps = getProps(Component.defaultProps);
  Component.schema = getSchema(Component.schema);
  return Component;
};

const withWrapper = (Component) => {
  const WrappedComponent = (props) => {
    const { style, hidden, store, path } = props;

    const activePath = store.componentStore.selectedComponentInfo.path;
    const isActivePath = !store.readonly && activePath === path;
    const rootClassNames = cls({
      'component-indicator-wrapper': !store.readonly,
      'active': isActivePath,
    });

    if (isHidden(hidden)) {
      return null;
    }

    return (
      <Component
        {...props}
        rootClassNames={rootClassNames}
        style={transformStyle(style)}
        activePath={activePath}
        isActivePath={isActivePath}
      />
    );
  };

  WrappedComponent.componentInfo = Component.componentInfo;
  WrappedComponent.defaultProps = Component.defaultProps;
  WrappedComponent.schema = Component.schema;
  return observer(WrappedComponent);
};

plugins.register(withWrapper(withCommon(Container)));
plugins.register(withWrapper(withCommon(Text)));
plugins.register(withWrapper(withCommon(TextInput)));
plugins.register(withWrapper(withCommon(Button)));
plugins.register(withWrapper(withCommon(Table)));
plugins.register(withWrapper(withCommon(JSONSchemaForm)));
