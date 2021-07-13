import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Tabs defaultActiveKey="pending" id="uncontrolled-tab">
            <Tab eventKey="pending" title="Đang chờ duyệt"></Tab>
            <Tab eventKey="confirmed" title="Đã xác nhận"></Tab>
            <Tab eventKey="approved" title="Đã chấp nhận"></Tab>
            <Tab eventKey="declined" title="Đã từ chối"></Tab>
            <Tab eventKey="canceled" title="Đã hủy"></Tab>
        </Tabs>
    );
};

export default Requestings;
