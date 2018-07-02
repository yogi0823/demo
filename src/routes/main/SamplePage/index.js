import React from "react";
import {Button, Card, Col, Row} from "antd";

const SamplePage = () => {
  return (
    <Row>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Card>
          <h1 className="gx-mb-5">Simple Page</h1>
          <p> this is demo </p>
          <Button type="primary">Click me !!!</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default SamplePage;
