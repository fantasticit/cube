import React from 'react';
import { Store } from '@/store';
import { Inspector } from './Inspector';

interface IProps {
  store: Store;
}

export const RightPannel: React.FC<IProps> = ({ store }) => {
  return <Inspector store={store} />;
};
