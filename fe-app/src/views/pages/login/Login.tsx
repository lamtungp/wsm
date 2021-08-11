import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CLink, CRow } from '@coreui/react';

import { login } from '../../../common/redux/auth/actions';
import { GlobalState } from '../../../common/redux';

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Required!').email('Invalid email'),
  password: Yup.string().required('Required!'),
});

const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = React.useState('');
  const loginFail = useSelector((state: GlobalState) => state.auth.user);

  // console.log(err);
  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(login(values));
  };

  React.useEffect(() => {
    if (loginFail.status === 'failure') {
      setErr('Tài khoản hoặc mật khẩu không đúng!');
    }
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer style={{ width: '40rem' }}>
        <CCardGroup>
          <CCard className="p-4">
            <CCardBody>
              <h1>Login</h1>
              <p className="text-muted">Sign In to your account</p>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleLogin(values);
                }}
                validateOnChange={true}
                // validateOnBlur={false}
              >
                {({ handleChange, handleSubmit, errors, touched }) => (
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
                      {errors.email && touched.email ? (
                        <Form.Text className="text-danger">{errors.email}</Form.Text>
                      ) : null}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
                      {errors.password && touched.password ? (
                        <Form.Text className="text-danger">{errors.password}</Form.Text>
                      ) : null}
                      {/* <Form.Text>{error}</Form.Text> */}
                    </Form.Group>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={() => handleSubmit()}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CLink color="link" to="/forgot-password" className="px-0">
                          Forgot password?
                        </CLink>
                      </CCol>
                    </CRow>
                    {!!err ? <Form.Text className="text-danger mt-3">{err}</Form.Text> : <></>}
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

export default Login;
