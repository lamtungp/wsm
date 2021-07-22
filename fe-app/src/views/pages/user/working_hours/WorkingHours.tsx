import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';
// import { Form } from 'react-bootstrap';

import userService from '../../../../common/redux/user/services';
import checkinServices from '../../../../common/redux/checkin/services';

import { ExportToExcel } from './ExportToExcel';

const fields = [
    {
        key: 'id',
        label: 'Id',
    },
    {
        key: 'name',
        label: 'Checkin',
        sorter: false,
    },
    {
        key: 'email',
        label: 'Checkout',
        sorter: false,
    },
    {
        key: 'time',
        label: 'Số giờ làm việc',
        sorter: false,
    },
];

const WorkingHours: React.FunctionComponent = (): React.ReactElement => {
    const [listUser, setListUser] = useState([{ id: '', checkin: '', checkout: '', time: 0, checkins: [{}] }]);

    React.useEffect(() => {
        handleDate(new Date());
        getUsers();
    }, []);

    const handleTime = (s: string) => {
        const arr = s.split(':');
        return +arr[0] * 3600 + +arr[1] * 60 + +arr[2];
    };

    const handleDate = (date: Date) => {
        const arr = date.toLocaleDateString().split('/');
        arr.shift();
        console.log(arr.join('-'));
        return arr.join('-');
    };

    const getUsers = async () => {
        // const res = await userService.getListStaff(Number(localStorage.getItem('userId')));
        const res = await userService.getStaffWithCheckin(
            Number(localStorage.getItem('userId')),
            handleDate(new Date()),
        );
        setListUser(res);
    };

    listUser.map((user: any) => {
        let t = 0;
        user.checkins.map((item: any) => {
            if (!!!item.checkout) {
                t += 0;
            } else {
                const second = handleTime(item.checkout) - handleTime(item.checkin);
                const h = Math.round((second / 36) * 10) / 1000;
                t += h;
            }
        });
        // const checkins = await checkinServices.getListCheckinWithDate(Number(user.id), '7-2021');
        // console.log(checkins);
        // checkins.map((item: any) => {
        //     const second = handleTime(item.checkout) - handleTime(item.checkin);
        //     const h = Math.round((second / 36) * 10) / 1000;
        //     t += h;
        // });
        console.log('t ', t);
        user.time = Math.round(t);
    });
    // console.log(listUser);
    // const handleChange = (e: any) => {
    //     console.log(e.target.value);
    // };

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
                                                name="nameRequest"
                                                as="select"
                                                defaultValue={new Date().getMonth()}
                                                onChange={handleChange}
                                            >
                                                <option value="Nghỉ phép có lương">Nghỉ phép có lương</option>
                                                <option value="Nghỉ phép không lương">Nghỉ phép không lương</option>
                                                <option value="Làm thêm giờ">Làm thêm giờ</option>
                                                <option value="Mang thiết bị về nhà">Mang thiết bị về nhà</option>
                                                <option value="Quên check in/check out">Quên check in/check out</option>
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
