import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';

import RequestsConfirmed from './RequestsConfirmed';

export interface TabsProp {
    tabs: {
        path: string;
        title: string;
    }[];
}

const HeaderRequest: React.FunctionComponent<TabsProp> = ({ tabs }): React.ReactElement => {
    const history = useHistory();
    // const match = useRouteMatch();

    // const select = (path: string) => {
    //     history.push(path);
    // };

    return (
        // <Tabs defaultActiveKey={path} onSelect={() => history.push(path)}>
        //     {tabs.map((tab) => {
        //         return (
        //             <Tab key={tab.title} eventKey={path} title={tab.title}>
        //                 {tab.title}
        //             </Tab>
        //         );
        //     })}
        // </Tabs>
        <Tabs defaultActiveKey="pending">
            <Tab eventKey="pending" title="Đang chờ duyệt">
                <RequestsConfirmed />
            </Tab>
            <Tab eventKey="confirmed" title="Đã đồng ý">
                <RequestsConfirmed />
            </Tab>
            <Tab eventKey="declined" title="Đã từ chối">
                <RequestsConfirmed />
            </Tab>
        </Tabs>
    );
};

export default HeaderRequest;
