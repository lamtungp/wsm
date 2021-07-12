import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CLink, CRow } from '@coreui/react';

import { login } from '../../../common/redux/auth/actions';

const SignupSchema = Yup.object().shape({
    email: Yup.string().required('Required!').email('Invalid email'),
    newPassword: Yup.string().required('Required!'),
});

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const dispatch = useDispatch();
    // const handleLogin = (values: { email: string; newPassword: string }) => {
    //     dispatch(login(values));
    // };
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer style={{ width: '40rem' }}>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                            <h1>Forgot Password?</h1>
                            <Formik
                                initialValues={{ email: '', newPassword: '' }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                    // handleLogin(values);
                                }}
                                validateOnChange={true}
                                // validateOnBlur={false}
                            >
                                {({ handleChange, handleSubmit }) => (
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
                                                className="form-control"
                                                name="email"
                                                placeholder="Username or Email"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>New Password:</Form.Label>
                                            <Form.Control
                                                name="newPassword"
                                                type="newPassword"
                                                placeholder="Password"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Confirm Password:</Form.Label>
                                            <Form.Control
                                                name="confirmPassword"
                                                type="confirmPassword"
                                                placeholder="Password"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        {/* <Form.Text>{error}</Form.Text> */}
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    onClick={() => handleSubmit()}
                                                >
                                                    Save
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </Form>
                                )}
                            </Formik>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CContainer>
        </div>
    );
};

export default ResetPassword;
