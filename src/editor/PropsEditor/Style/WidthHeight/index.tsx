import React from 'react';
import { Row, Col } from 'antd';

export const WidthHeight = ({ render }) => {
  return (
    <div className="style-group">
      <p>宽高</p>
      <Row gutter={8}>
        <Col span={12}>{render('width')}</Col>
        <Col span={12}>{render('height')}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{render('maxWidth')}</Col>
        <Col span={12}>{render('maxHeight')}</Col>
      </Row>
    </div>
  );
};
