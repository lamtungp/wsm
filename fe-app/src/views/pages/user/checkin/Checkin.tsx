import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { GlobalState } from '../../../../common/redux/index';
import checkinServices from '../../../../common/redux/checkin/services';

import CustomToolbar from './Toolbar';
import CustomEvents from './Event';

const localizer = momentLocalizer(moment);

const Dashboard: React.FunctionComponent = (): React.ReactElement => {
  const checkin = useSelector((state: GlobalState) => state.checkin.checkins);
  const [listcheckin, setListCheckin] = useState([
    {
      date: '',
      checkin: '',
      checkout: '',
    },
  ]);

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
    setListCheckin(list.data);
  };

  if (listcheckin.length > 0) {
    listcheckin.map((item: any) => {
      myEvent.push({
        start: new Date(`${item.date} ${item.checkin}`),
        end: item.checkout ? new Date(`${item.date} ${item.checkout}`) : new Date(`${item.date} ${item.checkin}`),
        title: [item.checkin, item.checkout],
      });
    });
    if (
      myEvent.length > 1 &&
      myEvent[0].start.toLocaleDateString() == myEvent[myEvent.length - 1].start.toLocaleDateString() &&
      myEvent[0].title.length > 0
    ) {
      myEvent.pop();
    }
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard component" />
      </Helmet>
      <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
        <Calendar
          localizer={localizer}
          events={myEvent}
          startAccessor="start"
          endAccessor="end"
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
    </>
  );
};

export default Dashboard;
