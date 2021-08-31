import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Helmet } from 'react-helmet';

import userService from '../../../../common/redux/user/services';

import { ExportToExcel } from './ExportToExcel';

dayjs.extend(customParseFormat);

const fields = [
  {
    key: 'id',
    label: 'Id',
  },
  {
    key: 'name',
    label: 'Họ tên',
    sorter: false,
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
    key: 'time',
    label: 'Số giờ làm việc',
    sorter: false,
  },
];

const WorkingHours: React.FunctionComponent = (): React.ReactElement => {
  const [listUser, setListUser] = useState([
    { id: '', checkin: '', checkout: '', time: 0, checkins: [{}], gender: '' },
  ]);

  React.useEffect(() => {
    if (localStorage.getItem('role') === 'manager') {
      getUsers();
    }
  }, []);

  const handleTime = (s: string) => {
    const arr = s.split(':');
    return +arr[0] * 3600 + +arr[1] * 60;
  };

  const handleDate = (date: Date) => {
    const str = dayjs(date.toUTCString()).format('M-YYYY');
    return str;
  };

  const getUsers = async () => {
    const res = await userService.getStaffWithCheckin(String(localStorage.getItem('email')), handleDate(new Date()));
    setListUser(res.data);
  };

  listUser.map((user: any) => {
    let t = 0;
    if (!!user.checkins) {
      user.checkins.map((item: any) => {
        if (!!!item.checkout) {
          t += 0;
        } else {
          const second = handleTime(item.checkout) - handleTime(item.checkin);
          const h = Math.round((second / 3600) * 1000) / 1000;
          t += h;
        }
      });
      user.time = t;
      delete user['checkins'];
    }
  });

  return (
    <>
      <Helmet>
        <title>Working Hours</title>
        <meta name="description" content="Working Hours component" />
      </Helmet>
      {localStorage.getItem('role') === 'manager' ? (
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                  Thông tin nhân viên cấp dưới
                </h2>
              </CCardHeader>
              <CCardBody className="text-center">
                <CCardHeader>
                  <h5 className="m-0 font-weight-bold">
                    Thống kê giờ làm việc nhân viên tháng: {handleDate(new Date())}
                  </h5>
                </CCardHeader>
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
                <ExportToExcel prop={{ apiData: listUser, fileName: 'WorkingHours' }} />
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

export default WorkingHours;
