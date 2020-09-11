import React from 'react';
import { Row, Col } from 'antd';

export const Border = ({ render }) => {
  return (
    <div className="style-group">
      <p>边框</p>
      <Row gutter={8}>
        <Col span={24}>{render('borderWidth')}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{render('borderStyle')}</Col>
        <Col span={12}>{render('borderColor')}</Col>
      </Row>
    </div>
  );
};
