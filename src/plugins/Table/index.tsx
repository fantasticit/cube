import React, { useMemo } from 'react';
import { Table as ATable } from 'antd';
import cls from 'classnames';

export const Table = ({
  store,
  path,
  activePath,
  isActivePath,
  indicator,
  runtimeName,
  style,
  rowKey,
  data,
  loading = false,
  columns: defaultColumns,
}) => {
  const columns = defaultColumns.length
    ? defaultColumns.map((key) => {
        return typeof key === 'object'
          ? key
          : {
              title: key,
              dataIndex: key,
              key: key,
            };
      })
    : data &&
      data[0] &&
      Object.keys(data[0])
        .filter((key) => typeof data[0][key] !== 'object')
        .map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));

  const rowSelection = useMemo(() => {
    return {
      onSelect: (record, _, selectedRows) => {
        store.runtimeStore.setValue(`${runtimeName}.selectedRows.data`, selectedRows);
        store.runtimeStore.setValue(`${runtimeName}.selectedRows.length`, selectedRows.length);
        store.runtimeStore.setValue(
          `${runtimeName}.selectedRow.data`,
          selectedRows.length > 0 ? record : Object.create(null)
        );
      },
    };
  }, [store, runtimeName]);

  return (
    <div
      style={style}
      className={cls({
        'component-indicator-wrapper': true,
        'active': isActivePath,
      })}
      data-path={path}
      data-active-path={activePath}
    >
      {indicator}
      <ATable
        loading={loading}
        rowKey={rowKey || (columns && columns[0] && columns[0].key)}
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        rowSelection={rowSelection}
      />
    </div>
  );
};

Table.componentInfo = {
  name: 'Table',
  title: '表格',
  description: '分页展示表格数据',
  icon: 'TableIcon',
};

Table.defaultProps = {
  rowKey: '',
  data: [],
  columns: [],
  loading: false,
};

Table.schema = {
  rowKey: {
    title: 'RowKey',
    type: 'text',
  },
  data: {
    title: '数据',
    type: 'text',
  },
  columns: {
    title: '列配置',
    type: 'json',
  },
  loading: {
    title: '加载中',
    type: 'text',
  },
};
