import { observable, action } from 'mobx';

export class EventStore {
  @observable listeners = new Map(); // 事件

  /**
   * 添加事件监听
   * @param type
   * @param subscriber
   */
  @action on = (type, subscriber) => {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(subscriber);
  };

  // 移除事件监听
  @action off = (type, subscriber) => {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).splice(this.listeners.get(type).indexOf(subscriber), 1);
  };

  /**
   * 触发事件
   * @param type
   * @param args
   */
  @action emit = (type, ...args) => {
    (this.listeners.has(type) ? this.listeners.get(type) : []).forEach((listener) => {
      listener(...args);
    });
  };
}
