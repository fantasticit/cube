import React, { useCallback } from 'react';
import { Store } from '@/store';
import { plugins } from '@/plugins';
import styles from './index.module.scss';

interface IProps {
  store: Store;
}

const components = plugins.getAll();

export const Components: React.FC<IProps> = () => {
  const onDragStart = useCallback((evt) => {
    evt.dataTransfer.setData('application/drag-component', evt.target.getAttribute('data-id'));
    evt.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul>
        {components.map((component) => {
          return (
            <li
              key={component.componentInfo.name}
              draggable={true}
              onDragStart={onDragStart}
              data-id={component.componentInfo.name}
            >
              {component.componentInfo.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
