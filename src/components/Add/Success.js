
// Packages
import React from 'react';
import { Row, Button, Result } from 'antd';
import { useService } from '@xstate/react';

// App

const Success = ({ restart, ids, addService, homeService }) => {
    const [ , addSend ] = useService( addService );
    const [ , homeSend ] = useService( homeService );
    return (
        <Row align="middle">
            <Result
                status="success"
                title="Successfully Added!"
                extra={[
                    <Button type="primary" key="console" onClick={ () => homeSend( "ANALYTICS" ) } >
                        Go Analytics
                    </Button>,
                    <Button key="buy" onClick={ () => addSend( 'RESTART' ) } >Add more</Button>,
                ]}
            />
        </Row>
    )
}

export default Success