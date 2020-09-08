import React, { useCallback } from 'react';
import { Row } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { observer, Observer } from 'mobx-react';
import { plugins } from '@/plugins';
import { Store } from '@/store';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const renderComponent = (component, idx, store, path = '') => {
  /* eslint-disable no-param-reassign */
  path = path || idx;
  const { id, name, props, component: componentName } = component;

  if (store.getValue(name) === name) {
    store.initValue(name);
  }

  const Component = plugins.get(componentName.toLowerCase());
  const runtimeProps = cloneDeep(props);

  Object.keys(runtimeProps).forEach((key) => {
    if (typeof runtimeProps[key] === 'string') {
      runtimeProps[key] = store.getValue(runtimeProps[key]);
    }
  });

  runtimeProps.store = store;
  runtimeProps.runtimeName = name;

  let children = runtimeProps.children || [];

  if (Array.isArray(children)) {
    children = children.filter(Boolean).map((component, idx) =>
      renderComponent(
        component,
        idx,

        store,
        `${path}.props.children.${idx}`
      )
    );
  }

  const select = () => {
    store.selectComponent(path);
  };

  const deleteComponent = (evt) => {
    evt.stopPropagation();
    store.deleteComponent(path);
  };

  const indicator = (
    <div className={'component-indicator'} onClick={select}>
      <span>{name}</span>
      <span onClick={deleteComponent}>
        <CloseOutlined />
      </span>
    </div>
  );

  if (typeof component === 'object') {
    return (
      <Observer
        key={id}
        render={() => (
          <Component
            path={path}
            indicator={indicator}
            {...runtimeProps}
            onClick={runtimeProps.onClick}
          >
            {children}
          </Component>
        )}
      />
    );
  }

  return component;
};

interface IProps {
  store: Store;
}

export const Stage: React.FC<IProps> = observer(({ store }) => {
  const onDragOver = useCallback((evt) => {
    evt.preventDefault();
  }, []);

  const onDrop = useCallback(
    (evt) => {
      evt.preventDefault();
      const componentName = evt.dataTransfer.getData('application/drag-component');
      store.addComponent(componentName);
    },
    [store]
  );

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} className={styles.container}>
      <Row gutter={8}>
        {store.components
          .filter(Boolean)
          .map((componet, idx) => renderComponent(componet, idx, store))}
      </Row>
    </div>
  );
});
