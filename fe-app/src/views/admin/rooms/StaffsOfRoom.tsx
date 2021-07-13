import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import userService from '../../../common/redux/user/services';

const fields = [
    {
        key: 'id',
        label: 'id',
    },
    {
        key: 'name',
        label: 'name',
        sorter: false,
    },
    {
        key: 'email',
        label: 'email',
        sorter: false,
    },
    {
        key: 'password',
        label: 'password',
        sorter: false,
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '10%', height: '100%' },
        sorter: false,
        filter: false,
    },
    {
        key: 'edit',
        label: '',
        _style: { width: '12%', height: '100%' },
        sorter: false,
        filter: false,
    },
];

const StaffsOfRoom = () => {
    const history = useHistory();
    const [listUser, setListUser] = useState([{ id: '', email: '', password: '' }]);

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await userService.getList();
        console.log(res);
        setListUser(res);
    };

    const deleteUser = async (id: number) => {
        await userService.deleteUser(id);
        getListTodo();
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
                                Thông tin nhân viên
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
                                    edit: (item: any) => {
                                        return (
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <CButton
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => {
                                                            history.push(`/admin/staff-rooms/${item.id}`);
                                                        }}
                                                    >
                                                        Xem nhân viên
                                                    </CButton>
                                                </div>
                                            </td>
                                        );
                                    },
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
                                                            history.push(`/admin/rooms/update-room/${item.id}`);
                                                        }}
                                                    >
                                                        Update
                                                    </CButton>
                                                    <CButton
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => {
                                                            deleteUser(item.id);
                                                        }}
                                                    >
                                                        Delete
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

export default StaffsOfRoom;
