import React from 'react';
import { observer } from 'mobx-react';
import { PropsEditor } from '@/components/PropsEditor';
import { Store } from '@/store';
// import styles from './index.module.scss';

interface IProps {
  store: Store;
}

export const Inspector: React.FC<IProps> = observer(({ store }) => {
  const { props, schema, path } = store.selectedComponentInfo;

  return (
    <PropsEditor
      props={props}
      schema={schema}
      onChange={(newProps) => {
        store.updateComponentProps(path, newProps);
      }}
    />
  );
});
