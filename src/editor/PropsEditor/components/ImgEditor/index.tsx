import React from 'react';
import { Input } from 'antd';
import style from './index.module.scss';

export const ImgEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '图片'}
        <span>
          建议尺寸
          {width}*{height}
        </span>
        <span>{schema.desc}</span>
      </p>
      {value ? (
        <div className={style.imgWrapper}>
          <img src={value} />
          <span>{value}</span>
        </div>
      ) : null}
      <div>
        <Input value={value} onChange={(e) => onChange(e.target.value)}></Input>
      </div>
    </div>
  );
};
