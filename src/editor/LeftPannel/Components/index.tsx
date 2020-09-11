import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import { Store } from '@/store';
import { plugins } from '@/plugins';
import styles from './index.module.scss';

import { ButtonIcon } from '@/icons/Button';
import { ContainerIcon } from '@/icons/Container';
import { TableIcon } from '@/icons/Table';
import { TextIcon } from '@/icons/Text';
import { TextInputIcon } from '@/icons/TextInput';
import { JSONSchemaFormIcon } from '@/icons/JSONSchemaForm';

interface IProps {
  store: Store;
}

const getIcon = (icon) => {
  switch (icon.toLowerCase()) {
    case 'buttonicon':
      return <ButtonIcon />;

    case 'containericon':
      return <ContainerIcon />;

    case 'tableicon':
      return <TableIcon />;

    case 'texticon':
      return <TextIcon />;

    case 'textinputicon':
      return <TextInputIcon />;

    case 'jsonschemaformicon':
    default:
      return <JSONSchemaFormIcon />;
  }
};

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
            <Tooltip
              key={component.componentInfo.name}
              title={component.componentInfo.description}
              placement="right"
            >
              <li
                key={component.componentInfo.name}
                draggable={true}
                onDragStart={onDragStart}
                data-id={component.componentInfo.name}
              >
                <span style={{ marginLeft: 4 }}>{getIcon(component.componentInfo.icon)}</span>
                <span>{component.componentInfo.name}</span>
              </li>
            </Tooltip>
          );
        })}
      </ul>
    </div>
  );
};
