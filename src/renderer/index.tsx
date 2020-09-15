import React from 'react';
import cls from 'classnames';
import { Row } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { Store, IPageConfig } from '@/store';
import { plugins } from '@/plugins';

export const renderComponent = (component, idx, store: Store, path = '', readonly) => {
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
  if ('visible' in runtimeProps && !runtimeProps.visible) {
    return null;
  }
  // 组件不可见
  if ('hidden' in runtimeProps) {
    if (store.componentStore.isComponentHidden(runtimeProps)) {
      return null;
    }
  }
  // 转换样式
  // Todo: 后续是否需要统一转换
  if (runtimeProps.style) {
    runtimeProps.style = { ...runtimeProps.style };
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
  const activePath = store.componentStore.selectedComponentInfo.path;
  const isActivePath = !store.readonly && activePath === path;
  // 编辑器传递的 props，预览模式下为空对象
  const editorProps = store.readonly
    ? {}
    : {
        className: cls({
          'component-indicator-wrapper': true,
          'active': isActivePath,
        }),
        onClick: selectComponent,
      };

  !store.readonly &&
    Object.assign(editorProps, {
      'bindKey': name,
      indicator,
      path,
      'data-path': path,
      'data-active-path': activePath,
    });
  delete runtimeProps.hidden;

  return (
    <Component key={id} store={store} editorProps={editorProps} {...runtimeProps}>
      {children}
    </Component>
  );
};

interface IProps {
  config?: IPageConfig;
  store?: Store;
}

export const Renderer: React.FC<IProps> = observer(({ config, store }) => {
  if (!store && !config) {
    return null;
  }

  const currentStore =
    store ||
    (config &&
      new Store({
        components: config.components,
        apis: config.apis,
      }));

  return (
    <Row>
      {currentStore.components
        .filter(Boolean)
        .map((componet, idx) =>
          renderComponent(componet, idx, currentStore, '', currentStore.readonly)
        )}
    </Row>
  );
});
