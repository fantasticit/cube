import React, { useEffect, useRef } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

export const Indicator = ({
  target,
  left,
  top,
  transform,
  width,
  height,
  name,
  deleteComponent,
}) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          // TODO: 其他属性
          if (mutation.attributeName === 'style') {
            const { width, height } = target.getBoundingClientRect();
            ref.current.style.width = width + 'px';
            ref.current.style.height = height + 'px';
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(target, config);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <div
      ref={ref}
      className="component-indicator-wrapper"
      style={{
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        transform,
        width,
        height,
      }}
    >
      <div className={'component-indicator'}>
        <span>{name}</span>
        <span className={'component-indicator-icon'} onClick={deleteComponent}>
          <CloseCircleOutlined />
        </span>
      </div>
    </div>
  );
};
