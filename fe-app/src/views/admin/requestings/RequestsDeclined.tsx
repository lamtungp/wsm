import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { FaCheck, FaTimesCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import requestServices from '../../../common/redux/request/services';

const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn', 'SDT', 'Dự án', 'Lý do', ''];

const RequestsDeclined: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const [requestsPending, setRequestsPending] = React.useState([
        { id: 0, nameRequest: '', state: '', handler: '', timeout: '', phoneNumber: '', project: '', reason: '' },
    ]);

    React.useEffect(() => {
        getRequests();
    }, []);

    const getRequests = async () => {
        const requests = await requestServices.findRequestByState('Pending');
        setRequestsPending(requests);
    };

    const handleRequest = async (values: object, id: number) => {
        console.log('hello');
        await requestServices.updateRequest(values, id);
        await requestServices.getAllRequest();
    };

    return (
        <CCard className="mt-3">
            <CCardHeader>
                <CRow>
                    <CCol lg="8">
                        <h2
                            className="m-0 font-weight-bold d-flex"
                            style={{ width: '85%', fontSize: '13px', lineHeight: '1.57' }}
                        >
                            Yêu cầu đang chờ
                        </h2>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody style={{ border: 'none' }}>
                {requestsPending.length > 0 ? (
                    <Table bordered hover className="text-center align-items-center">
                        <thead>
                            <tr>
                                {fields.map((item, index) => {
                                    return <th key={index}>{item}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {requestsPending.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nameRequest}</td>
                                        <td>
                                            <span className="badge badge-pill badge-warning text-white">
                                                {item.state === 'Pending' ? 'Đang chờ xử lý' : ''}
                                                {item.state === 'Confirmed' ? 'Đồng ý' : ''}
                                                {item.state === 'Declined' ? 'Từ chối' : ''}
                                            </span>
                                        </td>
                                        <td>{item.handler}</td>
                                        <td>{item.timeout}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.project}</td>
                                        <td>{item.reason}</td>
                                        <td style={{ width: '13%' }}>
                                            <CButton
                                                className="btn-primary mr-1"
                                                onClick={() => {
                                                    handleRequest(
                                                        {
                                                            state: 'Confirmed',
                                                            handler: localStorage.getItem('email'),
                                                        },
                                                        item.id,
                                                    );
                                                }}
                                            >
                                                <FaCheck />
                                            </CButton>
                                            <CButton
                                                className="btn-primary"
                                                onClick={() => {
                                                    handleRequest(
                                                        {
                                                            state: 'Declined',
                                                            handler: localStorage.getItem('email'),
                                                        },
                                                        item.id,
                                                    );
                                                }}
                                            >
                                                <FaTimesCircle />
                                            </CButton>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <div>
                        <h5 className="text-center">Không có yêu cầu mới</h5>
                    </div>
                )}
            </CCardBody>
        </CCard>
    );
};

export default RequestsDeclined;
