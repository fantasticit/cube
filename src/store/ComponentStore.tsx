import 'reflect-metadata';
import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { observable, action, transaction } from 'mobx';
import merge from 'lodash/merge';
import { plugins } from 'plugins';
import { uuid } from 'utils/uuid';
import { RuntimeStore } from './RuntimeStore';

export class ComponentStore {
  @observable runtimeStore: RuntimeStore;
  @observable components = []; // 组件
  @observable selectedComponentInfo = {
    props: {},
    schema: {},
    path: '',
  }; // 当前选中组件信息

  constructor(runtimeStore, components = []) {
    this.runtimeStore = runtimeStore;
    this.components = components;
  }

  /**
   * 指定组件名生成组件配置
   * @param componentName
   */
  @action generateComponentByName = (componentName) => {
    /* eslint-disable no-param-reassign */
    componentName = componentName.toLowerCase();
    const component = plugins.get(componentName);
    if (!component) {
      return;
    }

    const exist = Object.keys(this.runtimeStore.runtime)
      .filter((key) => key.startsWith(componentName))
      .filter((key) => Boolean(this.runtimeStore.runtime[key]))
      .map((key) => +key.replace(componentName, ''));
    const index = exist && exist.length ? Math.max.apply(null, exist) + 1 : 1;

    /* eslint-disable consistent-return */
    return {
      id: uuid(),
      name: componentName + index,
      component: componentName,
      props: component.defaultProps,
    };
  };

  /**
   * 获取指定路径组件
   * @param path
   */
  @action getComponent = (path) => {
    const segments = String(path).split('.');
    return segments.reduce((accu, path) => {
      return accu[path];
    }, this.components);
  };

  /**
   * 选中指定路径组件
   * @param path
   */
  @action selectComponent = (path) => {
    if (this.selectedComponentInfo.path === path) {
      this.selectedComponentInfo = { props: {}, schema: {}, path: '' };
      return;
    }

    const component = this.getComponent(path);
    /* eslint-disable prefer-const */
    let { props, component: componentName } = component;

    const Component = plugins.get(componentName.toLowerCase());
    if (!Component) {
      return;
    }
    const merged = this.mergeProps(Component.defaultProps, props);
    const schema = Component.schema;
    this.selectedComponentInfo = { props: merged, schema, path };
  };

  /**
   * 更新指定路径组件 props
   * @param path
   * @param value
   */
  @action updateComponentProps = (path, value) => {
    const segments = (path + '.props').split('.');
    segments.reduce((accu, path, idx) => {
      if (idx === segments.length - 1) {
        delete accu[path];
        accu[path] = value;
      } else {
        accu[path] = accu[path] || {};
      }
      return accu[path];
    }, this.components);
  };

  /**
   * 添加子组件
   * @param componentName
   */
  @action addComponent = (componentName) => {
    const component = this.generateComponentByName(componentName);
    component && this.components.push(component);
  };

  /**
   * 向指定路径组件添加子组件
   * @param path
   * @param componentName
   */
  @action addComponentToTarget = (path, componentName) => {
    const segments = (path + '.props').split('.');
    segments.reduce((accu, path, idx) => {
      if (idx === segments.length - 1) {
        accu[path].children = accu[path].children || [];
        const component = this.generateComponentByName(componentName);
        component && accu[path].children.push(component);
      } else {
        accu[path] = accu[path] || {};
      }
      return accu[path];
    }, this.components);
  };

  /**
   * 删除指定路径组件
   * @param path
   */
  @action deleteComponent = (path) => {
    const handle = () => {
      const segments = String(path).split('.');
      const target = segments.slice(0, -1).reduce((accu, path) => {
        accu[path] = accu[path] || {};
        return accu[path];
      }, this.components);

      const deleted = target.splice(segments.slice(-1)[0], 1);

      if (this.selectedComponentInfo.path === path) {
        this.selectedComponentInfo = { props: {}, schema: {}, path: '' };
      }
      // FIXME: 属性无法删除
      transaction(() => {
        this[deleted.name] = null;
        delete this[deleted.name];
      });
    };
    Modal.confirm({
      title: '确定删除?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: handle,
      /* eslint-disable no-empty-function */
      /* eslint-disable @typescript-eslint/no-empty-function */
      onCancel() {},
    });
  };

  /**
   * 用于合并 defaultProps 和 props
   * @param props1
   * @param props2
   */
  mergeProps(props1, props2) {
    const style = Object.create(null);
    merge(style, props1.style || {});
    merge(style, props2.style || {});
    return Object.assign(Object.create(null), props1, props2, { style });
  }
}
