import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CHeader,
    CToggler,
    // CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
} from '@coreui/react';

// routes config
import { SetSidebar } from '../../common/redux/sidebar/actions';
import { GlobalState } from '../../common/redux';

import { HeaderDropdown } from './index';

const Header: React.FunctionComponent = (): React.ReactElement => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state: GlobalState) => state.sidebar.sidebarShow);

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
        dispatch(SetSidebar(val));
    };
    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
        dispatch(SetSidebar(val));
    };

    // console.log(sidebarShow);

    return (
        <CHeader withSubheader>
            <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
            <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
            {/* <CHeaderBrand className="mx-auto d-lg-none" to="/"> */}
            {/* <CIcon name="logo" height="48" alt="Logo" /> */}
            {/* </CHeaderBrand> */}

            <CHeaderNav className="d-md-down-none mr-auto">
                <CHeaderNavItem className="px-3">
                    <input className="search" placeholder="Tìm kiếm..."></input>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <HeaderDropdown />
            </CHeaderNav>
        </CHeader>
    );
};

export default Header;
