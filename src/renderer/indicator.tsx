import React from 'react';
import ReactDOM from 'react-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import interact from 'interactjs';

let el: null | HTMLDivElement = null;

function getOffset(el) {
  /* eslint-disable no-param-reassign */
  const parent = document.querySelector('.page');
  let x = 0;
  let y = 0;

  while (el && el !== parent && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return { x, y };
}

export const clear = () => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

export const render = ({ evt = null, store, path = null }) => {
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

  if (!target) {
    return;
  }

  // 清理上一次渲染
  clear();

  if (!path) {
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
    <div
      className="component-indicator-wrapper"
      style={{
        position: 'absolute',
        left: originX + 'px',
        top: originY + 'px',
        transform,
        width,
        height,
      }}
    >
      <div className={'component-indicator'}>
        <span>{component.name}</span>
        <span className={'component-indicator-icon'} onClick={deleteComponent}>
          <CloseCircleOutlined />
        </span>
      </div>
    </div>,
    el
  );
  document.querySelector('.page').appendChild(el);
  store.componentStore.selectComponent(path);
  const indicatorDOMNode = el.firstChild as HTMLDivElement;
  // 拖拽
  interact(el.querySelector('.component-indicator') as HTMLDivElement).draggable({
    inertia: true,
    autoScroll: true,
    listeners: {
      move(event) {
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        const transform = `translate(${x}px, ${y}px)`;
        indicatorDOMNode.style.transform = transform;
        target.style.transform = transform;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
      end() {
        const x = parseFloat(target.getAttribute('data-x')) || 0;
        const y = parseFloat(target.getAttribute('data-y')) || 0;
        const transform = `translate(${x}px, ${y}px)`;
        store.componentStore.updateComponentProps(path, {
          ...component.props,
          style: { ...component.props.style, transform },
        });
      },
    },
  });
  // 调整大小
  // interact(el as HTMLDivElement).resizable({
  //   edges: {
  //     top: true,
  //     left: true,
  //     bottom: true,
  //     right: true,
  //   },
  //   listeners: {
  //     move(event) {
  //       var x = parseFloat(target.getAttribute('data-x')) || 0;
  //       var y = parseFloat(target.getAttribute('data-y')) || 0;
  //       x += event.deltaRect.left;
  //       y += event.deltaRect.top;

  //       // update the element's style
  //       indicatorDOMNode.style.width = event.rect.width + 'px';
  //       indicatorDOMNode.style.height = event.rect.height + 'px';
  //       indicatorDOMNode.style.transform = 'translate(' + x + 'px,' + y + 'px)';

  //       target.style.width = event.rect.width + 'px';
  //       target.style.height = event.rect.height + 'px';
  //       target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

  //       target.setAttribute('data-x', x);
  //       target.setAttribute('data-y', y);
  //     },
  //     end() {},
  //   },
  // });
};
