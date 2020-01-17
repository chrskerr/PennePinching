
// Packages
import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

// App


const { Title, Text } = Typography;

const Success = ({ restart, ids }) => {
    console.log( ids )
    return (
        <Row align="middle" justify="center">
            <Col>
                <Title level={ 4 }>Success!</Title>
            </Col>
            <Col>
                <Text>Meals added!</Text>
            </Col>
            <Col>
                <Button onClick={ () => restart() } size="small" >Add another?</Button>
            </Col>
        </Row>
    )
}

export default Success