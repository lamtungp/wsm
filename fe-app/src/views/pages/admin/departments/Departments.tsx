import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import departmentService from '../../../../common/redux/department/services';

const fields = [
    {
        key: 'id',
        label: 'Id',
    },
    {
        key: 'nameDepartment',
        label: 'Tên phòng',
    },
    {
        key: 'description',
        label: 'Mô tả',
        sorter: false,
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '15%', height: '100%' },
        sorter: false,
        filter: false,
    },
    {
        key: 'edit',
        label: '',
        _style: { width: '15%', height: '100%' },
        sorter: false,
        filter: false,
    },
];

const Rooms = () => {
    const history = useHistory();
    const [listdepartment, setListdepartment] = useState([{ id: '', nameDepartment: '', description: '' }]);

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await departmentService.getList();
        console.log(res);
        setListdepartment(res);
    };

    const deletedepartment = async (id: number) => {
        await departmentService.deleteDepartment(id);
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
                                Thông tin các phòng
                            </h2>
                        </CCardHeader>
                        <CCardHeader style={{ border: 'none' }}>
                            <CButton
                                className="btn-primary"
                                onClick={() => {
                                    history.push('/admin/departments/add-department');
                                }}
                            >
                                + Thêm phòng
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={listdepartment}
                                hover
                                striped
                                border
                                size="md"
                                fields={fields}
                                itemsPerPage={10}
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
                                                            history.push(`/admin/staffs-department/${item.id}`);
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
                                                            history.push(
                                                                `/admin/departments/update-department/${item.id}`,
                                                            );
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
                                                            deletedepartment(item.id);
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
