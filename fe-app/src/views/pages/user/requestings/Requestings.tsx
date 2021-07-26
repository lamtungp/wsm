import React from 'react';

import RequestingDetails from './RequestingDetails';

const Requestings: React.FunctionComponent = (): React.ReactElement => {
    return localStorage.getItem('role') === 'manager' ? <RequestingDetails /> : <></>;
};

export default Requestings;
