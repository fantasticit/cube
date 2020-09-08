import React, { useCallback } from 'react';
import { Col } from 'antd';

export const Container = ({
  store,
  indicator,
  path,
  span = 12,
  offset = 0,
  bordered,
  boxShadow,
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
      store.addComponentToTarget(path, componentName);
    },
    [store, path]
  );

  return (
    <Col
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="component-indicator-wrapper"
      style={{
        position: 'relative',
        background: '#fff',
        padding: 10,
        boxShadow: boxShadow ? '0 0 16px rgba(0,0,0,.03)' : 'none',
        border: bordered ? '1px solid #ddd' : 0,
      }}
      span={span}
      offset={offset}
    >
      {indicator}
      {store.isEmptyChildNode(children) ? (
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
};

Container.defaultProps = {
  span: 12,
  offset: 0,
  bordered: true,
  boxShadow: true,
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
  bordered: {
    title: '边框',
    type: 'switch',
  },
  boxShadow: {
    title: '阴影',
    type: 'switch',
  },
};
