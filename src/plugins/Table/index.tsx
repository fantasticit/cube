import React, { useMemo } from 'react';
import { Table as ATable } from 'antd';
import { transformStyle } from '@/plugins/shared';

export const Table = ({
  store,
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
        store.setValue(`${runtimeName}.selectedRows.data`, selectedRows);
        store.setValue(`${runtimeName}.selectedRows.length`, selectedRows.length);
        store.setValue(
          `${runtimeName}.selectedRow.data`,
          selectedRows.length > 0 ? record : Object.create(null)
        );
      },
    };
  }, [store, runtimeName]);

  return (
    <div style={transformStyle(style)}>
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
