import React, { useCallback } from 'react';
import { Tooltip } from 'antd';
import { Store } from '@/store';
import { plugins } from '@/plugins';
import { ButtonIcon } from '@/editor/icons/Button';
import { ContainerIcon } from '@/editor/icons/Container';
import { TableIcon } from '@/editor/icons/Table';
import { TextIcon } from '@/editor/icons/Text';
import { TextInputIcon } from '@/editor/icons/TextInput';
import { JSONSchemaFormIcon } from '@/editor/icons/JSONSchemaForm';
import styles from './index.module.scss';

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
                <div>{getIcon(component.componentInfo.icon)}</div>
                <div>
                  <p>{component.componentInfo.name}</p>
                  <p className="ellipsis">{component.componentInfo.description}</p>
                </div>
              </li>
            </Tooltip>
          );
        })}
      </ul>
    </div>
  );
};
