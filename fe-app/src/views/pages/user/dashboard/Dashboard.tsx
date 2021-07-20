import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';

import { GlobalState } from '../../../../common/redux/index';
import checkinServices from '../../../../common/redux/checkin/services';

import CustomToolbar from './Toolbar';
import CustomEvents from './Event';

const localizer = momentLocalizer(moment);

// const CustomHeader = () => (
//     <div>
//         <div>2</div>
//     </div>
// );

const Dashboard = () => {
    const checkin = useSelector((state: GlobalState) => state.checkin.checkins);
    // console.log(checkin);

    const [listcheckin, setListCheckin] = useState([]);
    const myEvent = [
        {
            start: moment().toDate(),
            end: checkin.length ? moment().add(0, 'days').toDate() : '',
            title: checkin,
        },
    ];

    React.useEffect(() => {
        getListCheckin();
    }, []);

    const getListCheckin = async () => {
        const list = await checkinServices.getListCheckin(Number(localStorage.getItem('userId')));
        setListCheckin(list);
    };

    listcheckin.map((item: any) => {
        myEvent.push({
            start: new Date(`${item.date} ${item.checkin}`),
            end: item.checkout ? new Date(`${item.date} ${item.checkout}`) : new Date(`${item.date} ${item.checkin}`),
            title: [item.checkin, item.checkout],
        });
    });

    return (
        <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <Calendar
                localizer={localizer}
                events={myEvent}
                startAccessor="start"
                // endAccessor="end"
                style={{ height: 700 }}
                views={{ month: true }}
                culture="ar-AE"
                components={{
                    toolbar: CustomToolbar,
                    event: CustomEvents,
                    // day: {
                    //     header: CustomHeader,
                    // },
                }}
            />
        </div>
    );
};

export default Dashboard;
