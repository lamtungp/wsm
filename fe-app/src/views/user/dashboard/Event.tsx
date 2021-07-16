import React from 'react';
// import { CCol, CRow } from '@coreui/react';
// import moment from 'moment';
// import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// import checkedServices from '../../../common/redux/checked/services';

const CustomEvents = (event: any) => {
    console.log(event.title);
    return (
        <div className="text-center">
            {event.title.map((item: any, index: any) => {
                return (
                    <div
                        className={
                            item >= '09:01:00' && item < '18:00:00'
                                ? 'badge badge-pill badge-danger mr-1'
                                : 'badge badge-pill badge-success mr-1'
                        }
                        key={index}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default CustomEvents;
