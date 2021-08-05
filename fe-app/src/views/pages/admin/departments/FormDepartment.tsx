import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import { FaSave } from 'react-icons/fa';

import departmentService from '../../../../common/redux/department/services';

const DepartmentSchema = Yup.object().shape({
    nameDepartment: Yup.string().min(2, 'Too short!').required('Required!'),
    description: Yup.string().min(2, 'Too Short!').required('Required!'),
});

const FormRoom = () => {
    const history = useHistory();
    const params = useParams();

    const [department, setDepartment] = useState({
        id: '',
        nameDepartment: '',
        description: '',
    });
    const idDepartment = Number(Object.values(params)[0]);
    useEffect(() => {
        if (idDepartment) {
            getItem();
        }
    }, []);

    const getItem = async () => {
        try {
            const _department = await departmentService.findDepartmentById(idDepartment);
            setDepartment(_department);
        } catch (error) {}
    };

    const handle = async (values: any) => {
        if (!!values.id) {
            try {
                await departmentService.updateDepartment(values, values.id);
                await departmentService.getAllDepartment();
                history.push('/admin/departments');
            } catch (error) {
                window.alert('Xảy ra lỗi khi cập nhật');
            }
        } else {
            try {
                await departmentService.addDepartment(values);
                await departmentService.getAllDepartment();
                history.push('/admin/departments');
            } catch (error) {
                window.alert('Xảy ra lỗi khi tạo mới');
            }
        }
    };

    return (
        <CCard className="w3-margin-top login" style={{ backgroundColor: '#fff' }}>
            <CCardHeader className="d-flex">
                <h2
                    className="m-0 font-weight-bold d-flex"
                    style={{ width: '82%', fontSize: '13px', lineHeight: '1.57' }}
                >
                    Nhập thông tin phòng
                </h2>
            </CCardHeader>
            <CCardBody>
                <div>
                    <Formik
                        initialValues={department}
                        validationSchema={DepartmentSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            console.log(values);
                            handle(values);
                        }}
                        validateOnChange={true}
                        // validateOnBlur={false}
                    >
                        {({ handleChange, handleSubmit, errors, touched, values }) => (
                            <Form
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                            >
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="5">
                                            <Form.Label>Tên phòng:</Form.Label>
                                            <Form.Control
                                                name="nameDepartment"
                                                type="text"
                                                value={values.nameDepartment}
                                                onChange={handleChange}
                                            />
                                            {errors.nameDepartment && touched.nameDepartment ? (
                                                <Form.Text className="text-danger">{errors.nameDepartment}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Form.Group>
                                    <CRow>
                                        <CCol lg="5">
                                            <Form.Label>Mô tả:</Form.Label>
                                            <Form.Control
                                                name="description"
                                                type="text"
                                                value={values.description}
                                                onChange={handleChange}
                                            />
                                            {errors.description && touched.description ? (
                                                <Form.Text className="text-danger">{errors.description}</Form.Text>
                                            ) : null}
                                        </CCol>
                                    </CRow>
                                </Form.Group>
                                <Button onClick={() => handleSubmit()}>
                                    <FaSave className="mb-1 mr-1" />
                                    <span>Lưu</span>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default FormRoom;
