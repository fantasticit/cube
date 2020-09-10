import React, { useCallback } from 'react';
import { Col } from 'antd';
import { transformStyle } from '@/plugins/shared';

export const Container = ({ store, path, style, span = 12, offset = 0, children }) => {
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
      style={{
        ...transformStyle(style),
      }}
      span={span}
      offset={offset}
    >
      {store.isEmptyChildNode(children) ? (
        <div
          style={{
            // position: 'relative',
            // left: '50%',
            // top: '50%',
            // transform: 'translate(-50%, -50%)',
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
