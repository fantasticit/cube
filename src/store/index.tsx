import 'reflect-metadata';
import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { observable, action, transaction, computed } from 'mobx';
import merge from 'lodash/merge';
import { plugins } from 'plugins';
import { uuid } from 'utils/uuid';
import { FetchStore } from './FetchStore';

export { FetchStore };

export class Store {
  @observable _readonly = { value: false };
  @observable listeners = new Map();
  @observable components = [];
  @observable selectedComponentInfo = {
    props: {},
    schema: {},
    path: '',
  }; // 当前选中组件信息
  @observable queries = [];
  @observable runtime = {};

  constructor({ components = [], queries = [] }) {
    this.components = components;
    queries.forEach(this.addQuery);
  }

  @computed get readonly() {
    return this._readonly.value;
  }

  @action setReadonly = (value) => {
    this._readonly.value = value;
  };

  @action on = (type, subscriber) => {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(subscriber);
  };

  @action off = (type, subscriber) => {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).splice(this.listeners.get(type).indexOf(subscriber), 1);
  };

  @action emit = (type, ...args) => {
    (this.listeners.has(type) ? this.listeners.get(type) : []).forEach((listener) => {
      listener(...args);
    });
  };

  @action addQuery = (query) => {
    this.queries.push(query);
    this.runtime[query.name] = new FetchStore(query);
  };

  @action generateComponentByName = (componentName) => {
    /* eslint-disable no-param-reassign */
    componentName = componentName.toLowerCase();
    const component = plugins.get(componentName);
    if (!component) {
      return;
    }
    const index =
      Math.max.apply(
        null,
        Object.keys(this)
          .filter((key) => key.startsWith(componentName))
          .filter((key) => Boolean(this[key]))
          .map((key) => +key.replace(componentName, ''))
      ) + 1;
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
   * 用于初始化值
   * this.x 初始化以后，再直接设置 this.x.xx 才可响应式
   * @param path
   */
  @action initValue = (path) => {
    const segments = String(path).toLowerCase().split('.');
    segments.reduce((accu, path) => {
      accu[path] = accu[path] || observable({});
      return accu[path];
    }, this.runtime);
  };

  /**
   * 设置指定路径值
   * @param path
   * @param value
   */
  @action setValue = (path, value) => {
    const segments = String(path).split('.');
    segments.reduce((accu, path, idx) => {
      if (idx === segments.length - 1) {
        delete accu[path];
        accu[path] = value;
      } else {
        accu[path] = accu[path] || observable({});
      }
      return accu[path];
    }, this.runtime);
  };

  /**
   * 获取指定路径值
   * @param path
   */
  getValue = (path) => {
    if (!path) {
      return;
    }

    const matches = path.match(/{{(\S+)}}/);

    if (!matches || !matches.length) {
      return path;
    }

    /* eslint-disable no-param-reassign */
    const segements = String(matches[1]).split('.');
    const root = this.runtime[segements[0]];
    const value = segements.reduce((accu, segment) => {
      let r;
      /* eslint-disable no-empty */
      try {
        r = accu[segment];
      } catch (e) {}
      if (typeof r === 'boolean' || typeof r === 'number') {
        return r;
      }
      return r || undefined;
    }, this.runtime);

    if (typeof value === 'object') {
      return root instanceof FetchStore && 'value' in value ? value.value : value;
    }

    if (typeof value === 'function') {
      return value;
    }

    let ret = path.replace(/{{(\S+)}}/g, value);

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return ${ret}`);
      ret = fn.call(window);
      return ret;
    } catch (e) {
      return ret || path;
    }
  };

  @action match = (text) => {
    if (!text) {
      return [];
    }

    const matches = text.match(/{{(\S+)/);
    if (!matches || !matches.length) {
      return [];
    }

    /* eslint-disable no-param-reassign */
    text = matches[0];
    text = text
      .replace(/^{*/, '')
      .replace(/}*$/, '')
      .split(/(\b)(?!\.)/)
      .join('')
      .replace(/\.$/, '');

    const getAllFullPath = (path, prefix = '', ret = [], depth = 1) => {
      let f = prefix ? prefix + '.' + path : path;
      const t = this.getValue(`{{${f}}}`);

      if (typeof t === 'object' && depth < 2) {
        const subs = Object.keys(t);
        subs.forEach((sub) => getAllFullPath(sub, f, ret, depth + 1));
      } else {
        ret.push(f);
      }
      return ret;
    };

    return getAllFullPath(text).map((key) => ({ label: key, value: `{{${key}}}` }));
  };

  /**
   * 用于判断子节点是否为空
   * @param child
   */
  isEmptyChildNode(child) {
    return Array.isArray(child) ? child.length <= 0 : Boolean(child);
  }

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

  toJSON() {
    return {
      components: this.components,
      queries: this.queries,
    };
  }
}
