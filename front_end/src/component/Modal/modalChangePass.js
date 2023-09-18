import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { Row, Col, Input,Select, Checkbox, Space, DatePicker, InputNumber } from "antd";
import { httpUpdateData } from '../../api/common.api';
import { showNotiError, showNotiSuccess } from './notification';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtils';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../features/Auth/AuthSlice';
import {EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ModalChangePass = (props) => {
    const [form1] = Form.useForm();
    const [pass,setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [eyePass, setEyePass] = useState(false);
    const [eyeNewPass, setEyeNewPass] = useState(false);
    const [eyeConfirmPass, setEyeConfirmPass] = useState(false);

    const dispatch = useDispatch();
    let id = getLocalStorage('idUsername');
    const handleSubmit = async ()=>{
        let values = {
            id: id,
            pass: pass,
            new_pass: newPass,
            confirm_pass: confirmPass,
        }
        dispatch(changePassword(values));
        props.handleCancel();
    }
    
    return(
        <>
            <Modal
                title="Đổi mật khẩu"
                open = {props.isOpen}
                okText="Đổi"
                okType='primary'
                onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
                width={500}
            >
                <br />
                <Row>
                    <Col span={10} style={{marginTop: -25, position: 'relative'}}>
                        <Form.Item label="Nhập mật khẩu hiện tại" >
                            <Input style={{width:300}} type = {(eyePass) ? "text" : "password"} name="pass" onChange={(e) => setPass(e.target.value)}/>
                            <div style={{position: 'absolute', top: 3, left: 320}}>
                                {(eyePass) ?  <EyeOutlined onClick={()=> setEyePass(!eyePass)}/> : <EyeInvisibleOutlined onClick={()=> setEyePass(!eyePass)}/>}

                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} style={{marginTop: -25, position: 'relative'}}>
                        <Form.Item label="Nhập mật khẩu mới" >
                            <Input style={{width:300}} type={(eyeNewPass) ? "text" : "password"} name="new_pass" onChange={(e) => setNewPass(e.target.value)}/>
                            <div style={{position: 'absolute', top: 3, left: 320}}>
                                {(eyeNewPass) ?  <EyeOutlined onClick={()=> setEyeNewPass(!eyeNewPass)}/> : <EyeInvisibleOutlined onClick={()=> setEyeNewPass(!eyeNewPass)}/>}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} style={{marginTop: -25, position: 'relative'}}>
                        <Form.Item label="Xác nhận nhập lại mật khẩu mới">
                            <Input style={{width:300}} type={(eyeConfirmPass) ? "text" : "password"} name="confirm_pass" onChange={(e) => setConfirmPass(e.target.value)}/>
                            <div style={{position: 'absolute', top: 3, left: 320}}>
                                {(eyeConfirmPass) ?  <EyeOutlined onClick={()=> setEyeConfirmPass(!eyeConfirmPass)}/> : <EyeInvisibleOutlined onClick={()=> setEyeConfirmPass(!eyeConfirmPass)}/>}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
        </Modal>
        </>
    )
};

export default ModalChangePass;