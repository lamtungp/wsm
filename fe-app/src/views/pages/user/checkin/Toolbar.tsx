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

    // const d = new Date();
    // console.log(d.toLocaleTimeString());

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
    const handleTime = (time: string) => {
        return dayjs(time).format('H:mm');
    };

    const userId = Number(localStorage.getItem('userId'));
    const date = handleDate(new Date().toUTCString());
    // console.log(date);

    React.useEffect(() => {
        const getCheckin = async () => {
            const res = await checkinServices.getCheckinByUserId(userId, date);
            if (res.message) {
                if (!!res.checkin && !!!res.checkout) {
                    setShow(false);
                } else {
                    setShow(true);
                }
            } else {
                setShow(true);
            }
        };
        getCheckin();
    }, []);

    // const d = dayjs(new Date().toUTCString()).format('YYYY-MM-DD H:mm');

    const handleCheckin = async (values: object, type: string) => {
        // console.log(values);
        const check = await checkinServices.updateCheckin(values, userId, date);
        if (!!!check.message) {
            dispatch(SetCheckin(handleTime(new Date().toUTCString())));
            if (type === 'checkin') {
                setShow(false);
            } else {
                setShow(true);
            }
        } else {
            if (type === 'checkin') {
                setShow(true);
                window.alert('Bạn đã checkin rồi');
            } else {
                setShow(false);
            }
        }
    };

    const handleClick = (values: object, type: string) => {
        if (type === 'checkout') {
            if (window.confirm('Bạn muốn check-out ngay bây giờ?')) {
                handleCheckin(values, type);
            }
        } else {
            handleCheckin(values, type);
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
                        <button
                            className={show ? 'btn btn-primary mr-1' : 'd-none'}
                            onClick={() =>
                                handleClick(
                                    {
                                        checkin: handleTime(new Date().toUTCString()),
                                        date: date,
                                        userId: localStorage.getItem('userId'),
                                    },
                                    'checkin',
                                )
                            }
                            style={{ borderRadius: '4px' }}
                        >
                            <FaSignInAlt className="mr-1" />
                            <span>Checkin</span>
                        </button>
                        <button
                            className={!show ? 'btn btn-primary mr-1' : 'd-none'}
                            onClick={() =>
                                handleClick(
                                    {
                                        checkout: handleTime(new Date().toUTCString()),
                                    },
                                    'checkout',
                                )
                            }
                            style={{ borderRadius: '4px' }}
                        >
                            <FaSignOutAlt className="mr-1" />
                            <span>Checkout</span>
                        </button>
                        <button className="btn btn-primary mr-1" style={{ borderRadius: '4px' }} onClick={goToCurrent}>
                            Hôm nay
                        </button>
                        <button
                            className="btn btn-primary mr-1"
                            style={{ borderRadius: '4px 0 0 4px' }}
                            onClick={goToBack}
                        >
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
