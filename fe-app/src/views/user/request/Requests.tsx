import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Table } from 'react-bootstrap';

import userService from '../../../common/redux/user/services';

const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn'];

const Requests: React.FunctionComponent = (): React.ReactElement => {
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
                        <CCardHeader className="d-flex">
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}
                            >
                                Tạo mới yêu cầu
                            </h2>
                            <div>
                                <h2 className="m-0 font-weight-bold" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                                    Số ngày phép còn lại: 10
                                </h2>
                            </div>
                        </CCardHeader>
                        <CCardHeader style={{ border: 'none' }}>
                            <CButton
                                className="btn btn-primary"
                                style={{ float: 'left' }}
                                onClick={() => {
                                    history.push('/user/requests/new');
                                }}
                            >
                                + Thêm yêu cầu
                            </CButton>
                        </CCardHeader>
                        <CCardBody style={{ border: 'none' }}>
                            <Table bordered className="text-center">
                                <thead>
                                    <tr>
                                        {fields.map((item, index) => {
                                            return <th key={index}>{item}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default Requests;
