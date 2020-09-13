import React, { useCallback } from 'react';
import { Tree } from 'antd';
import { DownOutlined, CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';
import { observer } from 'mobx-react';
import { Store } from '@/store';
import styles from './index.module.scss';

interface IProps {
  store: Store;
}

const transformData2Leaf = (data, idx, path = '', store: Store) => {
  /* eslint-disable no-param-reassign */
  path = String(path || idx);
  const hidden = store.componentStore.isComponentHidden(data.props);

  const title = (
    <div className={styles.leafWrapper}>
      <span>{data.name}</span>
      <span>
        <span
          onClick={(evt) => {
            evt.stopPropagation();
            store.componentStore.toggleComponentHidden(path);
          }}
        >
          {hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
        <span
          onClick={(evt) => {
            evt.stopPropagation();
            store.componentStore.deleteComponent(path);
          }}
        >
          <CloseOutlined />
        </span>
      </span>
    </div>
  );

  return data.props.children && Array.isArray(data.props.children)
    ? {
        ...data,
        title,
        key: path,
        children: data.props.children.map((data, idx) =>
          transformData2Leaf(data, idx, `${path}.props.children.${idx}`, store)
        ),
      }
    : { ...data, title, key: path };
};

const transformLeaf2Data = (leaf) => {
  const ret =
    leaf.children && Array.isArray(leaf.children)
      ? {
          ...leaf,
          props: {
            ...leaf.props,
            children: leaf.children.map(transformLeaf2Data),
          },
        }
      : leaf;
  delete ret.children;
  delete ret.title;
  delete ret.key;
  return ret;
};

export const TreeView: React.FC<IProps> = observer(({ store }) => {
  const components = store.components;
  const active = store.componentStore.selectedComponentInfo.path;
  const treeData = components
    .filter(Boolean)
    .map((data, idx) => transformData2Leaf(data, idx, '', store));

  const onSelect = useCallback(
    (_, { node }) => {
      /* eslint-disable no-param-reassign */
      const path = node.pos
        .split('-')
        .slice(1)
        .reduce((a, c, idx) => {
          if (idx > 0) {
            a += '.props.children.';
          }
          a += c;
          return a;
        }, '');
      store.componentStore.selectComponent(path);
    },
    [store]
  );

  const onDrop = useCallback(
    (info) => {
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

      /* eslint-disable consistent-return */
      const loop = (data, key, callback) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children, key, callback);
          }
        }
      };
      const data = cloneDeep(treeData);
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          item.children.push(dragObj);
        });
      } else if (
        (info.node.props.children || []).length > 0 &&
        info.node.props.expanded &&
        dropPosition === 1
      ) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }

      store.componentStore.components = data.filter(Boolean).map(transformLeaf2Data);
    },
    [store, treeData]
  );

  return (
    <div className={styles.wrapper}>
      <Tree
        defaultExpandAll={true}
        showLine={{ showLeafIcon: false }}
        switcherIcon={<DownOutlined />}
        draggable={true}
        blockNode={true}
        onDrop={onDrop}
        onSelect={onSelect}
        treeData={treeData}
        selectedKeys={[active]}
      />
    </div>
  );
});
