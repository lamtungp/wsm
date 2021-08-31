import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { FaSave } from 'react-icons/fa';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import userService from '../../../../common/redux/user/services';
import departmentServices from '../../../../common/redux/department/services';

dayjs.extend(customParseFormat);

const FormUser = () => {
  const history = useHistory();
  const params = useParams();
  const email = String(Object.values(params)[0]);

  const UserSchema =
    email === 'undefined'
      ? Yup.object().shape({
          name: Yup.string().min(1, 'Too short!').required('Required!'),
          email: Yup.string().min(2, 'Too short!').required('Required!').email('Invalid email'),
          dayIn: Yup.string().required('Required!'),
        })
      : Yup.object().shape({
          name: Yup.string().min(1, 'Too short!').required('Required!'),
          dayIn: Yup.string().required('Required!'),
        });

  const [senority, setSenority] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: 'no-avatar.jpg',
    address: '',
    dayIn: '',
    dayOfficial: '',
    dob: '',
    phoneNumber: '',
    senority: senority,
    contractTerm: 'Chưa có hợp đồng chính thức',
    vacationsDay: 0,
    gender: 'male',
    role: 'user',
    departmentId: 1,
  });

  const [departments, setDepartments] = useState([
    {
      id: '',
      nameDepartment: '',
    },
  ]);

  const getUser = async () => {
    try {
      const _user = await userService.getUserByEmail(email);
      if (!!_user.data.dayOfficial) {
        setSenority(handleSenority(new Date(_user.data.dayOfficial), new Date()));
      }
      delete _user.data['id'];
      delete _user.data['email'];
      setUser(_user.data);
    } catch (error) {
      history.push('/error/500');
    }
  };

  const getDepartment = async () => {
    const department = await departmentServices.getAllDepartment();
    setDepartments(department.data);
  };

  const handleSenority = (start: Date, current: Date) => {
    const diff = new Date(current.getTime() - start.getTime());
    return `${diff.getUTCFullYear() - 1970} năm ${diff.getUTCMonth()} tháng ${diff.getUTCDate()} ngày`;
  };

  useEffect(() => {
    if (email !== 'undefined') {
      getUser();
    }
    getDepartment();
  }, []);

  const handle = async (values: any) => {
    if (email !== 'undefined') {
      try {
        await userService.updateUserRoleAdmin(values, email);
        await userService.getAllUser();
        history.push('/admin/users');
      } catch (error) {
        window.alert('Xảy ra lỗi khi cập nhật');
      }
    } else {
      try {
        await userService.addUser(values);
        await userService.getAllUser();
        history.push('/admin/users');
      } catch (error) {
        window.alert('Xảy ra lỗi khi tạo mới');
      }
    }
  };

  return (
    <>
      <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
        <CCardHeader className="d-flex">
          <h2 className="m-0 font-weight-bold d-flex" style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}>
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
                handle(values);
              }}
              validateOnChange={true}
              // validateOnBlur={false}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                        <Form.Label className="font-weight-bold">
                          Họ tên <span className="text-danger">(*)</span>
                        </Form.Label>
                        <Form.Control name="name" type="text" value={values.name} onChange={handleChange} />
                      </CCol>
                    </CRow>
                    {errors.name && touched.name ? <Form.Text className="text-danger">{errors.name}</Form.Text> : null}
                  </Form.Group>
                  {email === 'undefined' ? (
                    <>
                      <Form.Group>
                        <CRow>
                          <CCol lg="5">
                            <Form.Label className="font-weight-bold">
                              Email <span className="text-danger">(*)</span>
                            </Form.Label>
                            <Form.Control name="email" type="email" value={values.email} onChange={handleChange} />
                          </CCol>
                        </CRow>
                        {errors.email && touched.email ? (
                          <Form.Text className="text-danger">{errors.email}</Form.Text>
                        ) : null}
                      </Form.Group>
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Giới tính <span className="text-danger">(*)</span>
                    </Form.Label>
                    <CRow>
                      <CCol lg="2" className="pr-1">
                        <label className="m-0">
                          <Field type="radio" name="gender" value="male" />
                          <label className="ml-1">Nam</label>
                        </label>
                      </CCol>
                      <CCol lg="2" className="px-1">
                        <label className="m-0">
                          <Field type="radio" name="gender" value="female" />
                          <label className="ml-1">Nữ</label>
                        </label>
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">Ngày sinh:</Form.Label>
                        <Form.Control name="dob" type="date" value={values.dob} onChange={handleChange} />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">Số điện thoại</Form.Label>
                        <Form.Control
                          name="phoneNumber"
                          type="text"
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="6">
                        <Form.Label className="font-weight-bold">Địa chỉ</Form.Label>
                        <Form.Control name="address" type="text" value={values.address} onChange={handleChange} />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">
                          Ngày vào <span className="text-danger">(*)</span>
                        </Form.Label>
                        <Form.Control name="dayIn" type="date" value={values.dayIn} onChange={handleChange} />
                      </CCol>
                    </CRow>
                    {errors.dayIn && touched.dayIn ? (
                      <Form.Text className="text-danger">{errors.dayIn}</Form.Text>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">Ngày chính thức</Form.Label>
                        <Form.Control
                          name="dayOfficial"
                          type="date"
                          value={values.dayOfficial}
                          onChange={(e: any) => {
                            values.dayOfficial = e.target.value;
                            setSenority(handleSenority(new Date(e.target.value), new Date()));
                            values.senority = handleSenority(new Date(e.target.value), new Date());
                          }}
                        />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">Thời hạn hợp đồng</Form.Label>
                        <Form.Control
                          name="contractTerm"
                          as="select"
                          value={values.contractTerm}
                          onChange={handleChange}
                        >
                          <option value="Chưa có hợp đồng chính thức">Chưa có hợp đồng chính thức</option>
                          <option value="1 năm">1 năm</option>
                          <option value="2 năm">2 năm</option>
                          <option value="3 năm">3 năm</option>
                          <option value="4 năm">4 năm</option>
                          <option value="5 năm">5 năm</option>
                        </Form.Control>
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="3">
                        <Form.Label className="font-weight-bold">Số ngày nghỉ phép</Form.Label>
                        <Form.Control
                          name="vacationsDay"
                          type="number"
                          value={values.vacationsDay}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">Thâm niên</Form.Label>
                        <Form.Control name="senority" type="text" value={values.senority} onChange={handleChange} />
                      </CCol>
                    </CRow>
                  </Form.Group>
                  <Form.Group>
                    <CRow>
                      <CCol lg="4">
                        <Form.Label className="font-weight-bold">
                          Phân quyền <span className="text-danger">(*)</span>
                        </Form.Label>
                        <Form.Control name="role" as="select" value={values.role} onChange={handleChange}>
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
                        <Form.Label className="font-weight-bold">
                          Department <span className="text-danger">(*)</span>
                        </Form.Label>
                        <Form.Control
                          name="departmentId"
                          as="select"
                          value={values.departmentId}
                          onChange={handleChange}
                        >
                          {!!departments ? (
                            <>
                              {departments.map((item, index) => {
                                return (
                                  <option key={index} value={Number(item.id)}>
                                    {item.nameDepartment}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <option>Không có dữ liệu</option>
                          )}
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
    </>
  );
};

export default FormUser;
