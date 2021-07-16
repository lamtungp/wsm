import React from 'react';
import { CCol, CRow } from '@coreui/react';
import moment from 'moment';
import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import checkedServices from '../../../common/redux/checked/services';
import { SetChecked } from '../../../common/redux/checked/actions';

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

    const handleData = async (values: object) => {
        console.log(values);
        await checkedServices.updateChecked(values);
    };

    const handleDate = (input: string) => {
        const arr = input.split(', ');
        const arrDate = arr[1].split('/');
        arr.pop();
        const arrDateReverse = arrDate.reverse();
        arr.push(arrDateReverse.join('/'));
        const str = arr.reverse().join(', ');
        console.log(str);
        return str;
    };
    React.useEffect(() => {
        if (!localStorage.getItem('isCheckout')) setShow(false);
    }, []);

    const handleClickCheckin = () => {
        if (localStorage.getItem('dayChecked') !== String(new Date().toLocaleString()).split(', ')[1]) {
            localStorage.removeItem('daychecked');
            localStorage.removeItem('isCheckout');
        }
        if (
            !localStorage.getItem('dayChecked') &&
            localStorage.getItem('dayChecked') !== String(new Date().toLocaleString()).split(', ')[1]
        ) {
            const dayCheckin = String(new Date().toLocaleString());
            dispatch(SetChecked(dayCheckin.split(', ')[0]));
            setShow(false);
            localStorage.setItem('dayChecked', String(new Date().toLocaleString()).split(', ')[1]);
            handleData({
                checkin: handleDate(dayCheckin),
                month: new Date().getMonth() + 1,
                day: dayCheckin.split(', ')[1],
                userID: localStorage.getItem('idAccount'),
            });
        } else {
            window.alert('Bạn đã checkin/checkout hôm nay rồi!');
        }
    };

    const handleClickCheckout = () => {
        if (window.confirm('Bạn muốn check-out ngay bây giờ?')) {
            const dayCheckout = String(new Date().toLocaleString());
            setShow(true);
            localStorage.setItem('isCheckout', 'true');
            dispatch(SetChecked(dayCheckout.split(', ')[0]));
            handleData({ checkout: handleDate(dayCheckout) });
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
