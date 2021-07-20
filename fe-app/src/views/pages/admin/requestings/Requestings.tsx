import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import RequestsConfirmed from './RequestsConfirmed';
import RequestsDeclined from './RequestsDeclined';
import RequestsPending from './RequestsPending';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Tabs defaultActiveKey="pending">
            <Tab eventKey="pending" title="Đang chờ duyệt">
                <RequestsPending />
            </Tab>
            <Tab eventKey="confirmed" title="Đã đồng ý">
                <RequestsConfirmed />
            </Tab>
            <Tab eventKey="declined" title="Đã từ chối">
                <RequestsDeclined />
            </Tab>
        </Tabs>
    );
};

export default Requestings;
