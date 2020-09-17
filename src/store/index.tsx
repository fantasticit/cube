import 'reflect-metadata';
import { observable } from 'mobx';
import { IApiConfig, IComponentConfig, IPageConfig } from './type';
import { EventStore } from './EventStore';
import { ApiStore } from './ApiStore';
import { ComponentStore } from './ComponentStore';
import { RuntimeStore } from './RuntimeStore';

export type { IApiConfig, IComponentConfig, IPageConfig };

export class Store {
  @observable readonly = true;
  @observable eventStore: EventStore;
  @observable runtimeStore: RuntimeStore;
  @observable apiStore: ApiStore;
  @observable componentStore: ComponentStore;

  constructor({ readonly = true, components = [], apis = [] }) {
    this.readonly = readonly;
    this.eventStore = new EventStore();
    this.runtimeStore = new RuntimeStore();
    this.apiStore = new ApiStore(this.runtimeStore, apis);
    this.componentStore = new ComponentStore(this.runtimeStore, components);
  }

  get components(): Array<IComponentConfig> {
    return this.componentStore.components;
  }

  get apis(): Array<IApiConfig> {
    return this.apiStore.apis;
  }

  toJSON() {
    return {
      components: this.components,
      apis: this.apis,
    };
  }
}
