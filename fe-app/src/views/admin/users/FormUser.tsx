import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    password: Yup.string().min(2, 'Too Short!').required('Required!'),
    email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormUser = () => {
    const history = useHistory();
    const params = useParams();

    const [img, setImg] = useState('');
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        avatar: '',
        address: '',
        dayIn: '',
        dob: '',
        phoneNumber: '',
        sex: '',
        permission: '',
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
            <CCardHeader className="d-flex">
                <h2
                    className="m-0 font-weight-bold d-flex"
                    style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}
                >
                    Nhập thông tin nhân viên
                </h2>
            </CCardHeader>
            <CCardBody>
                <div>
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
                        {({ handleChange, handleSubmit, setFieldValue, errors, touched, values }) => (
                            <Form
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                            >
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label>Họ tên:</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="name"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && touched.name ? (
                                                <Form.Text className="text-danger">{errors.name}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && touched.email ? (
                                                <Form.Text className="text-danger">{errors.email}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label>Mật khẩu:</Form.Label>
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
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label>Xác nhận mật khẩu:</Form.Label>
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
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Avatar</Form.Label>
                                    <div
                                        style={{
                                            marginBottom: '1rem',
                                            width: '12rem',
                                            padding: '3px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <img
                                            src={`/images/no-avatar.jpg`}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </div>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Control
                                                name="avatar"
                                                type="file"
                                                onChange={(e: any) => {
                                                    if (e.target.value) {
                                                        const files = e.target.files[0].name;
                                                        console.log(files);
                                                        setFieldValue('avatar', files);
                                                    } else {
                                                        setFieldValue('avatar', 'no-avatar.jpg');
                                                    }
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <CRow>
                                        <CCol lg="1" className="pr-1">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="sex"
                                                value="male"
                                                checked
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="male" className="ml-1">
                                                Male
                                            </label>
                                        </CCol>
                                        <CCol lg="1" className="pr-1">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="sex"
                                                value="female"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="female" className="ml-1">
                                                Female
                                            </label>
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label>Ngày sinh:</Form.Label>
                                            <Form.Control
                                                name="dob"
                                                type="dob"
                                                value={values.dob}
                                                onChange={handleChange}
                                            />
                                            {errors.dob && touched.dob ? (
                                                <Form.Text className="text-danger">{errors.dob}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label>Số điện thoại:</Form.Label>
                                            <Form.Control
                                                name="phoneNumber"
                                                type="phoneNumber"
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
                                        <CCol lg="6">
                                            <Form.Label>Địa chỉ:</Form.Label>
                                            <Form.Control
                                                name="address"
                                                type="address"
                                                value={values.address}
                                                onChange={handleChange}
                                            />
                                            {errors.address && touched.address ? (
                                                <Form.Text className="text-danger">{errors.address}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label>Ngày vào:</Form.Label>
                                            <Form.Control
                                                name="dayIn"
                                                type="dayIn"
                                                value={values.dayIn}
                                                onChange={handleChange}
                                            />
                                            {errors.dayIn && touched.dayIn ? (
                                                <Form.Text className="text-danger">{errors.dayIn}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label>Phân quyền:</Form.Label>
                                            <Form.Control name="content" as="select" value={values.permission}>
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="user">User</option>
                                            </Form.Control>
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
                </div>
            </CCardBody>
        </CCard>
    );
};

export default FormUser;
