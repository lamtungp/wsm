import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';
import { Helmet } from 'react-helmet';

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
    key: 'show_details',
    label: '',
    _style: { width: '15%' },
    sorter: false,
    filter: false,
  },
];

const Users = () => {
  const [listUser, setListUser] = useState([{ id: '', name: '', email: '', password: '' }]);

  React.useEffect(() => {
    getListUser();
  }, []);

  const getListUser = async () => {
    const res = await userServices.getAllUser();
    setListUser(res.data);
  };

  const resetPassword = async (email: string) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn reset mật khẩu cho tài khoản này')) {
        await userServices.resetPassword({ email: email });
        getListUser();
        window.alert('Reset mật khẩu thành công');
      }
    } catch (error) {
      window.alert('Xảy ra lỗi khi cập nhật');
    }
  };

  return (
    <div>
      <Helmet>
        <title> Reset Password</title>
        <meta name="description" content="Password component" />
      </Helmet>
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
                  id: (_item: any, index: any) => {
                    return <td>{index + 1}</td>;
                  },
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
