import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import RequestsConfirmed from './RequestsConfirmed';
import RequestsDeclined from './RequestsDeclined';
import RequestsPending from './RequestsPending';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Tabs defaultActiveKey="pending">
            <Tab eventKey="pending" title="Đang chờ duyệt">
                {localStorage.getItem('role') === 'manager' ? <RequestsPending /> : <></>}
            </Tab>
            <Tab eventKey="confirmed" title="Đã đồng ý">
                {localStorage.getItem('role') === 'manager' ? <RequestsConfirmed /> : <></>}
            </Tab>
            <Tab eventKey="declined" title="Đã từ chối">
                {localStorage.getItem('role') === 'manager' ? <RequestsDeclined /> : <></>}
            </Tab>
        </Tabs>
    );
};

export default Requestings;
