import React, { useCallback } from 'react';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { Renderer } from '@/renderer';
import { Store } from '@/store';
import styles from './index.module.scss';

interface IProps {
  store: Store;
}

export const Stage: React.FC<IProps> = observer(({ store }) => {
  const onDragOver = useCallback((evt) => {
    evt.preventDefault();
  }, []);

  const onDrop = useCallback(
    (evt) => {
      evt.preventDefault();
      const componentName = evt.dataTransfer.getData('application/drag-component');
      store.componentStore.addComponent(componentName);
    },
    [store]
  );

  return (
    <div
      className={cls({
        [styles.container]: true,
        [styles.isPreview]: store.readonly,
      })}
      {...(store.readonly ? {} : { onDragOver, onDrop })}
    >
      <Renderer store={store} />
    </div>
  );
});
