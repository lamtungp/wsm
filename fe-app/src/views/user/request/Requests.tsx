import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Table } from 'react-bootstrap';
import { FaEye, FaDownload } from 'react-icons/fa';

import requestService from '../../../common/redux/request/services';

const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn', ''];

const Requests: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const [listRequest, setListRequest] = useState([{ nameRequest: '', state: '', handler: '', timeout: '' }]);

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await requestService.getListRequest(Number(localStorage.getItem('idAccount')));
        console.log(res);
        setListRequest(res);
    };

    return (
        <div>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader className="d-flex">
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ width: '85.5%', fontSize: '13px', lineHeight: '1.57' }}
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
                            <Table bordered hover className="text-center align-items-center">
                                <thead>
                                    <tr>
                                        {fields.map((item, index) => {
                                            return <th key={index}>{item}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRequest.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.nameRequest}</td>
                                                <td>
                                                    <span className="badge badge-pill badge-warning text-white">
                                                        {item.state}
                                                    </span>
                                                </td>
                                                <td>{item.handler}</td>
                                                <td>{item.timeout}</td>
                                                <td>
                                                    <CButton className="btn-primary mr-1">
                                                        <FaEye />
                                                    </CButton>
                                                    <CButton className="btn-primary">
                                                        <FaDownload />
                                                    </CButton>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
