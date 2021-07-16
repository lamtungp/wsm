import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

import requestService from '../../../common/redux/request/services';

const RequestDetails: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const param = useParams();
    const id = Number(Object.values(param)[0]);

    const [request, setRequest] = useState({
        id: '',
        nameRequest: '',
        state: '',
        timeout: '',
        phoneNumber: '',
        reason: '',
        project: '',
    });

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await requestService.findRequestById(id);
        console.log(res);
        setRequest(res);
    };

    return (
        <div>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ width: '85%', fontSize: '13px', lineHeight: '1.57' }}
                            >
                                Chi tiết yêu cầu
                            </h2>
                        </CCardHeader>
                        <CCardHeader style={{ border: 'none' }}>
                            <CButton
                                className="btn btn-primary shadow"
                                style={{ float: 'left' }}
                                onClick={() => {
                                    history.push(`/user/requests/${request.id}/edit`);
                                }}
                            >
                                <FaPencilAlt />
                            </CButton>
                        </CCardHeader>
                        <CCardBody style={{ border: 'none' }}>
                            <Table bordered hover className="align-items-center">
                                <tbody>
                                    <tr>
                                        <td style={{ width: '20%' }}>
                                            <b>Nội dung</b>
                                        </td>
                                        <td>{request.nameRequest}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Trạng thái</b>
                                        </td>
                                        <td>
                                            <span className="badge badge-pill badge-warning text-white">
                                                {request.state}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Thời hạn</b>
                                        </td>
                                        <td>{request.timeout}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Số điện thoại</b>
                                        </td>
                                        <td>{request.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Dự án</b>
                                        </td>
                                        <td>{request.project}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b> Lý do</b>
                                        </td>
                                        <td>{request.reason}</td>
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

export default RequestDetails;
