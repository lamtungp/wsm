import React from 'react';
import { CContainer, CLink } from '@coreui/react';

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className="align-items-center p-5">
            <CContainer className="text-center">
                <div className="bg-success text-light p-5">
                    <h3>Tài khoản được reset mật khẩu thành công!!</h3>
                    <p>Vui lòng đổi mật khẩu ngay sau khi đăng nhập</p>
                    <p>Quay lại đăng nhập</p>
                    <CLink
                        to="/"
                        onClick={() => {
                            localStorage.removeItem('email');
                            localStorage.removeItem('userId');
                            localStorage.removeItem('token');
                            localStorage.removeItem('vacationDay');
                            localStorage.removeItem('role');
                        }}
                    >
                        Login
                    </CLink>
                </div>
            </CContainer>
        </div>
    );
};

export default ResetPassword;
