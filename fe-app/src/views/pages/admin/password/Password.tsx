import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import userService from '../../../../common/redux/user/services';

const fields = [
    {
        key: 'id',
        label: 'Id',
    },
    {
        key: 'name',
        label: 'Họ tên',
    },
    {
        key: 'email',
        label: 'Email',
        sorter: false,
    },
    {
        key: 'password',
        label: 'Mật khẩu',
        sorter: false,
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false,
    },
];

const Users = () => {
    const history = useHistory();
    const [listUser, setListUser] = useState([{ id: '', name: '', email: '', password: '' }]);

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await userService.getAllUser();
        console.log(res);
        setListUser(res);
    };

    return (
        <div>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ fontSize: '13px', lineHeight: '1.57' }}
                            >
                                Thông tin tài khoản
                            </h2>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={listUser}
                                hover
                                striped
                                border
                                size="md"
                                fields={fields}
                                itemsPerPage={5}
                                tableFilter
                                sorter
                                pagination
                                scopedSlots={{
                                    // eslint-disable-next-line react/display-name
                                    show_details: (item: any) => {
                                        return (
                                            <td>
                                                <div className="d-flex">
                                                    <CButton
                                                        className="mr-2"
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => {
                                                            history.push(`/admin/resetpassword/${item.id}`);
                                                        }}
                                                    >
                                                        Đổi mật khẩu
                                                    </CButton>
                                                </div>
                                            </td>
                                        );
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default Users;
