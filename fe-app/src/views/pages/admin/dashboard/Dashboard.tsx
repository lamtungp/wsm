import { CRow, CCol } from '@coreui/react';
import React, { useState } from 'react';
import { FaBusinessTime, FaCalendarCheck, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import departmentServices from '../../../../common/redux/department/services';
import requestServices from '../../../../common/redux/request/services';
import userServices from '../../../../common/redux/user/services';

import WidgetDropdown from './WidgetDropdown';

const Dashboard: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();

  const [numberUser, setNumberUser] = useState(0);
  const [numberDepartment, setNumberDepartment] = useState(0);
  const [numberRequest, setNumberRequest] = useState(0);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const number_users = (await userServices.getAllUser()).data.length;
      const number_departments = (await departmentServices.getAllDepartment()).data.length;
      const number_requests = (await requestServices.findRequestByState('pending')).data.length;
      setNumberUser(number_users);
      setNumberDepartment(number_departments);
      setNumberRequest(number_requests);
    } catch (error) {
      history.push('/error/500');
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard component" />
      </Helmet>
      <CRow>
        <CCol sm="6" md="6" lg="3">
          <WidgetDropdown
            widget={{
              color: 'gradient-primary',
              header: String(numberUser),
              text: 'Members',
              path: '/admin/users',
              icon: <FaUserPlus style={{ height: '80px', width: '30%', opacity: 0.9 }} />,
            }}
          />
        </CCol>

        <CCol sm="6" md="6" lg="3">
          <WidgetDropdown
            widget={{
              color: 'gradient-info',
              header: String(numberDepartment),
              text: 'Departments',
              path: '/admin/departments',
              icon: <FaUsers style={{ height: '70px', width: '30%', opacity: 0.9 }} />,
            }}
          />
        </CCol>

        <CCol sm="6" md="6" lg="3">
          <WidgetDropdown
            widget={{
              color: 'gradient-warning',
              header: String(numberRequest),
              text: 'Requests pending',
              path: '/admin/requestings',
              icon: <FaCalendarCheck style={{ height: '70px', width: '30%', opacity: 0.9 }} />,
            }}
          />
        </CCol>

        <CCol sm="6" md="6" lg="3">
          <WidgetDropdown
            widget={{
              color: 'gradient-danger',
              header: '9.823',
              text: 'Working hours',
              path: '/admin/working_hours',
              icon: <FaBusinessTime style={{ height: '80px', width: '30%', opacity: 0.9 }} />,
            }}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
