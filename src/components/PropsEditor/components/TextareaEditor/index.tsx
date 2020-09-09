import React from 'react';
import { Input } from 'antd';
import style from './index.module.scss';

export const TextareaEditor = ({ schema, value, onChange }) => {
  const { placeholder } = schema;

  return (
    <div className={style.wrapper}>
      <p>
        {schema.title || '文本'}
        <span className={style.desc}>{schema.desc}</span>
      </p>
      <div>
        <Input.TextArea
          placeholder={placeholder}
          value={value}
          rows={6}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
