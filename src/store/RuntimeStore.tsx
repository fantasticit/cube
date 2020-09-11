import { observable, action } from 'mobx';
import { FetchStore } from './FetchStore';

export class RuntimeStore {
  @observable runtime = {}; // 运行时

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
    /* eslint-disable consistent-return */
    if (!path) {
      return;
    }

    const matches = String(path).match(/{{(\S+)}}/);

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
    /* eslint-disable consistent-return */
    if (!text) {
      return [];
    }

    const matches = String(text).match(/{{(\S+)/);
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
      const f = prefix ? prefix + '.' + path : path;
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
}
