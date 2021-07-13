import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEvent = [
    {
        start: moment().toDate(),
        // end: moment().add(0, 'days').toDate(),
        // title: 'today',
    },
];
const Dashboard = () => {
    return (
        <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
            <Calendar
                localizer={localizer}
                events={myEvent}
                // startAccessor="start"
                // endAccessor="end"
                style={{ height: 700 }}
                culture="en-GB"
            />
        </div>
    );
};

export default Dashboard;
