import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import userService from '../../../../common/redux/user/services';

const UserSchema = Yup.object().shape({
    email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormUser = () => {
    const history = useHistory();
    const params = useParams();
    const email = String(Object.values(params)[0]);

    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        avatar: 'no-avatar.jpg',
        address: '',
        dayIn: '',
        dob: '',
        phoneNumber: '',
        gender: 'male',
        role: 'admin',
        departmentId: 1,
    });

    useEffect(() => {
        if (email) {
            const getItem = async () => {
                const _user = await userService.getUserByEmail(email);
                console.log(_user);
                setUser(_user);
            };
            getItem();
        }
    }, []);

    const handle = async (values: any) => {
        if (values.id) {
            await userService.updateUser(values, email);
            await userService.getAllUser();
            history.push('/admin/users');
        } else {
            await userService.addUser(values);
            await userService.getAllUser();
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
                        validationSchema={UserSchema}
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
                                    <CRow>
                                        <CCol lg="5">
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
                                {!!!email ? (
                                    <Form.Group>
                                        <CRow>
                                            <CCol lg="5">
                                                <Form.Label className="font-weight-bold">Password:</Form.Label>
                                                <Form.Control
                                                    name="password"
                                                    type="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                        </CRow>
                                    </Form.Group>
                                ) : (
                                    <></>
                                )}
                                <Form.Group>
                                    <Form.Label className="font-weight-bold">Giới tính</Form.Label>
                                    <CRow>
                                        <CCol lg="2" className="pr-1">
                                            <label className="m-0">
                                                <Field type="radio" name="gender" value="male" />
                                                <label className="ml-1">Male</label>
                                            </label>
                                        </CCol>
                                        <CCol lg="2" className="px-1">
                                            <label className="m-0">
                                                <Field type="radio" name="gender" value="female" />
                                                <label className="ml-1">Female</label>
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
                                                name="role"
                                                as="select"
                                                value={values.role}
                                                onChange={handleChange}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="user">User</option>
                                            </Form.Control>
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="4">
                                            <Form.Label className="font-weight-bold">Department:</Form.Label>
                                            <Form.Control
                                                name="departmentId"
                                                as="select"
                                                value={values.departmentId}
                                                onChange={handleChange}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
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
