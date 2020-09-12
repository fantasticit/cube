/* eslint-disable */
import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { Input, Select } from 'antd';

export const TextAddonEditor = ({ schema, value, onChange }) => {
  const { addons = [] } = schema;
  // const [value, setValue] = useState('');
  // const [addon, setAddon] = useState('');

  // useEffect(() => {
  //   const t = addons.filter((addon) => addon && defaultValue && defaultValue.indexOf(addon) > -1);
  //   const s = value + addon;

  //   if (isEqual(s, defaultValue) && (t.length ? t[0] === addon : true)) {
  //     return;
  //   }

  //   if (t.length) {
  //     setValue(defaultValue.replace(t[0], ''));
  //     setAddon(t[0]);
  //   } else {
  //     setValue(defaultValue);
  //   }
  // }, [defaultValue, addons]);

  // useEffect(() => {
  //   if (!value) {
  //     return;
  //   }

  //   const t = value + addon;

  //   if (isEqual(t, defaultValue)) {
  // //     return;
  //   }

  //   onChange(t);
  // }, [defaultValue, value, addon, onChange]);

  // const selectAfter = (
  //   <Select
  //     defaultValue={addons[0]}
  //     value={addon}
  //     onChange={(e) => setAddon(e)}
  //     style={{ minWidth: 60 }}
  //   >
  //     {addons.map((addon) => (
  //       <Select.Option key={addon} value={addon}>
  //         {addon}
  //       </Select.Option>
  //     ))}
  //   </Select>
  // );

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '文本'}
        <span>{schema.desc}</span>
      </p>
      <div>
        <Input
          // onFocus={() => setFocused(true)}
          // onBlur={() => setFocused(false)}
          // addonAfter={selectAfter}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            // setValue(value);
            onChange(value);
          }}
        ></Input>
      </div>
    </div>
  );
};
