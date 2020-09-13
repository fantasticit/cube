import 'reflect-metadata';
import { EventStore } from './EventStore';
import { ApiStore } from './ApiStore';
import { ComponentStore } from './ComponentStore';
import { RuntimeStore } from './RuntimeStore';
import { observable } from 'mobx';

export class Store {
  @observable readonly = false;
  @observable eventStore: EventStore;
  @observable runtimeStore: RuntimeStore;
  @observable apiStore: ApiStore;
  @observable componentStore: ComponentStore;

  constructor({ components = [], apis = [] }) {
    this.eventStore = new EventStore();
    this.runtimeStore = new RuntimeStore();
    this.apiStore = new ApiStore(this.runtimeStore, apis);
    this.componentStore = new ComponentStore(this.runtimeStore, components);
  }

  get components() {
    return this.componentStore.components;
  }

  get apis() {
    return this.apiStore.apis;
  }

  toJSON() {
    return {
      components: this.components,
      apis: this.apis,
    };
  }
}
