import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                abc
            </Tab>
            <Tab eventKey="profile" title="Profile">
                abc
            </Tab>
            <Tab eventKey="contact" title="Contact"></Tab>
        </Tabs>
    );
};

export default Requestings;
