import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import RequestsPending from './RequestsPending';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Tabs defaultActiveKey="pending" id="uncontrolled-tab">
            <Tab eventKey="pending" title="Đang chờ duyệt">
                <RequestsPending />
            </Tab>
            <Tab eventKey="confirmed" title="Đã xác nhận"></Tab>
            <Tab eventKey="declined" title="Đã từ chối"></Tab>
        </Tabs>
    );
};

export default Requestings;
