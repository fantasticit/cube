import React from 'react';
import { Row } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { Store } from '@/store';
import { plugins } from './registry';
import { transformStyle, isHidden } from './mixin';

export const renderComponent = (component, idx, store, path = '', readonly) => {
  /* eslint-disable no-param-reassign */
  path = String(path || idx);
  const { id, name, props, component: componentName } = component;

  component.path = path;

  if (store.runtimeStore.getValue(name) === name) {
    store.runtimeStore.initValue(name);
  }

  // 获取组件注册信息
  const Component = plugins.get(componentName.toLowerCase());
  if (!Component) {
    return null;
  }
  const defaultProps = Component.defaultProps;

  // 生成组件运行时 props
  const runtimeProps = store.componentStore.mergeProps(defaultProps, props);

  // 从 store 获取运行时 props value
  Object.keys(runtimeProps).forEach((key) => {
    if (typeof runtimeProps[key] === 'string') {
      runtimeProps[key] = store.runtimeStore.getValue(runtimeProps[key]);
    }
  });
  // 组件被隐藏
  if ('hidden' in runtimeProps) {
    if (isHidden(runtimeProps.hidden)) {
      return null;
    }
  }
  // 注入 store，运行时绑定名称
  runtimeProps.store = store;
  runtimeProps.runtimeName = name;
  // 转换样式
  if (runtimeProps.style) {
    runtimeProps.style = transformStyle(runtimeProps.style);
  }
  // 渲染 children
  let children = runtimeProps.children || [];
  if (Array.isArray(children)) {
    children = children
      .filter(Boolean)
      .map((component, idx) =>
        renderComponent(component, idx, store, `${path}.props.children.${idx}`, readonly)
      );
  }
  /* eslint-disable no-empty-function */
  /* eslint-disable @typescript-eslint/no-empty-function */
  // 选中组件事件
  const selectComponent = readonly
    ? () => {}
    : (evt) => {
        evt.stopPropagation();
        store.componentStore.selectComponent(path);
      };
  // 删除组件事件
  const deleteComponent = readonly
    ? () => {}
    : (evt) => {
        evt.stopPropagation();
        store.componentStore.deleteComponent(path);
      };
  // 编辑模式下，组件指示器
  const indicator = readonly ? null : (
    <div className={'component-indicator'} onClick={selectComponent}>
      <span>{name}</span>
      <span onClick={deleteComponent} className={'component-indicator-icon'}>
        <CloseCircleOutlined />
      </span>
    </div>
  );

  delete runtimeProps.hidden;

  return (
    <Component
      key={id}
      path={path}
      indicator={indicator}
      selectComponent={selectComponent}
      {...runtimeProps}
    >
      {children}
    </Component>
  );
};

interface IProps {
  store: Store;
}

export const PageRender: React.FC<IProps> = observer(({ store }) => {
  const components = store.componentStore.components;

  return (
    <Row>
      {components
        .filter(Boolean)
        .map((componet, idx) => renderComponent(componet, idx, store, '', store.readonly))}
    </Row>
  );
});
