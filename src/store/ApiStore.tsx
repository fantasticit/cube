import { observable, action } from 'mobx';
import { FetchStore } from './FetchStore';
import { RuntimeStore } from './RuntimeStore';

export class ApiStore {
  @observable runtimeStore: RuntimeStore = null;
  @observable apis = []; // API 接口

  constructor(runtimeStore, apis = []) {
    this.runtimeStore = runtimeStore;
    apis.forEach(this.addApi);
  }

  /**
   * 添加 API 接口
   * @param api
   */
  @action addApi = (api) => {
    this.apis.push(api);
    this.runtimeStore.setValue(api.name, new FetchStore(api));
  };

  /**
   * 更新 API 接口
   * @param name
   * @param api
   */
  @action updateApi = (api) => {
    this.runtimeStore.setValue(api.name, new FetchStore(api));
  };
}
