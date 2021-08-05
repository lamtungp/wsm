import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow, CCardHeader } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import userServices from '../../../../common/redux/user/services';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Required!').email('Invalid'),
});

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const param = useParams();
    const email = String(Object.values(param)[0]);

    const [user, setUser] = useState({
        email: '',
    });

    React.useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await userServices.getUserByEmail(email);
            setUser(res);
        } catch (error) {}
    };

    const handle = async (values: any) => {
        try {
            await userServices.updateUser(values, email);
            await userServices.getAllUser();
            history.push('/admin/resetpassword');
        } catch (error) {
            window.alert('Xảy ra lỗi khi xóa');
        }
    };

    return (
        <div>
            <CContainer>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardHeader>
                            <h2
                                className="m-0 font-weight-bold d-flex"
                                style={{ fontSize: '13px', lineHeight: '1.57' }}
                            >
                                Thay đổi mật khẩu
                            </h2>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol lg="6">
                                    <Formik
                                        initialValues={{ email: user.email, password: '' }}
                                        validationSchema={ResetPasswordSchema}
                                        enableReinitialize
                                        onSubmit={(values) => {
                                            console.log(values);
                                            handle(values);
                                        }}
                                        validateOnChange={true}
                                        // validateOnBlur={false}
                                    >
                                        {({ handleChange, handleSubmit, values }) => (
                                            <Form
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit();
                                                    }
                                                }}
                                            >
                                                <Form.Group>
                                                    <Form.Label>Email:</Form.Label>
                                                    <Form.Control
                                                        name="email"
                                                        type="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>New Password:</Form.Label>
                                                    <Form.Control
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                {/* <Form.Group>
                                                    <Form.Label>Confirm Password:</Form.Label>
                                                    <Form.Control
                                                        name="confirmPassword"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group> */}
                                                <Button onClick={() => handleSubmit()}>
                                                    <FaSave className="mb-1 mr-1" />
                                                    <span>Lưu</span>
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CContainer>
        </div>
    );
};

export default ResetPassword;
