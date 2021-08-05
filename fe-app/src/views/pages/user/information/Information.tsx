import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

import userService from '../../../../common/redux/user/services';

// const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn'];

const Infomation: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const [user, setUser] = useState({
        id: '',
        email: '',
        address: '',
        contractTerm: '',
        dayIn: '',
        dayOfficial: '',
        dob: '',
        name: '',
        phoneNumber: '',
        senority: '',
        gender: '',
        vacationsDay: '0',
    });

    React.useEffect(() => {
        getListUser();
    }, []);

    const getListUser = async () => {
        try {
            const res = await userService.getUserByEmail(String(localStorage.getItem('email')));
            // console.log(res);
            setUser(res);
        } catch (error) {}
    };

    console.log(user);

    return (
        <CRow>
            <CCol xs="12">
                <CCard>
                    <CCardHeader>
                        <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                            Thông tin cá nhân
                        </h2>
                    </CCardHeader>
                    <CCardHeader style={{ border: 'none' }}>
                        <CButton
                            className="btn btn-primary"
                            style={{ float: 'left' }}
                            onClick={() => {
                                history.push('/user/profile/edit');
                            }}
                        >
                            <FaPencilAlt />
                        </CButton>
                    </CCardHeader>
                    <CCardBody style={{ border: 'none' }}>
                        <CRow>
                            <CCol lg="6">
                                <h4 style={{ fontSize: '17px' }}>Thông tin cá nhân</h4>
                                <Table bordered hover style={{ fontSize: '13px' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Email</strong>
                                            </td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Họ tên</strong>
                                            </td>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Địa chỉ</strong>
                                            </td>
                                            <td>{user.address}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Thâm niên</strong>
                                            </td>
                                            <td>{user.senority}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Số điện thoại</strong>
                                            </td>
                                            <td>{user.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Ngày sinh</strong>
                                            </td>
                                            <td>{user.dob}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Ngày vào công ty</strong>
                                            </td>
                                            <td>{user.dayIn}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Ngày lên chính thức</strong>
                                            </td>
                                            <td>{user.dayOfficial}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Số ngày phép còn lại</strong>
                                            </td>
                                            <td>{user.vacationsDay}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CCol>
                            <CCol lg="6">
                                <div style={{ display: 'inline-block', width: '100%' }}>
                                    <h4 style={{ fontSize: '17px' }}>Thiết bị đang sử dụng</h4>
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Máy tính mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Sạc máy tính mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Màn hình mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Bàn phím mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Chuột mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Ghế mã</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Các thiết bị khác</strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ display: 'inline-block', width: '100%' }}>
                                    <h4 style={{ fontSize: '17px' }}>Nhóm dự án</h4>
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <span
                                                        className="translation_missing"
                                                        title="translation missing: vi.profiles.show.group"
                                                    >
                                                        Group
                                                    </span>
                                                </th>
                                                <th>L1</th>
                                                <th>L2</th>
                                            </tr>

                                            <tr>
                                                <td>ZINZA Intern</td>
                                                <td>Nguyễn Thị Phương Thảo,</td>
                                                <td>
                                                    Nguyễn Xuân Cương, Trần Đức Thắng, Nguyễn Xuân Mạnh, Nguyễn Hoàng
                                                    Nam, Nguyễn Trung Thọ, Phạm Thu Hà,
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Infomation;
