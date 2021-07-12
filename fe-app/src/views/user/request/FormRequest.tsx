import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CCard, CCardHeader, CCardBody, CRow, CCol, CTextarea } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    content: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    phoneNumber: Yup.string().min(2, 'Too Short!').required('Required!'),
    project: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormRequest = () => {
    const history = useHistory();
    const params = useParams();

    const [user, setUser] = useState({
        id: '',
        content: '',
        project: '',
        phoneNumber: '',
        reason: '',
    });
    const idUser = Number(Object.values(params)[0]);
    useEffect(() => {
        if (idUser) {
            const getItem = async () => {
                const _user = await userService.findUserById(idUser);
                setUser(_user);
            };
            getItem();
        }
    }, []);

    const handle = async (values: any) => {
        if (values.id) {
            await userService.updateUser(values, values.id);
            await userService.getList();
            history.push('/base/users');
        } else {
            await userService.addUser(values);
            await userService.getList();
            history.push('/base/users');
        }
    };

    return (
        <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
            <CCardHeader>
                <div>
                    <h5 className="m-0">Tạo mới yêu cầu</h5>
                </div>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                        <Formik
                            initialValues={user}
                            validationSchema={SignupSchema}
                            enableReinitialize
                            onSubmit={(values) => {
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
                                                    name="content"
                                                    type="content"
                                                    placeholder="Username"
                                                    value={values.content}
                                                    onChange={handleChange}
                                                />
                                                {errors.content && touched.content ? (
                                                    <Form.Text className="text-danger">{errors.content}</Form.Text>
                                                ) : null}
                                            </CCol>
                                        </CRow>
                                    </Form.Group>
                                    <Form.Group>
                                        <CRow>
                                            <CCol lg="6">
                                                <Form.Label>Từ:</Form.Label>
                                                <Form.Control name="dayStart" type="date" onChange={handleChange} />
                                            </CCol>
                                            <CCol lg="6">
                                                <Form.Label>Đến:</Form.Label>
                                                <Form.Control name="dayStart" type="date" onChange={handleChange} />
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
                                                    <Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>
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
                                                    type="project"
                                                    placeholder="project"
                                                    value={values.project}
                                                    onChange={handleChange}
                                                />
                                                {errors.project && touched.project ? (
                                                    <Form.Text className="text-danger">{errors.project}</Form.Text>
                                                ) : null}
                                            </CCol>
                                        </CRow>
                                    </Form.Group>
                                    <Form.Group>
                                        <CRow>
                                            <CCol lg="8">
                                                <Form.Label>Lý do:</Form.Label>
                                                <CTextarea
                                                    name="reason"
                                                    rows={3}
                                                    placeholder='Cần nêu lý do cụ thể, không viết "Lý do cá nhân"'
                                                    value={values.reason}
                                                    onChange={handleChange}
                                                />
                                                {errors.reason && touched.reason ? (
                                                    <Form.Text className="text-danger">{errors.reason}</Form.Text>
                                                ) : null}
                                            </CCol>
                                        </CRow>
                                    </Form.Group>
                                    <Button onClick={() => handleSubmit()}>
                                        <FaSave />
                                        <span>Lưu</span>
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </CCol>
                    <CCol lg="5">
                        <div className="rules take-leave">
                            a, Khi xin nghỉ phép chú ý:
                            <ul>
                                <li>Nếu còn ngày phép: Xin nghỉ phép có lương.</li>
                                <li>Nếu không còn ngày phép: Xin nghỉ phép không lương.</li>
                                <li>
                                    Nếu xin nghỉ 3 ngày khi chỉ còn 2 ngày phép: Xin nghỉ phép có lương, hệ thống sẽ tự
                                    update ngày còn lại là nghỉ phép không lương.
                                </li>
                            </ul>
                            b, Đối với việc xin nghỉ phép cần đảm bảo yêu cầu:
                            <ul>
                                <li>Nghỉ 0,5 ngày: xin nghỉ trước 1 ngày làm việc.</li>
                                <li>Nghỉ 1 ngày: xin nghỉ trước 2 ngày làm việc.</li>
                                <li>Nghỉ 1,5 ngày đến 2 ngày: xin nghỉ trước 3 ngày làm việc.</li>
                                <li>Nghỉ 2,5 ngày đến 3: xin nghỉ trước 5 ngày làm việc.</li>
                                <li>Nghỉ từ 3,5 ngày trở lên: xin nghỉ trước 7 ngày làm việc.</li>
                                <li>Không xin nghỉ liền tiếp 5 ngày làm việc kể cả xin có lương hay không có lương.</li>
                            </ul>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default FormRequest;
