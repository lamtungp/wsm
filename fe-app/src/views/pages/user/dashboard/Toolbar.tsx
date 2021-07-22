import React from 'react';
import { CCol, CRow } from '@coreui/react';
import moment from 'moment';
import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import checkinServices from '../../../../common/redux/checkin/services';
import { SetCheckin } from '../../../../common/redux/checkin/actions';

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

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <h1>
                <span className="mr-1">{date.format('YYYY')}</span>
                <span>{date.format('MMMM')}</span>
            </h1>
        );
    };

    React.useEffect(() => {
        // if (!localStorage.getItem('isCheckout')) setShow(false);
        const getCheckin = async () => {
            const userId = Number(localStorage.getItem('userId'));
            const date = handleDate(new Date().toLocaleDateString());
            try {
                const res = await checkinServices.getCheckinByUserId(userId, date);
                if (!!res.checkin && !!!res.checkout) setShow(false);
                else setShow(true);
                console.log(res);
            } catch (error) {
                setShow(true);
            }
        };
        getCheckin();
    }, []);

    const handleDate = (date: string) => {
        const arrDate = date.split('/');
        const arrDateReverse = arrDate.reverse();
        const str = arrDateReverse.join('/');
        return str;
    };

    const handleCheckin = async (values: object) => {
        console.log(values);
        const userId = Number(localStorage.getItem('userId'));
        const date = handleDate(new Date().toLocaleDateString());
        try {
            await checkinServices.updateCheckin(values, userId, date);
            dispatch(SetCheckin(new Date().toLocaleTimeString()));
            setShow(false);
        } catch (error) {
            setShow(true);
            window.alert('Bạn đã checkin rồi');
        }
    };

    const handleCheckout = async (values: object) => {
        console.log(values);
        const userId = Number(localStorage.getItem('userId'));
        const date = handleDate(new Date().toLocaleDateString());
        try {
            await checkinServices.updateCheckin(values, userId, date);
            dispatch(SetCheckin(new Date().toLocaleTimeString()));
            setShow(true);
        } catch (error) {
            setShow(false);
            window.alert('Bạn đã checkin rồi');
        }
    };

    const handleClickCheckin = () => {
        handleCheckin({
            checkin: new Date().toLocaleTimeString(),
            date: handleDate(new Date().toLocaleDateString()),
            userId: localStorage.getItem('userId'),
        });
    };

    const handleClickCheckout = () => {
        if (window.confirm('Bạn muốn check-out ngay bây giờ?')) {
            handleCheckout({ checkout: handleDate(new Date().toLocaleTimeString()) });
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
                            onClick={handleClickCheckin}
                            style={{ borderRadius: '4px' }}
                        >
                            <FaSignInAlt className="mr-1" />
                            <span>Checkin</span>
                        </button>
                        <button
                            className={!show ? 'btn btn-primary mr-1' : 'd-none'}
                            onClick={handleClickCheckout}
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
