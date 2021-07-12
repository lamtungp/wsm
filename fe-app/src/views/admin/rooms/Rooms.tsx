import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow } from '@coreui/react';

import userService from '../../../common/redux/user/services';

const fields = [
    'id',
    'username',
    'email',
    'password',
    {
        key: 'show_details',
        label: '',
        _style: { width: '10%', height: '100%' },
        sorter: false,
        filter: false,
    },
];

const Rooms = () => {
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
                        <CButton
                            className="btn btn-primary"
                            style={{ float: 'right', width: '10rem' }}
                            onClick={() => {
                                history.push('/base/users/add-user');
                            }}
                        >
                            Add
                        </CButton>
                        <CCardBody>
                            <CDataTable
                                items={listUser}
                                hover
                                striped
                                border
                                size="sm"
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
                                                            history.push(`/base/users/update-user/${item.id}`);
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

export default Rooms;
