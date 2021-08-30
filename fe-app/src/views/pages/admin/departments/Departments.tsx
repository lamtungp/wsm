import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CDataTable, CRow, CCardHeader } from '@coreui/react';

import departmentService from '../../../../common/redux/department/services';
import { department } from '../../../../interfaces/deparment.d';

const fields = [
  {
    key: 'id',
    label: 'Id',
  },
  {
    key: 'nameDepartment',
    label: 'Tên phòng',
  },
  {
    key: 'description',
    label: 'Mô tả',
    sorter: false,
  },
  {
    key: 'show_details',
    label: '',
    _style: { width: '15%', height: '100%' },
    sorter: false,
    filter: false,
  },
];

const Departments: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const [listdepartment, setListdepartment] = useState<department[]>([]);

  React.useEffect(() => {
    getListDepartment();
  }, []);

  const getListDepartment = async () => {
    const res = await departmentService.getAllDepartment();
    setListdepartment(res.data);
  };

  const deletedepartment = async (id: number) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn thực hiện xóa ?')) {
        await departmentService.deleteDepartment(id);
        getListDepartment();
      }
    } catch (error) {
      window.alert('Xảy ra lỗi khi xóa');
    }
  };

  return (
    <div>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h2 className="m-0 font-weight-bold d-flex" style={{ fontSize: '13px', lineHeight: '1.57' }}>
                Thông tin các phòng
              </h2>
            </CCardHeader>
            <CCardHeader style={{ border: 'none' }}>
              <CButton
                className="btn-primary"
                onClick={() => {
                  history.push('/admin/departments/add-department');
                }}
              >
                + Thêm phòng
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listdepartment}
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
                              history.push(`/admin/departments/update-department/${item.id}`);
                            }}
                          >
                            Sửa
                          </CButton>
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              deletedepartment(item.id);
                            }}
                          >
                            Xóa
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

export default Departments;
