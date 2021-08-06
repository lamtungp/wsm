import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { FaCheck, FaTimesCircle } from 'react-icons/fa';

import requestServices from '../../../../common/redux/request/services';
import AppsConstant from '../../../../common/constants/app';

import HeaderRequest from './HeaderRequest';

const fields = ['Nội dung', 'Trạng thái', 'Người xử lý', 'Thời hạn', 'SDT', 'Dự án', 'Lý do'];

type tplotOptions = {
    [key: string]: boolean;
};

const RequestsConfirmed: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const param = useParams();
    const option = String(Object.values(param)[0]) !== 'undefined' ? String(Object.values(param)[0]) : 'pending';
    const [listRequest, setListRequests] = React.useState([
        { id: 0, nameRequest: '', state: '', handler: '', timeout: '', phoneNumber: '', project: '', reason: '' },
    ]);
    const [status, setStatus] = React.useState<tplotOptions>({});

    React.useEffect(() => {
        if (localStorage.getItem('role') === 'manager') {
            getRequests();
        }
    }, []);
    const str = option.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());

    const getRequests = async () => {
        try {
            const requests = await requestServices.getListRequestOfStaff(String(localStorage.getItem('email')));
            setListRequests(requests);
            const arr = { pending: false, confirmed: false, declined: false };
            requests.map((item: any) => {
                if (item.state === 'Pending') {
                    arr.pending = true;
                } else if (item.state === 'Confirmed') {
                    arr.confirmed = true;
                } else {
                    arr.declined = true;
                }
            });
            setStatus(arr);
        } catch (error) {
            history.push('/error/500');
        }
    };

    const handleRequest = async (values: object, id: number) => {
        try {
            await requestServices.updateRequest(values, id);
            getRequests();
        } catch (error) {
            window.alert('Xảy ra lỗi khi cập nhật');
        }
    };

    return (
        <div>
            <HeaderRequest tabs={AppsConstant.tabSetting} />
            <CCard className="mt-3">
                <CCardHeader>
                    <CRow>
                        <CCol lg="8">
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ width: '85%', fontSize: '13px', lineHeight: '1.57' }}
                            >
                                Thông tin các yêu cầu
                            </h2>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{ border: 'none' }}>
                    {listRequest.length > 0 && status[option] ? (
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
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    length++;
                                    return item.state === str ? (
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
                                                    <span className="badge badge-pill badge-danger text-white">
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
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.project}</td>
                                            <td>{item.reason}</td>
                                            {item.state === 'Pending' ? (
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
                                                            history.push('/user/member/requests/confirmed');
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
                                                            history.push('/user/member/requests/declined');
                                                        }}
                                                    >
                                                        <FaTimesCircle />
                                                    </CButton>
                                                </td>
                                            ) : (
                                                <></>
                                            )}
                                        </tr>
                                    ) : (
                                        <tr key={index}></tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div>
                            <h5 className="text-center">Không có dữ liệu</h5>
                        </div>
                    )}
                </CCardBody>
            </CCard>
        </div>
    );
};

export default RequestsConfirmed;
