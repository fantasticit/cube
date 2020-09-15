import React, { useCallback, useEffect, useRef } from 'react';
// import { Col } from 'antd';

export const Container = ({ store, editorProps, style, span = 12, offset = 0, children }) => {
  const ref = useRef();
  const { bindKey, indicator, path, draggable, resizeable, ...restEditorProps } = editorProps;

  useEffect(() => {
    draggable(ref.current);
    resizeable(ref.current);
  }, [draggable, resizeable]);

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
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      span={span}
      offset={offset}
      style={style}
      {...restEditorProps}
      ref={ref}
    >
      {indicator}
      {store.componentStore.isEmptyChildNode(children) ? (
        <div
          style={{
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #ddd',
          }}
        >
          请放置子组件
        </div>
      ) : (
        children
      )}
    </div>
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
