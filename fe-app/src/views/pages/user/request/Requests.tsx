import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Table } from 'react-bootstrap';
import { FaEye, FaDownload } from 'react-icons/fa';

import requestService from '../../../../common/redux/request/services';

const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn', ''];

const Requests: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const [listRequest, setListRequest] = useState([{ id: '', nameRequest: '', state: '', handler: '', timeout: '' }]);

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await requestService.getListRequest(Number(localStorage.getItem('userId')));
        // console.log(res);
        setListRequest(res);
    };

    return (
        <div>
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol lg="8">
                                    <h2
                                        className="m-0 font-weight-bold d-flex"
                                        style={{ width: '85%', fontSize: '13px', lineHeight: '1.57' }}
                                    >
                                        Yêu cầu của tôi
                                    </h2>
                                </CCol>
                                <CCol lg="4">
                                    <div>
                                        <h2
                                            className="m-0 font-weight-bold float-right"
                                            style={{ fontSize: '13px', lineHeight: '1.57' }}
                                        >
                                            Số ngày phép còn lại: {localStorage.getItem('vacationDay')}
                                        </h2>
                                    </div>
                                </CCol>
                            </CRow>
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
                            {listRequest.length ? (
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
                                                        {item.state === 'Confirmed' ? (
                                                            <span className="badge badge-pill badge-success text-white">
                                                                Đồng ý
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {item.state === 'Declined' ? (
                                                            <span className="badge badge-pill badge-warning text-white">
                                                                Từ chối
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {item.state === 'Pending' ? (
                                                            <span className="badge badge-pill badge-warning text-white">
                                                                Đang chờ xử lý
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </td>
                                                    <td>{item.handler}</td>
                                                    <td>{item.timeout}</td>
                                                    <td style={{ width: '17%' }}>
                                                        <CButton
                                                            className="btn-primary mr-1"
                                                            onClick={() => history.push(`/user/requests/${item.id}`)}
                                                        >
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
                            ) : (
                                <div>
                                    <h5 className="text-center">Bạn chưa có yêu cầu nào</h5>
                                </div>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default Requests;
