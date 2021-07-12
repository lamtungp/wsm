import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    password: Yup.string().min(2, 'Too Short!').required('Required!'),
    email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormUser = () => {
    const history = useHistory();
    const params = useParams();

    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
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
        <div className="w3-margin-top login" style={{ margin: '0 25rem' }}>
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
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                name="username"
                                type="username"
                                placeholder="Username"
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
        </div>
    );
};

export default FormUser;
