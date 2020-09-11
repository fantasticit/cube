import React, { useCallback } from 'react';
import { Row } from 'antd';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { plugins } from '@/plugins';
import { Store } from '@/store';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const renderComponent = (component, idx, store, path = '', preview) => {
  /* eslint-disable no-param-reassign */
  path = String(path || idx);
  const { id, name, props, component: componentName } = component;

  if (store.runtimeStore.getValue(name) === name) {
    store.runtimeStore.initValue(name);
  }

  const Component = plugins.get(componentName.toLowerCase());

  if (!Component) {
    return null;
  }

  const defaultProps = Component.defaultProps;
  const runtimeProps = store.componentStore.mergeProps(defaultProps, props);

  Object.keys(runtimeProps).forEach((key) => {
    if (typeof runtimeProps[key] === 'string') {
      runtimeProps[key] = store.runtimeStore.getValue(runtimeProps[key]);
    }
  });

  runtimeProps.store = store;
  runtimeProps.runtimeName = name;

  let children = runtimeProps.children || [];

  if (Array.isArray(children)) {
    children = children
      .filter(Boolean)
      .map((component, idx) =>
        renderComponent(component, idx, store, `${path}.props.children.${idx}`, preview)
      );
  }

  const select = () => {
    if (preview) {
      return;
    }
    store.componentStore.selectComponent(path);
  };

  const deleteComponent = (evt) => {
    evt.stopPropagation();
    store.componentStore.deleteComponent(path);
  };

  const indicator = preview ? null : (
    <div className={'component-indicator'} onClick={select}>
      <span>{name}</span>
      <span onClick={deleteComponent}>
        <CloseOutlined />
      </span>
    </div>
  );

  if (typeof component === 'object') {
    return (
      <Component
        key={id}
        path={path}
        indicator={indicator}
        {...runtimeProps}
        onClick={runtimeProps.onClick}
      >
        {children}
      </Component>
    );
  }

  return component;
};

interface IProps {
  store: Store;
  preview?: boolean;
}

export const Stage: React.FC<IProps> = observer(({ store, preview = false }) => {
  const components = store.componentStore.components;

  const onDragOver = useCallback((evt) => {
    evt.preventDefault();
  }, []);

  const onDrop = useCallback(
    (evt) => {
      evt.preventDefault();
      const componentName = evt.dataTransfer.getData('application/drag-component');
      store.componentStore.addComponent(componentName);
    },
    [store]
  );

  return (
    <div
      className={cls({ [styles.container]: true, [styles.isPreview]: preview })}
      {...(preview ? {} : { onDragOver, onDrop })}
    >
      <Row>
        {components
          .filter(Boolean)
          .map((componet, idx) => renderComponent(componet, idx, store, '', preview))}
      </Row>
    </div>
  );
});
