import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { Row, Col, Input,Select, Checkbox, Space, DatePicker, InputNumber } from "antd";
import OneChart from './chart_component/chart';
import { httpGetData, httpPostData } from '../../api/common.api';

const { Option } = Select;

const ModalData = (props) => {
    let temp1 = props.dataTypeOfDataPrev.dataAverg;    // Gán giá trị data lấy theo chỉ số Temperature và gán cho khởi tạo của useState dòng 13
    let temp2 = props.dataTypeOfDataPrev.dataAvergMinMax;   // Gán object các giá trị trung bình, min, max và làm đầu vào khởi tạo useState dòng 14
    const [form1] = Form.useForm();
    const [data, setData] = useState(temp1);                         //Để gán dữ liệu data trả về của backend
    const [dataAvergMinMax, setDataAvergMinMax] = useState(temp2);   // Để gán giá trị trung bình và giá trị max,min của data
    const [typeOfData, setTypeOfData] = useState('Temperature');             // gán kiểu dữ liệu muốn hiển thị
    const handleSubmit = ()=>{
        props.handleCancel();
    }
    const temperature ='Temperature', humidity = 'Humidity',pressure = 'Pressure',
    pm1 = 'PM1', pm25 ='PM25',pm10 ='PM10', uv = 'UV';
    let dateToGetData = props.dateToGetData;
    let sensor = props.sensor;

    // const dataSensor = await httpPostData(`/${values.typeof_data}`,{dateToGetData,sensor});


    const handleSubmitTypeofData = async (values)=>{
        const dataSensor = await httpPostData(`/${values.typeof_data}`,{dateToGetData,sensor});
        setDataAvergMinMax(dataSensor.data.dataAvergMinMax);
        let data = dataSensor.data.dataAverg;
        for(let i =0 ; i< data.length; i++){
            let date = new Date (data[i].time * 1000);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            data[i].timeConvert = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        setData(data);
        setTypeOfData(values.typeof_data);
        // const data = dataSensor.data.data;
        // let dataAverg = []
        // if(data.length > 90){
        //         let n = Math.floor(data.length/90 + 1);
        //         console.log(n);
        //         let length = Math.floor(data.length/n + 1);
        //         for(let i = 0 ; i< length; i++){
        //             if( i == (length-1)){
        //                 if(((data.length - 1) - ((n-1)+(i-1)*n)) === 1){
        //                     const {time,topic,__v,_id, ...values} =  data[data.length-1];
        //                     console.log(values);
        //                     dataAverg[i] = values;
        //                 }
        //                 if(((data.length-1) - ((n-1)+(i-1)*n)) > 1 && ((data.length-1) - ((n-1)+(i-1)*n)) < n){
        //                     let sumTime = 0,sumPM25 = 0,sumPM10 = 0,sumPM1 = 0,sumTemp = 0,sumHumi = 0,sumPress = 0, sumUV = 0;
        //                     for(let k = n+(i-1)*n ; k < data.length; k++){
        //                         sumTime += data[k].time;
        //                         sumPM25 += data[k].PM25;
        //                         sumPM10 += data[k].PM10;
        //                         sumPM1 += data[k].PM1;
        //                         sumTemp += data[k].Temperature;
        //                         sumHumi += data[k].Humidity;
        //                         sumPress += data[k].Pressure;
        //                         sumUV += data[k].UV;
        //                     }
        //                     let values = {
        //                         time: Math.floor(sumTime/((data.length-1) - ((n-1)+(i-1)*n))),
        //                         PM25: sumPM25/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         PM10: sumPM10/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         PM1: sumPM1/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         Temperature: sumTemp/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         Humidity: sumHumi/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         Pressure: sumPress/((data.length-1) - ((n-1)+(i-1)*n)),
        //                         UV: sumUV/((data.length-1) - ((n-1)+(i-1)*n)),
        //                     }
        //                     dataAverg[i] = values;
        //                 }
        //             }
        //             else{
        //                 let sumTime = 0,sumPM25 = 0,sumPM10 = 0,sumPM1 = 0,sumTemp = 0,sumHumi = 0,sumPress = 0, sumUV = 0;
        //                 for(let j = 0 ; j < n ; j++){
        //                     if(data[j+i*n] !== undefined){
        //                         sumTime += data[j+n*i].time;
        //                         sumPM25 += data[j+i*n].PM25;
        //                         sumPM10 += data[j+i*n].PM10;
        //                         sumPM1 += data[j+i*n].PM1;
        //                         sumTemp += data[j+i*n].Temperature;
        //                         sumHumi += data[j+i*n].Humidity;
        //                         sumPress += data[j+i*n].Pressure;
        //                         sumUV += data[j+i*n].UV;
        //                     }
                            
        //                 }
        //                 let values = {
        //                     time: Math.floor(sumTime/n),
        //                     PM25: sumPM25/n,
        //                     PM10: sumPM10/n,
        //                     PM1: sumPM1/n,
        //                     Temperature: sumTemp/n,
        //                     Humidity: sumHumi/n,
        //                     Pressure: sumPress/n,
        //                     UV: sumUV/n,
        //                 }
        //                 dataAverg[i] = values;
        //             }
                    
                    
        //         }
        // }
        // console.log(dataAverg);
    }
    // console.log(data);
    // console.log(typeOfData);
    return(
        <>
            <Modal
                title="Hiển thị dữ liệu"
                centered
                okType='primary'
                open={props.isOpen}
                onOk={handleSubmit}
                onCancel={props.handleCancel}
                width={1000}
            >
                <Form layout="horizontal" onFinish={handleSubmitTypeofData} form={form1}>
                    <Form.Item label="Chọn data muốn hiển thị" name="typeof_data" style={{marginTop: -25}}>
                                <Select placeholder='Chọn data muốn hiển thị' allowClear style={{marginTop: 25, width:200}} defaultValue={'Temperature'}>
                                    <Option value={temperature}></Option>
                                    <Option value={humidity}></Option>
                                    <Option value={pressure}></Option>
                                    <Option value={pm1}></Option>
                                    <Option value={pm25}></Option>
                                    <Option value={pm10}></Option>
                                    <Option value={uv}></Option>

                                </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <OneChart data ={data} typeOfData = {typeOfData} dataAvergMinMax = {dataAvergMinMax}/>
                
            </Modal>
        </>
    )
};

export default ModalData;