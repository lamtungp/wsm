import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react';
import { FaSave } from 'react-icons/fa';
// import { InputMoment } from 'react-input-moment';

import userService from '../../../common/redux/user/services';

const SignupSchema = Yup.object().shape({
    content: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required!'),
    phoneNumber: Yup.string().min(2, 'Too Short!').required('Required!'),
    project: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
});

const FormInformation = () => {
    const history = useHistory();
    // const params = useParams();

    const [user, setUser] = useState({
        id: '',
        email: '',
        address: '',
        avatar: '',
        contractTerm: '',
        dayIn: '',
        dayOfficial: '',
        dob: '',
        name: '',
        phoneNumber: '',
        senority: '',
        sex: '',
        vacationsDay: '0',
    });

    React.useEffect(() => {
        getListTodo();
    }, []);

    const getListTodo = async () => {
        const res = await userService.findUserByEmail(String(localStorage.getItem('email')));
        // console.log(res);
        setUser(res);
    };

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
                    Cập nhật Profile
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
                                            <Form.Label>Tên</Form.Label>
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
                                                    src={`/avatars/${values.avatar}`}
                                                    alt="avatar"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </div>
                                            <CRow>
                                                <CCol lg="7">
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
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <CRow>
                                        <CCol lg="3">
                                            <Form.Control
                                                name="dob"
                                                type="dob"
                                                value={values.dob}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                        {/* <CCol lg="1" className="pr-1">
                                            <Form.Control
                                                name="day"
                                                // value={values.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                        <CCol lg="1" className="pr-1">
                                            <Form.Control
                                                name="month"
                                                // value={values.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </CCol>
                                        <CCol lg="1" className="pr-1">
                                            <Form.Control
                                                name="year"
                                                // value={values.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </CCol> */}
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="6">
                                            <Form.Label>Số điện thoại</Form.Label>
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
                                            <Form.Label>Địa chỉ</Form.Label>
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
                                <Button onClick={() => handleSubmit()}>
                                    <FaSave className="mb-1" />
                                    <span className="ml-1">Lưu</span>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default FormInformation;
