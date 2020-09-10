import React from 'react';
import { Table as ATable } from 'antd';
import { transformStyle } from '@/plugins/shared';

export const Table = ({
  store,
  runtimeName,
  indicator,
  style,
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

  return (
    <div
      className="component-indicator-wrapper"
      style={{
        background: '#fff',
        ...transformStyle(style),
      }}
    >
      {indicator}
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
      />
    </div>
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
  columns: {
    title: '列配置',
    type: 'json',
  },
  loading: {
    title: '加载中',
    type: 'text',
  },
};
