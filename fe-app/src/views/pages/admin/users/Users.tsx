import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';
import { Helmet } from 'react-helmet';

import userService from '../../../../common/redux/user/services';

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
    key: 'gender',
    label: 'Giới tính',
    sorter: false,
  },
  {
    key: 'dob',
    label: 'Ngày sinh',
    sorter: false,
  },
  {
    key: 'phoneNumber',
    label: 'SĐT',
    sorter: false,
  },
  {
    key: 'address',
    label: 'Địa chỉ',
    sorter: false,
  },
  {
    key: 'role',
    label: 'Chức vụ',
    sorter: false,
  },
  {
    key: 'show_details',
    label: '',
    sorter: false,
    filter: false,
  },
];

const Users = () => {
  const history = useHistory();
  const [listUser, setListUser] = useState([{ id: '', email: '', password: '' }]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await userService.getAllUser();
      setListUser(res.data);
    } catch (error) {
      history.push('/error/500');
    }
  };

  const deleteUser = async (email: string) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn thực hiện xóa ?')) {
        await userService.deleteUser(email);
        getUsers();
      }
    } catch (error) {
      console.log('Xảy ra lỗi khi xóa');
    }
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Users component" />
      </Helmet>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                Thông tin nhân viên
              </h2>
            </CCardHeader>
            <CCardHeader style={{ border: 'none' }}>
              <CButton
                className="btn-primary"
                onClick={() => {
                  history.push('/admin/users/add-user');
                }}
              >
                + Thêm nhân viên
              </CButton>
            </CCardHeader>
            <CCardBody className="text-center">
              <CDataTable
                items={listUser}
                hover
                striped
                border
                size="sm"
                fields={fields}
                itemsPerPage={10}
                tableFilter
                pagination
                scopedSlots={{
                  // eslint-disable-next-line react/display-name
                  id: (_item: any, index: any) => {
                    return <td>{index + 1}</td>;
                  },
                  // eslint-disable-next-line react/display-name
                  role: (item: any) => {
                    return <td>{item.role}</td>;
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
                              history.push(`/admin/users/update-user/${item.email}`);
                            }}
                          >
                            Sửa
                          </CButton>
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              deleteUser(item.email);
                            }}
                          >
                            Xóa
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
    </>
  );
};

export default Users;
