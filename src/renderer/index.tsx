import React from 'react';
import { observer } from 'mobx-react';
import { Store, IPageConfig } from '@/store';
import { render } from './render';

interface IProps {
  config?: IPageConfig;
  store?: Store;
}

const Page = observer(({ store }) => {
  return (
    <div className="page">
      {store.components
        .filter(Boolean)
        .map((componet, idx) => render(componet, idx, store, '', store.readonly))}
    </div>
  );
});

export const Renderer: React.FC<IProps> = ({ config, store }) => {
  if (!store && !config) {
    return null;
  }

  const currentStore =
    store ||
    (config &&
      new Store({
        components: config.components,
        apis: config.apis,
      }));

  return <Page store={currentStore} />;
};
