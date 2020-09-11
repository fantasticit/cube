import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';

export const TextAddonEditor = ({ schema, value: defaultValue, onChange }) => {
  const { addons = [] } = schema;
  // const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [addon, setAddon] = useState('');

  useEffect(() => {
    if (!defaultValue) {
      return;
    }
    const t = addons.filter((addon) => addon && defaultValue.includes(addon));

    if (t.length) {
      setValue(defaultValue.replace(t[0], ''));
      setAddon(t[0]);
    } else {
      setValue(defaultValue);
    }
  }, [defaultValue, addons]);

  useEffect(() => {
    if (!value) {
      return;
    }
    onChange(value + addon);
  }, [value, addon, onChange]);

  const selectAfter = (
    <Select defaultValue={addons[0]} value={addon} onChange={(e) => setAddon(e)}>
      {addons.map((addon) => (
        <Select.Option key={addon} value={addon}>
          {addon}
        </Select.Option>
      ))}
    </Select>
  );

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
          addonAfter={selectAfter}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);
          }}
        ></Input>
      </div>
    </div>
  );
};
