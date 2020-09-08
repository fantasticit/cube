import React from 'react';
import { Table as ATable } from 'antd';

export const Table = ({ data, loading = false, columns: defaultColumns, store, runtimeName }) => {
  const columns = defaultColumns.length
    ? defaultColumns
    : data &&
      data[0] &&
      Object.keys(data[0])
        .filter((key) => typeof data[0][key] !== 'object')
        .map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));

  return (
    <ATable
      loading={loading}
      rowKey={columns && columns[0] && columns[0].key}
      dataSource={Array.isArray(data) ? data : []}
      columns={columns}
      rowSelection={{
        onSelect: (record) => {
          store.setValue(`${runtimeName}.selectedRow.data`, record);
        },
      }}
      // scroll={{ x: '100%', y: 300 }}
    />
  );
};

Table.componentInfo = {
  name: 'Table',
};

Table.defaultProps = {
  data: [],
  columns: [],
  loading: false,
};

Table.schema = {
  data: {
    title: '数据',
    type: 'text',
  },
  loading: {
    title: '加载中',
    type: 'text',
  },
};
