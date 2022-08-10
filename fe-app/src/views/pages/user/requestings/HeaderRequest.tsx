import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

export interface TabsProp {
  tabs: {
    eventKey: string;
    path: string;
    title: string;
  }[];
}

const HeaderRequest: React.FunctionComponent<TabsProp> = ({ tabs }): React.ReactElement => {
  const history = useHistory();
  const param = useParams();
  const option = String(Object.values(param)[0]);

  const handleSelect = (path: any) => {
    history.push(`/user/member/requests/${path}`);
  };

  return (
    <Tabs defaultActiveKey={option !== 'undefined' ? option : 'pending'} onSelect={(path) => handleSelect(path)}>
      {tabs.map((tab) => {
        return <Tab key={tab.title} eventKey={tab.eventKey} title={tab.title}></Tab>;
      })}
    </Tabs>
  );
};

export default HeaderRequest;
