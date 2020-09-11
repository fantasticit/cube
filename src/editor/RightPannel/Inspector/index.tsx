import React from 'react';
import { observer } from 'mobx-react';
import { PropsEditor } from '@/editor/PropsEditor';
import { Store } from '@/store';

interface IProps {
  store: Store;
}

export const Inspector: React.FC<IProps> = observer(({ store }) => {
  const { props, schema, path } = store.componentStore.selectedComponentInfo;

  return (
    <PropsEditor
      active={path}
      store={store}
      props={props}
      schema={schema}
      onChange={(newProps) => {
        store.componentStore.updateComponentProps(path, newProps);
        store.componentStore.selectComponent(path);
      }}
    />
  );
});
