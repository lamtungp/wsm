import { CContainer, CLink } from '@coreui/react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import userServices from '../../../common/redux/user/services';

const ConfirmAccount: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();
    const param = useParams();
    const confirmationCode = String(Object.values(param)[0]);
    React.useEffect(() => {
        confirm();
    }, []);

    const confirm = async () => {
        try {
            await userServices.verifyUser(confirmationCode);
        } catch (error) {
            history.push('/error/500');
        }
    };

    return (
        <div className="align-items-center p-5">
            <CContainer className="text-center">
                <div className="bg-success text-light p-5">
                    <h3>Tài khoản được kích hoạt thành công!!</h3>
                    <p>Vui lòng đổi mật khẩu trong lần đầu đăng nhập</p>
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

export default ConfirmAccount;
