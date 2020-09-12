import React from 'react';
import { Row, Col } from 'antd';

export const Font = ({ render }) => {
  return (
    <div className="style-group">
      <p>字体</p>
      <Row>
        <Col span={24}>{render('fontFamily')}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{render('fontSize')}</Col>
        <Col span={12}>{render('fontWeight')}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{render('letterSpace')}</Col>
        <Col span={12}>{render('lineHeight')}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>{render('textAlign')}</Col>
        <Col span={12}>{render('color')}</Col>
      </Row>
    </div>
  );
};
