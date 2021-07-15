import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Too Short!').required('Required!'),
    email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormUser = () => {
    const history = useHistory();
    const params = useParams();

    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        avatar: 'no-avatar.jpg',
        address: '',
        dayIn: '',
        dob: '',
        phoneNumber: '',
        sex: 'male',
        permission: '',
        roomID: '3',
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
            history.push('/admin/users');
        } else {
            await userService.addUser(values);
            await userService.getList();
            history.push('/admin/users');
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
                            console.log(values);
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
                                            <Form.Label className="font-weight-bold">Họ tên:</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="name"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label className="font-weight-bold">Email:</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label className="font-weight-bold">Mật khẩu:</Form.Label>
                                            <Form.Control
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                {/* <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label className="font-weight-bold">Xác nhận mật khẩu:</Form.Label>
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
                                </Form.Group> */}
                                <Form.Group>
                                    <Form.Label className="font-weight-bold">Avatar</Form.Label>
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
                                            src={`/avatars/${values.avatar}`}
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
                                    <Form.Label className="font-weight-bold">Giới tính</Form.Label>
                                    <CRow>
                                        <CCol lg="2" className="pr-1">
                                            <label>
                                                <Field type="radio" name="sex" id="male" value="male" checked />
                                                <label htmlFor="male" className="ml-1">
                                                    Male
                                                </label>
                                            </label>
                                        </CCol>
                                        <CCol lg="2" className="px-1">
                                            <label>
                                                <Field type="radio" name="sex" id="female" value="female" />
                                                <label htmlFor="female" className="ml-1">
                                                    Female
                                                </label>
                                            </label>
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label className="font-weight-bold">Ngày sinh:</Form.Label>
                                            <Form.Control
                                                name="dob"
                                                type="date"
                                                value={values.dob}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label className="font-weight-bold">Số điện thoại:</Form.Label>
                                            <Form.Control
                                                name="phoneNumber"
                                                type="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label className="font-weight-bold">Địa chỉ:</Form.Label>
                                            <Form.Control
                                                name="address"
                                                type="address"
                                                value={values.address}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label className="font-weight-bold">Ngày vào:</Form.Label>
                                            <Form.Control
                                                name="dayIn"
                                                type="date"
                                                value={values.dayIn}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label className="font-weight-bold">Phân quyền:</Form.Label>
                                            <Form.Control
                                                name="permission"
                                                as="select"
                                                value={values.permission}
                                                onChange={handleChange}
                                            >
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
