import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import userService from '../../../../common/redux/user/services';

import { ExportToExcel } from './ExportToExcel';

const fields = [
    {
        key: 'id',
        label: 'Id',
    },
    {
        key: 'name',
        label: 'Họ tên',
        sorter: false,
    },
    {
        key: 'email',
        label: 'Email',
        sorter: false,
    },
    {
        key: 'gender',
        label: 'Giới tính',
        sorter: false,
    },
    {
        key: 'time',
        label: 'Số giờ làm việc',
        sorter: false,
    },
];

const WorkingHours: React.FunctionComponent = (): React.ReactElement => {
    const [listUser, setListUser] = useState([
        { id: '', checkin: '', checkout: '', time: 0, checkins: [{}], gender: '' },
    ]);

    React.useEffect(() => {
        handleDate(new Date());
        if (localStorage.getItem('role') === 'manager') {
            getUsers();
        }
    }, []);

    const handleTime = (s: string) => {
        const arr = s.split(':');
        return +arr[0] * 3600 + +arr[1] * 60;
    };

    const handleDate = (date: Date) => {
        const arr = date.toLocaleDateString().split('/');
        arr.shift();
        return arr.join('-');
    };

    const getUsers = async () => {
        try {
            const res = await userService.getStaffWithCheckin(
                String(localStorage.getItem('email')),
                handleDate(new Date()),
            );
            setListUser(res);
        } catch (error) {}
    };

    listUser.map((user: any) => {
        let t = 0;
        // console.log(user);
        if (!!user.checkins) {
            user.checkins.map((item: any) => {
                if (!!!item.checkout) {
                    t += 0;
                } else {
                    const second = handleTime(item.checkout) - handleTime(item.checkin);
                    const h = Math.round((second / 3600) * 1000) / 1000;
                    t += h;
                }
            });
            user.time = t;
            delete user['checkins'];
        }
    });

    return (
        <>
            {localStorage.getItem('role') === 'manager' ? (
                <CRow>
                    <CCol xs="12">
                        <CCard>
                            <CCardHeader>
                                <h2
                                    className="m-0 font-weight-bold d-flex"
                                    style={{ fontSize: '13px', lineHeight: '1.57' }}
                                >
                                    Thông tin nhân viên cấp dưới
                                </h2>
                            </CCardHeader>
                            <CCardBody className="text-center">
                                {/* <CCardHeader>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Nội dung:</Form.Label>
                                            <Form.Control
                                                name="month"
                                                as="select"
                                                defaultValue={new Date().getMonth()}
                                                onChange={handleChange}
                                            >
                                                <option value="1-2021">1/2021</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </CCardHeader> */}
                                <CCardHeader>
                                    <h5 className="m-0 font-weight-bold">
                                        Thống kê giờ làm việc nhân viên tháng: {handleDate(new Date())}
                                    </h5>
                                </CCardHeader>
                                <CDataTable
                                    items={listUser}
                                    hover
                                    striped
                                    border
                                    size="md"
                                    fields={fields}
                                    itemsPerPage={10}
                                    tableFilter
                                    pagination
                                />
                                <ExportToExcel prop={{ apiData: listUser, fileName: 'WorkingHours' }} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <></>
            )}
        </>
    );
};

export default WorkingHours;
