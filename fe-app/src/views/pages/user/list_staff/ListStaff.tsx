import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import userService from '../../../../common/redux/user/services';

import { ExportToExcel } from './ExportToExcel';

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
];

const ListStaff = () => {
  const [listUser, setListUser] = useState([{}]);

  React.useEffect(() => {
    if (localStorage.getItem('role') === 'manager') {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const res = await userService.getListStaff(String(localStorage.getItem('email')));
    setListUser(res.data);
  };

  listUser.map((user: any) => {
    delete user['password'];
  });

  return (
    <>
      {localStorage.getItem('role') === 'manager' ? (
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                  Thông tin nhân viên
                </h2>
              </CCardHeader>
              <CCardBody className="text-center">
                <CDataTable
                  items={listUser}
                  hover
                  striped
                  border
                  size="md"
                  fields={fields}
                  itemsPerPage={10}
                  tableFilter
                  pagination
                  scopedSlots={{
                    // eslint-disable-next-line react/display-name
                    id: (_item: any, index: any) => {
                      return <td>{index + 1}</td>;
                    },
                  }}
                />
                <ExportToExcel prop={{ apiData: listUser, fileName: 'DanhSachNhanVien' }} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListStaff;
