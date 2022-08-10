import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaSave, FaEye } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import userServices from '../../../../common/redux/user/services';

const PasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Mật khẩu quá ngắn!').required('Required!'),
  // confirmPassword: Yup.string().test('match', 'Mật khẩu không trùng khớp', () => {
  //   return this.parent.password === this.parent.confirmPassword;
  // }),
});

const ChangePassword: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const [showPassword, setshowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handle = async (values: any) => {
    try {
      await userServices.changePassword(values);
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('vacationsDay');
      if (window.confirm('Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!')) {
        history.push('/');
      }
    } catch (error) {
      window.alert('Xảy ra lỗi khi thay đổi mật khẩu!');
    }
  };

  return (
    <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Password component" />
      </Helmet>
      <CCardHeader className="d-flex">
        <h2 className="m-0 font-weight-bold d-flex" style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}>
          Thay đổi mật khẩu
        </h2>
      </CCardHeader>
      <CCardBody>
        <div>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={PasswordSchema}
            enableReinitialize
            onSubmit={(values) => {
              console.log(values);
              if (values.password !== values.confirmPassword) {
                setError('Mật khẩu không trùng khớp!');
              } else {
                setError('');
                if (window.confirm('Bạn có chắc chắn muốn thay đổi mật khẩu?')) {
                  handle({ password: values.password });
                }
              }
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
                  <CRow>
                    <CCol lg="6">
                      <Form.Label>
                        Nhập mật khẩu mới:
                        <span className="text-danger"> (*)</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange}
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon1"
                          onClick={() => setshowPassword(!showPassword)}
                        >
                          <FaEye />
                        </Button>
                      </InputGroup>
                      {errors.password && touched.password ? (
                        <Form.Text className="text-danger">{errors.password}</Form.Text>
                      ) : null}
                    </CCol>
                  </CRow>
                </Form.Group>
                <Form.Group>
                  <CRow>
                    <CCol lg="6">
                      <Form.Label>
                        Xác nhận mật khẩu:
                        <span className="text-danger"> (*)</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={values.confirmPassword}
                          onChange={handleChange}
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon1"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <FaEye />
                        </Button>
                      </InputGroup>

                      {error ? <Form.Text className="text-danger">{error}</Form.Text> : null}
                    </CCol>
                  </CRow>
                </Form.Group>
                <Button onClick={() => handleSubmit()}>
                  <FaSave className="mb-1" />
                  <span className="ml-1">Cập nhật</span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ChangePassword;
