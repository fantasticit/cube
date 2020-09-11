import React, { useState, useMemo } from 'react';
import { Tooltip } from 'antd';
import { PartitionOutlined, AppstoreOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Store } from '@/store';
import cls from 'classnames';
import { Components } from './Components';
import { Apis } from './Apis';
import { TreeView } from './TreeView';
import styles from './index.module.scss';

interface IProps {
  store: Store;
}

const menus = [
  {
    label: <PartitionOutlined />,
    tooltip: '组件树',
    value: 0,
  },
  {
    label: <AppstoreOutlined />,
    tooltip: '组件库',
    value: 1,
  },
  {
    label: <ShareAltOutlined />,
    tooltip: '接口服务',
    value: 2,
  },
];

export const LeftPannel: React.FC<IProps> = ({ store }) => {
  const [active, setActive] = useState(menus[0].value);

  const activePannel = useMemo(() => {
    switch (active) {
      case menus[0].value:
        return <TreeView store={store} />;
      case menus[1].value:
        return <Components store={store} />;
      default:
        return <Apis store={store} />;
    }
  }, [active, store]);

  return (
    <div className={styles.wrapper}>
      <aside>
        <ul>
          {menus.map((menu) => {
            return (
              <Tooltip key={menu.value} title={menu.tooltip} placement="right">
                <li
                  onClick={() => setActive(menu.value)}
                  className={cls({ [styles.active]: active === menu.value })}
                >
                  {menu.label}
                </li>
              </Tooltip>
            );
          })}
        </ul>
      </aside>
      <main>
        <header>{menus[active].tooltip}</header>
        <div>{activePannel}</div>
      </main>
    </div>
  );
};
