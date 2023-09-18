import React from "react";
import { Row, Col, Image, Upload, Form, Input, Button, Select, DatePicker } from "antd";
import avatarDemo from "../../assets/icons/avatar.svg";
const { Option } = Select;
export default function Profile() {
  
  return (
    <div>
    <Col span={22} offset={1}>
      <br />
      <Row>
        <Col>
          <div>
            <Image width={100} src={avatarDemo}></Image>
          </div>
        </Col>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {/* {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )} */}
          </Upload>
        </Col>
      </Row>
      <br />
      <Form layout="vertical">
        <Row>
          <Col span={10}>
            <Form.Item label="Họ và tên">
              <Input value={''} name="fullname" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Giới tính">
                <Select
                placeholder="Chọn giới tính"
                allowClear
                name="gender"
                >
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Email">
              <Input value={''} name="email" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Ngày sinh">
                <DatePicker value={''} name="birthday" />  
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Số điện thoại">
              <Input value={''} name="email" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <Form.Item>
              <Button type="primary">Lưu</Button>
              <Button>Hủy bỏ</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  </div>
  );
}
