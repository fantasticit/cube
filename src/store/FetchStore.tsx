import aixos from 'axios';
import { observable, action } from 'mobx';

export class FetchStore {
  @observable name = '';
  @observable url = '';
  @observable data = {};
  @observable isFetching = { value: false };
  @observable error = null;

  constructor({ url, name }) {
    this.name = name;
    this.url = url;
    if (typeof window !== 'undefined') {
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

  @action fetch = () => {
    const config = { url: this.url, method: 'get' } as any;
    return this.xhr(config).then((res) => {
      this.data = res.data;
    });
  };

  @action post = (data = null) => {
    const config = { url: this.url, method: 'post', data };
    return this.xhr(config);
  };
}
