import React from 'react';
import { CCol, CRow } from '@coreui/react';
import moment from 'moment';
import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import checkinServices from '../../../../common/redux/checkin/services';
import { SetCheckin } from '../../../../common/redux/checkin/actions';

dayjs.extend(customParseFormat);

const CustomToolbar = (toolbar: any) => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(true);

  const dateCheck = localStorage.getItem('date');

  React.useEffect(() => {
    if (dateCheck && dateCheck !== new Date().toLocaleDateString()) {
      setShow(true);
    }
  }, []);

  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <h1>
        <span className="mr-1">{date.format('YYYY')}</span>
        <span>{date.format('MMMM')}</span>
      </h1>
    );
  };

  const handleDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const userId = Number(localStorage.getItem('userId'));
  const date = handleDate(new Date().toUTCString());
  const nowDay = new Date().getDay();

  React.useEffect(() => {
    getCheckin();
  }, []);

  const getCheckin = async () => {
    const res = await checkinServices.getCheckinByUserId(userId, date);
    if (!!!res.data.message) {
      if (!!res.data.checkin && !!!res.data.checkout) {
        setShow(false);
      } else {
        setShow(true);
      }
    } else {
      setShow(true);
    }
  };

  const handleCheckin = async (type: string) => {
    const check = await checkinServices.createCheckin();
    if (!!!check.data.error) {
      try {
        const checkin = await checkinServices.getCheckinByUserId(Number(localStorage.getItem('userId')), date);
        dispatch(SetCheckin([checkin.data.checkin, checkin.data.checkout]));
        if (type === 'checkin') {
          localStorage.setItem('date', new Date().toLocaleDateString());
          setShow(false);
        } else {
          setShow(true);
        }
      } catch (error) {
        window.alert('X???y ra l???i khi checkin');
      }
    } else {
      if (type === 'checkin') {
        setShow(true);
        window.alert('Ba??n ??a?? checkin r????i');
      } else {
        setShow(false);
      }
    }
  };

  const handleClick = (type: string) => {
    if (type === 'checkout') {
      if (window.confirm('Ba??n mu????n check-out ngay b??y gi?????')) {
        handleCheckin(type);
      }
    } else {
      handleCheckin(type);
    }
  };

  return (
    <div className="rbc-toolbar-container py-2">
      <CRow>
        <CCol lg="8">
          <label className="rbc-toolbar-label">{label()}</label>
        </CCol>
        <CCol lg="4">
          <div className="rbc-btn-group float-right">
            {nowDay !== 0 && nowDay !== 6 ? (
              <>
                <button
                  className={show ? 'btn btn-primary mr-1' : 'd-none'}
                  onClick={() => handleClick('checkin')}
                  style={{ borderRadius: '4px' }}
                >
                  <FaSignInAlt className="mr-1" />
                  <span>Checkin</span>
                </button>
                <button
                  className={!show ? 'btn btn-primary mr-1' : 'd-none'}
                  onClick={() => handleClick('checkout')}
                  style={{ borderRadius: '4px' }}
                >
                  <FaSignOutAlt className="mr-1" />
                  <span>Checkout</span>
                </button>
              </>
            ) : (
              <></>
            )}
            <button className="btn btn-primary mr-1" style={{ borderRadius: '4px' }} onClick={goToCurrent}>
              H??m nay
            </button>
            <button className="btn btn-primary mr-1" style={{ borderRadius: '4px 0 0 4px' }} onClick={goToBack}>
              <FaChevronLeft />
            </button>
            <button className="btn btn-primary" onClick={goToNext}>
              <FaChevronRight />
            </button>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default CustomToolbar;
