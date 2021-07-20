import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import { useHistory } from 'react-router-dom';

import userService from '../../common/redux/user/services';

const HeaderDropdown: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();

    const [user, setUser] = React.useState({
        avatar: '',
        name: '',
        email: '',
    });

    React.useEffect(() => {
        getUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('vacationDay');
        history.push('/');
    };

    const getUser = async () => {
        const user = await userService.getUserById(Number(localStorage.getItem('userId')));
        setUser(user);
    };

    return (
        <CDropdown inNav className="c-header-nav-items mx-2">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg
                        src={user.avatar ? `/avatars/${user.avatar}` : '/avatars/no-avatar.jpg'}
                        className="c-avatar-img"
                        alt={user.email}
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="p-0" placement="bottom-end" style={{ width: '18rem' }}>
                <CDropdownItem
                    header
                    tag="div"
                    className="px-3 py-4"
                    style={{ background: 'linear-gradient(250deg, #3e93d6, #8a75aa)', height: '6rem' }}
                >
                    <div className="d-flex h-100 align-items-center">
                        <div className="c-avatar">
                            <CImg
                                src={user.avatar ? `/avatars/${user.avatar}` : '/avatars/no-avatar.jpg'}
                                className="c-avatar-img"
                                alt={user.email}
                            />
                        </div>
                        <span className="ml-3">
                            <div className="fs-lg font-weight-bold text-white">{user.name}</div>
                            <div className="text-light">{user.email}</div>
                        </span>
                    </div>
                </CDropdownItem>
                <CDropdownItem onClick={() => history.push('/admin/profile')}>Thông tin cá nhân</CDropdownItem>
                <CDropdownItem>Danh sách yêu cầu</CDropdownItem>
                <CDropdownItem className="m-0" divider />
                <CDropdownItem onClick={() => logOut()}>Đăng xuất</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default HeaderDropdown;
