import React from 'react';
import { Row, Col } from 'antd';

export const MarginPadding = ({ render }) => {
  return (
    <>
      <div className="style-group">
        <p>外边距</p>
        <Row gutter={8}>
          <Col span={12}>{render('marginTop')}</Col>
          <Col span={12}>{render('marginRight')}</Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>{render('marginBottom')}</Col>
          <Col span={12}>{render('marginLeft')}</Col>
        </Row>
      </div>
      <div className="style-group">
        <p>内边距</p>
        <Row gutter={8}>
          <Col span={12}>{render('paddingTop')}</Col>
          <Col span={12}>{render('paddingRight')}</Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>{render('paddingBottom')}</Col>
          <Col span={12}>{render('paddingLeft')}</Col>
        </Row>
      </div>
    </>
  );
};
