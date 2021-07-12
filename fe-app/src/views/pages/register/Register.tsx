import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
// import { useHistory, useParams } from 'react-router-dom';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
    password: Yup.string().min(5, 'Too Short!').required('Required!'),
});

const Register = (props: any): React.ReactElement => {
    // const history = useHistory();
    // const params = useParams();

    const user = {
        username: '',
        email: '',
        password: '',
    };
    // React.useEffect(() => {}, []);

    const handle = async (values: any) => {
        await userService.addUser(values);
        console.log(values);
        props.onHide();
    };

    return (
        <Modal
            {...props}
            className="c-app c-default-layout flex-row align-items-center pt-5"
            style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)' }}
        >
            <Modal.Header className="pl-5" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5">
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
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="username"
                                    placeholder="User Name"
                                    value={values.username}
                                    onChange={handleChange}
                                />
                                {errors.username && touched.username ? (
                                    <Form.Text className="text-danger">{errors.username}</Form.Text>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email ? (
                                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password ? (
                                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                                ) : null}
                            </Form.Group>
                            <Button onClick={() => handleSubmit()}>Save</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            {/* <Modal.Footer>
                <CButton onClick={props.onHide}>Close</CButton>
            </Modal.Footer> */}
        </Modal>
    );
};

export default Register;
