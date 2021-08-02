import React from 'react';
// import { CCol, CRow } from '@coreui/react';
// import moment from 'moment';
// import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// import checkedServices from '../../../common/redux/checked/services';

const CustomEvents = (event: any) => {
    const handleTime = (s: string) => {
        const arr = s.split(':');
        return +arr[0] * 3600 + +arr[1] * 60;
    };

    return (
        <div className="text-center">
            <div
                className={
                    !!event.title[0] && handleTime(event.title[0]) > handleTime('9:01')
                        ? 'badge badge-pill badge-danger mr-1'
                        : 'badge badge-pill badge-success mr-1'
                }
            >
                {event.title[0]}
            </div>
            <div
                className={
                    !!event.title[1] && handleTime(event.title[1]) < handleTime('18:00')
                        ? 'badge badge-pill badge-danger mr-1'
                        : 'badge badge-pill badge-success mr-1'
                }
            >
                {event.title[1]}
            </div>
        </div>
    );
};

export default CustomEvents;
