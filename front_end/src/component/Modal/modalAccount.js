import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { Row, Col, Input,Select, Checkbox, Space, DatePicker, InputNumber } from "antd";
import { httpUpdateData } from '../../api/common.api';
import { showNotiError, showNotiSuccess } from './notification';
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../../utils/storageUtils';

const { Option } = Select;

const ModalAccount = (props) => {
    const [form1] = Form.useForm();
    let dataDetailUser = props.dataDetailUser;
    let [userData, setUserData] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        setUserData(dataDetailUser);
    },[dataDetailUser])    // để một biến bất kì và không thay đổi vào đây(e để dataDetailUser) để useEffect sẽ ko bị render lại
    const handleSubmit = async ()=>{
        let {id,...updateUserData} = userData;
        updateUserData['updated_at'] = new Date();
        updateUserData['old_id'] = id;
        const wait = await httpUpdateData(`admin/user/${id}/update` , updateUserData);
        if(wait){
            showNotiSuccess('Bạn đã cập nhật thông tin thành công');
            setTimeout(()=>{
                // window.location.reload(false);
                props.handleCancel();
            },700)
        }
        else{
            showNotiError('Bạn cập nhật thông tin KHÔNG thành công');
        }
        setLocalStorage('username', updateUserData.name);
    }
    const handleChange = (e,para)=>{
        let preState = {...userData};
        preState[para] = e.target.value;
        // console.log(preState[para]);
        setUserData({...preState});
    }
    return(
        <>
            <Modal
                title="Chỉnh sửa thông tin cá nhân"
                open = {props.isOpen}
                okText="Lưu"
                okType='primary'
                onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
                width={1000}
            >
                <br />
                <Row>
                    <Col span={10} >
                        <Form.Item label="Họ và tên">
                        <Input name="name" value={userData.name}  onChange={(e) => handleChange(e,'name')}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="Email">
                        <   Input name="email" value={userData.email} disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Gender" style={{marginTop: -25}}>
                        <Input name="gender" value={userData.gender} onChange={(e) => handleChange(e,'gender')}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="Data of birth" style={{marginTop: -25}}>
                        <Input name="birthday" value={userData.birthday} onChange={(e) => handleChange(e,'birthday')}/>
                        </Form.Item>
                    </Col>
                </Row>
        </Modal>
        </>
    )
};

export default ModalAccount;