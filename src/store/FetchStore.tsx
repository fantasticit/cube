import aixos from 'axios';
import { observable, action } from 'mobx';

export class FetchStore {
  @observable name = '';
  @observable url = '';
  @observable method = 'get';
  @observable data = {};
  @observable isFetching = { value: false };
  @observable error = null;

  constructor({ url, method, name }) {
    this.name = name;
    this.url = url;
    this.method = method.toLowerCase();
    if (typeof window !== 'undefined' && this.method === 'get') {
      this.fetch();
    }
  }

  @action xhr = (config) => {
    this.isFetching = { value: true };
    return aixos(config)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        this.error = e;
        return Promise.reject(e);
      })
      .finally(() => {
        this.isFetching = { value: false };
      });
  };

  @action fetch = (params = {}) => {
    if (this.method !== 'get') {
      /* eslint-disable consistent-return */
      return;
    }

    const config = { url: this.url, method: 'get', params } as any;
    return this.xhr(config).then((res) => {
      this.data = res.data;
    });
  };

  @action post = (data = null) => {
    if (this.method !== 'post') {
      /* eslint-disable consistent-return */
      return;
    }

    const config = { url: this.url, method: 'post', data };
    return this.xhr(config);
  };
}
