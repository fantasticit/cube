import React from 'react';
import ReactDOM from 'react-dom';
import { Indicator } from './Indicator';
import { getOffset } from './util';

let el: null | HTMLDivElement = null;
let timer;

export const clear = () => {
  clearTimeout(timer);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

export const render = ({ evt = null, store, path = null }) => {
  // 清理上一次渲染
  clear();
  let target = null;
  /* eslint-disable no-param-reassign */
  if (evt) {
    const domNode = evt.target;
    target = domNode;
    evt.stopPropagation();
    while (!target.dataset.path && target !== document.body) {
      target = target.parentNode;
    }
    // 在 store 中的寻址路径
    path = target.dataset.path;
  } else {
    target = document.querySelector('.page').querySelector(`[data-path="${path}"]`);
  }

  if (!target || !path) {
    return;
  }

  // 删除组件事件
  /* eslint-disable @typescript-eslint/no-empty-function */
  /* eslint-disable no-empty-function */
  const deleteComponent = store.readonly
    ? () => {}
    : (evt) => {
        evt.stopPropagation();
        store.componentStore.deleteComponent(path);
      };

  const render = () => {
    // 定位目标元素
    const { width, height } = target.getBoundingClientRect();
    let { x: originX, y: originY } = getOffset(target);
    originX += parseFloat(target.style.left || 0);
    originY += parseFloat(target.style.top || 0);
    const transform = target.style.transform;
    // 创建 indicator 容器
    el = document.createElement('div');
    const component = store.componentStore.getComponent(path);
    ReactDOM.render(
      <Indicator
        target={target}
        left={originX}
        top={originY}
        transform={transform}
        width={width}
        height={height}
        name={component.name}
        deleteComponent={deleteComponent}
      />,
      el
    );
    document.querySelector('.page').appendChild(el);
  };

  timer = setTimeout(() => {
    render();
  }, 0);
};
