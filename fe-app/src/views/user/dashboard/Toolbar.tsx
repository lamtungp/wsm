import React from 'react';
import { CCol, CRow } from '@coreui/react';
import moment from 'moment';
import { FaSignInAlt, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomToolbar = (toolbar: any) => {
    const [checkin, setCheckin] = React.useState(true);
    const [checkout, setCheckout] = React.useState(false);
    const [values, setValues] = React.useState({});

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

    return (
        <div className="rbc-toolbar-container py-2">
            <CRow>
                <CCol lg="8">
                    <label className="rbc-toolbar-label">{label()}</label>
                </CCol>
                <CCol lg="4">
                    <div className="rbc-btn-group float-right">
                        <button
                            className={checkin ? 'btn btn-primary mr-1' : 'd-none'}
                            onClick={() => {
                                setCheckin(false), setCheckout(true);
                            }}
                            style={{ borderRadius: '4px' }}
                        >
                            <FaSignInAlt className="mr-1" />
                            <span>Checkin</span>
                        </button>
                        <button
                            className={checkout ? 'btn btn-primary mr-1' : 'd-none'}
                            onClick={() => {
                                setCheckin(true), setCheckout(false);
                            }}
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
