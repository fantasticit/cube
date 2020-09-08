import 'reflect-metadata';
import { observable, action, transaction } from 'mobx';
import { plugins } from 'plugins';
import { uuid } from 'utils/uuid';
import { FetchStore } from './FetchStore';

export { FetchStore };

export class Store {
  @observable listeners = [];
  @observable components = [];
  @observable selectedComponentInfo = {
    props: {},
    schema: {},
    path: '',
  }; // 当前选中组件信息
  @observable queries = [];

  constructor({ components = [], queries = [] }) {
    this.components = components;
    queries.forEach(this.addQuery);
  }

  @action subscribe = (subscriber) => {
    this.listeners.push(subscriber);
  };

  @action notify = () => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };

  @action addQuery = (query) => {
    this.queries.push(query);
    this[query.name] = new FetchStore(query);
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

    props = { ...Component.defaultProps, ...props };

    if (!Component) {
      return;
    }
    const schema = Component.schema;
    this.selectedComponentInfo = { props, schema, path };
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
    this.components.push(this.generateComponentByName(componentName));
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
        accu[path].children.push(this.generateComponentByName(componentName));
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
    }, this);
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
    }, this);
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
    path = matches[1];
    const segements = String(path).split('.');
    const root = this[segements[0]];
    const value = segements.reduce((accu, path) => {
      return (accu && accu[path]) || undefined;
    }, this);

    return typeof value === 'undefined'
      ? path
      : typeof value === 'object' && root instanceof FetchStore && 'value' in value
      ? value.value
      : value;
  };

  /**
   * 用于判断子节点是否为空
   * @param child
   */
  isEmptyChildNode(child) {
    return Array.isArray(child) ? child.length <= 0 : Boolean(child);
  }
}
