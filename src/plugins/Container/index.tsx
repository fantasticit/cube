import React, { useCallback } from 'react';
import { Col } from 'antd';

export const Container = ({
  store,
  path,
  indicator,
  editorProps,
  style,
  span = 12,
  offset = 0,
  children,
}) => {
  const onDragOver = useCallback((evt) => {
    evt.preventDefault();
  }, []);

  const onDrop = useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const componentName = evt.dataTransfer.getData('application/drag-component');
      store.componentStore.addComponentToTarget(path, componentName);
    },
    [store, path]
  );

  return (
    <Col
      onDrop={onDrop}
      onDragOver={onDragOver}
      span={span}
      offset={offset}
      style={style}
      {...editorProps}
    >
      {indicator}
      {store.componentStore.isEmptyChildNode(children) ? (
        <div
          style={{
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          请放置子组件
        </div>
      ) : (
        children
      )}
    </Col>
  );
};

Container.componentInfo = {
  name: 'Container',
  title: '容器',
  description: '用于分组或者嵌套',
  icon: 'ContainerIcon',
};

Container.defaultProps = {
  span: 12,
  offset: 0,
};

Container.schema = {
  span: {
    title: 'span',
    type: 'number',
  },
  offset: {
    title: 'offset',
    type: 'number',
  },
};
