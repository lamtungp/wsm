import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';

import { GlobalState } from '../../../common/redux/index';
import CheckedServices from '../../../common/redux/checked/services';

import CustomToolbar from './Toolbar';
import CustomEvents from './Event';

const localizer = momentLocalizer(moment);

// const CustomHeader = () => (
//     <div>
//         <div>2</div>
//     </div>
// );

const Dashboard = () => {
    const checked = useSelector((state: GlobalState) => state.checked.checkeds);
    // console.log(checked);

    const [listChecked, setListChecked] = useState([]);
    const myEvent = [
        {
            start: moment().toDate(),
            end: checked.length ? moment().add(0, 'days').toDate() : '',
            title: checked,
        },
    ];

    React.useEffect(() => {
        getListChecked();
    }, []);

    const getListChecked = async () => {
        const list = await CheckedServices.getListChecked(Number(localStorage.getItem('idAccount')));
        setListChecked(list);
    };
    listChecked.map((item: any) => {
        myEvent.push({
            start: new Date(item.checkin),
            end: item.checkout ? new Date(item.checkout) : new Date(item.checkin),
            title: [item.checkin.split(', ')[1], item.checkout.split(', ')[1]],
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
