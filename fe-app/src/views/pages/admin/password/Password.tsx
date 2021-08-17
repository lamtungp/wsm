import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import userServices from '../../../../common/redux/user/services';

const fields = [
  {
    key: 'id',
    label: 'Id',
  },
  {
    key: 'name',
    label: 'Họ tên',
  },
  {
    key: 'email',
    label: 'Email',
    sorter: false,
  },
  {
    key: 'password',
    label: 'Mật khẩu',
    sorter: false,
  },
  {
    key: 'show_details',
    label: '',
    _style: { width: '15%' },
    sorter: false,
    filter: false,
  },
];

const Users = () => {
  const history = useHistory();
  const [listUser, setListUser] = useState([{ id: '', name: '', email: '', password: '' }]);

  React.useEffect(() => {
    getListUser();
  }, []);

  const getListUser = async () => {
    try {
      const res = await userServices.getAllUser();
      // console.log(res);
      setListUser(res.data);
    } catch (error) {
      history.push('/error/500');
    }
  };

  const handlePassword = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const resetPassword = async (email: string) => {
    try {
      await userServices.resetPassword({ email: email, password: handlePassword(8) });
      getListUser();
      window.alert('Reset mật khẩu thành công');
    } catch (error) {
      window.alert('Xảy ra lỗi khi cập nhật');
    }
  };

  return (
    <div>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                Thông tin tài khoản
              </h2>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listUser}
                hover
                striped
                border
                size="md"
                fields={fields}
                itemsPerPage={10}
                tableFilter
                sorter
                pagination
                scopedSlots={{
                  // eslint-disable-next-line react/display-name
                  show_details: (item: any) => {
                    return (
                      <td>
                        <div className="d-flex justify-content-center">
                          <CButton
                            className="mr-2"
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              resetPassword(String(item.email));
                            }}
                          >
                            Reset mật khẩu
                          </CButton>
                        </div>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Users;
