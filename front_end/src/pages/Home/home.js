import Chart from "../../component/Chart/chart";
import { useEffect, useState } from "react";
import { Row,Col,Card, Button, Select, Form} from "antd";
import axios from "axios";
import Parameter from "../../component/parameter/parameter";
import { httpGetData, httpPostData } from "../../api/common.api";
import DateToGetData from "../../component/Date/date";
import ModalData from "../../component/Modal/modal";
import { getLocalStorage } from "../../utils/storageUtils";

const { Option } = Select;

const Home = () => {
    const [form] = Form.useForm();
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [sensor, setSensor] = useState('test1');    //Sensor la bien the hien id cua may do
    const [dataTypeOfDataPrev, setDataTypeOfDataPrev] = useState({});   //data lấy theo type_of_data(thông số đo) mặc định là Temperature
    const [dataFromDate, setDataFromDate] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dateToGetData, setDateToGetData] = useState([]);
    const [battery1, setBattery1] = useState(0);    // Lưu mức pin của máy 1
    const [battery2, setBattery2] = useState(0);    // Lưu mức pin của máy 2

    const handleData = async (data) =>{
        setShowModal(true);
        setDateToGetData(data.dateToGetData);
        setDataTypeOfDataPrev(data.dataTypeOfData);
    }


    useEffect(()=>{
        async function fetchData (){
            const data = await httpGetData('/');
            for(let i = 0; i< data.dataSensor1.length; i++){
                let date = new Date(data.dataSensor1[i].time * 1000);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                data.dataSensor1[i].timeConvert = hours + ':' + minutes + ':' + seconds;
            }
            setData1(data.dataSensor1);
            let temp1 = Math.floor(data.dataSensor1[data.dataSensor1.length - 1].Battery);
            setBattery1(temp1)
            for(let i = 0; i< data.dataSensor2.length; i++){
                let date = new Date(data.dataSensor2[i].time * 1000);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                data.dataSensor2[i].timeConvert = hours + ':' + minutes + ':' + seconds;
            }
            setData2(data.dataSensor2);
            let temp2 = Math.floor(data.dataSensor2[data.dataSensor2.length - 1].Battery);
            setBattery2(temp2)
        }
        setTimeout(()=>{
            fetchData()
        },10000);
    },[data1])
    const handleSubmit = async (value) =>{
        setSensor(value.sensor);
        
    }
    const token = getLocalStorage('token');
    return (
        <>
            <h1 style={{marginBottom: 20}}>Dashboard</h1>
            <Parameter data={(sensor === 'test1') ? battery1 : battery2}/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {(token) ? 
            <div>
            <Form layout="horizontal" onFinish={handleSubmit} form={form} style={{display: "flex"}}>
                    <Form.Item label="Danh sách chạm:" name="sensor" style={{marginTop: -25}}>
                        <Select allowClear style={{marginTop: 25, width:200, marginLeft: -60}} defaultValue={'test1'}>
                            <Option value="test1" >Sensor 1</Option>
                            <Option value="test2">Sensor 2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 32}}>Submit</Button>
                    </Form.Item>
            </Form>
            <DateToGetData sensor = {sensor} handleData = {handleData}/>
            <Chart data={(sensor === 'test1') ? data1 : data2}/>
            {showModal ? <ModalData dataTypeOfDataPrev = {dataTypeOfDataPrev} dateToGetData = {dateToGetData} sensor = {sensor} isOpen = {showModal} handleCancel={() => setShowModal(false)}/> :""}
        </div>
        : ""}
        </>
    )
}
export default Home;