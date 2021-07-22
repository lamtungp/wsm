import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    // CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from '@coreui/react';

// sidebar nav config
import { SetSidebar } from '../../../common/redux/sidebar/actions';
import { GlobalState } from '../../../common/redux';
import navigation from '../_nav';

const SidebarAdmin: React.FunctionComponent = (): React.ReactElement => {
    const dispatch = useDispatch();
    const show = useSelector((state: GlobalState) => state.sidebar.sidebarShow);

    return (
        <CSidebar show={show} onShowChange={(val: any) => dispatch(SetSidebar(val))}>
            <CSidebarBrand className="d-md-down-none" to="/admin">
                WSM
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
        </CSidebar>
    );
};

export default React.memo(SidebarAdmin);
