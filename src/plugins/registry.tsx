import React from 'react';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { getProps, getSchema } from './mixin';

const withCommon = (Component) => {
  Component.defaultProps = getProps(Component.defaultProps);
  Component.schema = getSchema(Component.schema);
  return Component;
};

const withWrapper = (Component) => {
  const WrappedComponent = (props) => {
    // const { store, path, indicator, runtimeName, selectComponent, ...rest } = props;
    // const activePath = store.componentStore.selectedComponentInfo.path;
    // const isActivePath = !store.readonly && activePath === path;

    // // 编辑器传递的 props，预览模式下为空对象
    // const editorProps = store.readonly
    //   ? {
    //       'data-path': path,
    //       'data-active-path': activePath,
    //     }
    //   : {
    //       'className': cls({
    //         'component-indicator-wrapper': true,
    //         'active': isActivePath,
    //       }),
    //       'data-path': path,
    //       'data-active-path': activePath,
    //       'onClick': selectComponent,
    //     };

    return (
      <Component
        {...props}
        // store={store}
        // path={path}
        // runtimeName={runtimeName}
        // indicator={indicator}
        // editorProps={editorProps}
      />
    );
  };

  WrappedComponent.componentInfo = Component.componentInfo;
  WrappedComponent.defaultProps = Component.defaultProps;
  WrappedComponent.schema = Component.schema;
  return WrappedComponent;
};

class Registry {
  private registry: Map<string, any>;

  constructor() {
    this.registry = new Map();
  }

  register(Component) {
    const Wrapped = withCommon(Component);
    this.registry.set(Wrapped.componentInfo.name.toLowerCase(), Wrapped);
  }

  get(name) {
    return this.registry.get(name.toLowerCase());
  }

  getAllComponentNames(): Array<string> {
    return Array.from(this.registry.keys());
  }

  getAll() {
    return Array.from(this.registry.values());
  }
}

export const plugins = new Registry();
