import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
// import { useHistory, useParams } from 'react-router-dom';
import { CCard, CCardHeader, CCardBody, CRow, CCol, CTextarea } from '@coreui/react';
import { FaSave } from 'react-icons/fa';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useHistory, useParams } from 'react-router-dom';

import requestService from '../../../common/redux/request/services';

const SignupSchema = Yup.object().shape({
    reason: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    phoneNumber: Yup.string().min(2, 'Too Short!').required('Required!'),
});

const FormRequest = () => {
    const history = useHistory();
    const params = useParams();

    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    const [request, setRequest] = useState({
        id: '',
        nameRequest: 'Nghỉ phép có lương',
        state: 'Đang xử lý',
        startDay: '',
        endDay: '',
        timeout: '',
        project: 'Zinza Intern',
        phoneNumber: '',
        reason: '',
        userId: localStorage.getItem('userId'),
    });
    const idRequest = Number(Object.values(params)[0]);
    useEffect(() => {
        if (idRequest) {
            const getItem = async () => {
                const _request = await requestService.findRequestById(idRequest);
                setRequest(_request);
                setDateStart(new Date(_request.start));
                setDateEnd(new Date(_request.end));
            };
            getItem();
        }
    }, []);
    // console.log(request);
    // const d = new Date('2015/3/25, 14:01:00');
    // console.log(d);

    const handle = async (values: any) => {
        if (values.id) {
            await requestService.updateRequest(values, values.id);
            await requestService.getListRequest(Number(localStorage.getItem('userId')));
            history.push('/base/users');
        } else {
            await requestService.addRequest(values);
            await requestService.getListRequest(Number(localStorage.getItem('userId')));
            history.push('/user/requests');
        }
    };

    return (
        <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
            <CCardHeader>
                <CRow>
                    <CCol lg="8">
                        <h2
                            className="m-0 font-weight-bold d-flex"
                            style={{ width: '85%', fontSize: '13px', lineHeight: '1.57' }}
                        >
                            Tạo mới yêu cầu
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
            <CCardBody>
                <div>
                    <CRow>
                        <CCol lg="7">
                            <CRow>
                                <CCol lg="10">
                                    <Formik
                                        initialValues={request}
                                        validationSchema={SignupSchema}
                                        enableReinitialize
                                        onSubmit={(values) => {
                                            values.timeout = `${values.startDay} ~ ${values.endDay}`;
                                            console.log(values);
                                            handle(values);
                                        }}
                                        validateOnChange={true}
                                        // validateOnBlur={false}
                                    >
                                        {({ handleChange, handleSubmit, errors, touched, values }) => (
                                            <Form
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit();
                                                    }
                                                }}
                                            >
                                                <Form.Group>
                                                    <CRow>
                                                        <CCol lg="8">
                                                            <Form.Label>Nội dung:</Form.Label>
                                                            <Form.Control
                                                                name="nameRequest"
                                                                as="select"
                                                                value={values.nameRequest}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="Nghỉ phép có lương">
                                                                    Nghỉ phép có lương
                                                                </option>
                                                                <option value="Nghỉ phép không lương">
                                                                    Nghỉ phép không lương
                                                                </option>
                                                                <option value="Làm thêm giờ">Làm thêm giờ</option>
                                                                <option value="Mang thiết bị về nhà">
                                                                    Mang thiết bị về nhà
                                                                </option>
                                                                <option value="Quên check in/check out">
                                                                    Quên check in/check out
                                                                </option>
                                                            </Form.Control>
                                                        </CCol>
                                                    </CRow>
                                                </Form.Group>
                                                <Form.Group>
                                                    <CRow>
                                                        <CCol lg="6">
                                                            <Form.Label>Từ:</Form.Label>
                                                            <Flatpickr
                                                                className="form-control bg-white"
                                                                value={dateStart}
                                                                name="start"
                                                                type="start"
                                                                options={{
                                                                    dateFormat: 'd-m-Y H:i',
                                                                    enableTime: true,
                                                                }}
                                                                onChange={(dateSelect: any) => {
                                                                    const date = new Date(String(dateSelect[0]));
                                                                    const arr = date.toLocaleString().split(', ');
                                                                    const arrDate = arr[1].split('/');
                                                                    arr.pop();
                                                                    const arrDateReverse = arrDate.reverse();
                                                                    arr.push(arrDateReverse.join('/'));
                                                                    setDateStart(new Date(arr.reverse().join(', ')));
                                                                    values.startDay = arr.reverse().join(', ');
                                                                }}
                                                            />
                                                        </CCol>
                                                        <CCol lg="6">
                                                            <Form.Label>Đến:</Form.Label>
                                                            <Flatpickr
                                                                className="form-control bg-white"
                                                                value={dateEnd}
                                                                name="end"
                                                                type="end"
                                                                options={{
                                                                    dateFormat: 'd-m-Y H:i',
                                                                    enableTime: true,
                                                                }}
                                                                onChange={(dateSelect: any) => {
                                                                    const date = new Date(String(dateSelect[0]));
                                                                    const arr = date.toLocaleString().split(', ');
                                                                    const arrDate = arr[1].split('/');
                                                                    arr.pop();
                                                                    const arrDateReverse = arrDate.reverse();
                                                                    arr.push(arrDateReverse.join('/'));
                                                                    setDateEnd(new Date(arr.reverse().join(', ')));
                                                                    values.endDay = arr.reverse().join(', ');
                                                                }}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </Form.Group>
                                                <Form.Group>
                                                    <CRow>
                                                        <CCol lg="8">
                                                            <Form.Label>Số điện thoại:</Form.Label>
                                                            <Form.Control
                                                                name="phoneNumber"
                                                                type="phoneNumber"
                                                                placeholder="123456789"
                                                                value={values.phoneNumber}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.phoneNumber && touched.phoneNumber ? (
                                                                <Form.Text className="text-danger">
                                                                    {errors.phoneNumber}
                                                                </Form.Text>
                                                            ) : null}
                                                        </CCol>
                                                    </CRow>
                                                </Form.Group>
                                                <Form.Group>
                                                    <CRow>
                                                        <CCol lg="8">
                                                            <Form.Label>Dự án:</Form.Label>
                                                            <Form.Control
                                                                name="project"
                                                                value={values.project}
                                                                readOnly
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </Form.Group>
                                                <Form.Group>
                                                    <CRow>
                                                        <CCol lg="8">
                                                            <Form.Label>Lý do:</Form.Label>
                                                            <CTextarea
                                                                name="reason"
                                                                type="reason"
                                                                rows={3}
                                                                placeholder='Cần nêu lý do cụ thể, không viết "Lý do cá nhân"'
                                                                value={values.reason}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.reason && touched.reason ? (
                                                                <Form.Text className="text-danger">
                                                                    {errors.reason}
                                                                </Form.Text>
                                                            ) : null}
                                                        </CCol>
                                                    </CRow>
                                                </Form.Group>
                                                <Button onClick={() => handleSubmit()}>
                                                    <FaSave className="mb-1 mr-1" />
                                                    <span>Lưu</span>
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol
                            lg="5"
                            style={{
                                fontSize: '0.8125rem',
                            }}
                        >
                            <div style={{ padding: '25px', backgroundColor: 'ghostwhite', margin: '20px' }}>
                                a, Khi xin nghỉ phép chú ý:
                                <ul className="p-0">
                                    <li>Nếu còn ngày phép: Xin nghỉ phép có lương.</li>
                                    <li>Nếu không còn ngày phép: Xin nghỉ phép không lương.</li>
                                    <li>
                                        Nếu xin nghỉ 3 ngày khi chỉ còn 2 ngày phép: Xin nghỉ phép có lương, hệ thống sẽ
                                        tự update ngày còn lại là nghỉ phép không lương.
                                    </li>
                                </ul>
                                b, Đối với việc xin nghỉ phép cần đảm bảo yêu cầu:
                                <ul className="p-0">
                                    <li>Nghỉ 0,5 ngày: xin nghỉ trước 1 ngày làm việc.</li>
                                    <li>Nghỉ 1 ngày: xin nghỉ trước 2 ngày làm việc.</li>
                                    <li>Nghỉ 1,5 ngày đến 2 ngày: xin nghỉ trước 3 ngày làm việc.</li>
                                    <li>Nghỉ 2,5 ngày đến 3: xin nghỉ trước 5 ngày làm việc.</li>
                                    <li>Nghỉ từ 3,5 ngày trở lên: xin nghỉ trước 7 ngày làm việc.</li>
                                    <li>
                                        Không xin nghỉ liền tiếp 5 ngày làm việc kể cả xin có lương hay không có lương.
                                    </li>
                                </ul>
                            </div>
                        </CCol>
                    </CRow>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default FormRequest;
