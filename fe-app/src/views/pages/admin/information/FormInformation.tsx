import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react';
import { FaSave } from 'react-icons/fa';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import userService from '../../../../common/redux/user/services';
import { SetAvatar } from '../../../../common/redux/user/actions';

const FormInformation = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    address: '',
    avatar: '',
    contractTerm: '',
    dayIn: '',
    dayOfficial: '',
    dob: dayjs().format('YYYY-MM-DD'),
    name: '',
    phoneNumber: '',
    senority: '',
    gender: '',
    vacationsDay: '0',
  });

  React.useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    const res = await userService.getUserByEmail(String(localStorage.getItem('email')));
    delete res.data['id'];
    delete res.data['email'];
    setUser(res.data);
  };

  const handle = async (values: any) => {
    try {
      await userService.updateUserRoleAdmin(values, String(localStorage.getItem('email')));
      dispatch(SetAvatar(values.avatar));
      window.location.pathname = '/admin/profile';
    } catch (error) {
      window.alert('Xảy ra lỗi khi cập nhật');
    }
  };

  const uploadToMinio = async (file: File) => {
    const { data } = await axios({
      baseURL: 'http://localhost:4000/api/v1',
      url: '/user/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: file.name,
        type: file.type,
        userId: localStorage.getItem('userId'),
      },
    });

    const { signedData } = data.data;
    const formData = new FormData();

    formData.append('AWSAccessKeyId', signedData.AWSAccessKeyId);
    formData.append('Content-Type', signedData['Content-Type']);
    formData.append('Expires', signedData.Expires);
    formData.append('filename', signedData.filename);
    formData.append('key', signedData.key);
    formData.append('policy', signedData.policy);
    formData.append('signature', signedData.signature);
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post(data.data.actionUrl, formData, config);
    setUser({ ...user, avatar: data.data.url });
  };

  return (
    <>
      <Helmet>
        <title>Edit Information</title>
        <meta name="description" content="Edit Information component" />
      </Helmet>
      <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
        <CCardHeader className="d-flex">
          <h2 className="m-0 font-weight-bold d-flex" style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}>
            Cập nhật Profile
          </h2>
        </CCardHeader>
        <CCardBody>
          <div>
            <Formik
              initialValues={user}
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
                        <Form.Label>
                          Họ Tên
                          <span className="text-danger">(*)</span>
                        </Form.Label>
                        <Form.Control name="name" type="name" value={values.name} onChange={handleChange} />
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
                            height: '12rem',
                            padding: '3px',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                          }}
                        >
                          <img
                            src={values.avatar ? `${values.avatar}` : '/avatars/no-avatar.jpg'}
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
                              accept="image/png, image/jpeg"
                              onChange={(e: any) => {
                                if (e.target.value) {
                                  const file = e.target.files[0];
                                  uploadToMinio(e.target.files[0]);
                                  setFieldValue('avatar', file);
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
                    <Form.Label>
                      Giới tính
                      <span className="text-danger">(*)</span>
                    </Form.Label>
                    <CRow>
                      <CCol lg="2" className="pr-1">
                        <label>
                          {values.gender === 'male' ? (
                            <Field type="radio" name="gender" id="male" value="male" checked />
                          ) : (
                            <Field type="radio" name="gender" id="male" value="male" />
                          )}

                          <label htmlFor="male" className="ml-1">
                            Male
                          </label>
                        </label>
                      </CCol>
                      <CCol lg="2" className="px-1">
                        <label>
                          {values.gender === 'female' ? (
                            <Field type="radio" name="gender" id="female" value="female" checked />
                          ) : (
                            <Field type="radio" name="gender" id="female" value="female" />
                          )}
                          <label htmlFor="female" className="ml-1">
                            Female
                          </label>
                        </label>
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Ngày sinh
                      <span className="text-danger">(*)</span>
                    </Form.Label>
                    <CRow>
                      <CCol lg="3">
                        <Form.Control name="dob" type="date" value={values.dob} onChange={handleChange} />
                      </CCol>
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
                        <Form.Control name="address" type="address" value={values.address} onChange={handleChange} />
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
    </>
  );
};

export default FormInformation;
