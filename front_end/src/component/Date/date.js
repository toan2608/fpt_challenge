import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
import { Button, Form, TimePicker } from 'antd';
import { httpPostData } from '../../api/common.api';
const { RangePicker } = DatePicker;

const rangePresets = [
    {
        label: 'Last 15 minutes',
        value: [dayjs().add(-15, 'm'), dayjs()],
    },
    {
        label: 'Last 30 minutes',
        value: [dayjs().add(-30, 'm'), dayjs()],
    },
    {
        label: 'Last 1 hour',
        value: [dayjs().add(-1, 'h'), dayjs()],
    },
    {
        label: 'Last 8 hours',
        value: [dayjs().add(-8, 'h'), dayjs()],
    },
    {
        label: 'Last 1 day',
        value: [dayjs().add(-1, 'd'), dayjs()],
    },
    {
        label: 'Last 7 Days',
        value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
        label: 'Last 14 Days',
        value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
        label: 'Last 30 Days',
        value: [dayjs().add(-30, 'd'), dayjs()],
    },
 
];
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  
  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  
const DateToGetData =(props) => {
    let sensor = props.sensor;
    const handleSubmitDate =  async (fieldsValue) => {
        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['dateToGetData'];
        const values = {
          ...fieldsValue,
          'dateToGetData': [
            rangeTimeValue[0],
            rangeTimeValue[1],
          ],
        };
        let time = values.dateToGetData[0];
        const timestampStart = Math.floor(time.valueOf()/1000);
        let time2 = values.dateToGetData[1];
        const timestampEnd = Math.floor(time2.valueOf()/1000);
        const dateToGetData = [timestampStart,timestampEnd];
        console.log(dateToGetData);
        console.log(props.sensor);
        let dataTypeOfData = await httpPostData(`/Temperature`,{dateToGetData,sensor});     // Lay data từ type_of_data mặc định là Temperature 
        dataTypeOfData = dataTypeOfData.data;
        for(let i = 0; i< dataTypeOfData.dataAverg.length; i++){
          let date = new Date(dataTypeOfData.dataAverg[i].time * 1000);
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let seconds = date.getSeconds();
          dataTypeOfData.dataAverg[i].timeConvert = hours + ':' + minutes + ':' + seconds;
        }
        console.log(dataTypeOfData);
        props.handleData({dateToGetData,dataTypeOfData});
      };
    return (
        <Form
      name="time_related_controls"
      {...formItemLayout}
      onFinish={handleSubmitDate}
      style={{
        maxWidth: 600,
        position: 'relative',
      }}
    >
      <Form.Item name="dateToGetData" label="Hiển thỉ dữ liệu" {...rangeConfig}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{marginTop: 25}} 
                presets={[
                    {
                        label: <span aria-label="Current Time to End of Day">Now ~ EOD</span>,
                        value: () => [dayjs(), dayjs().endOf('day')], // 5.8.0+ support function
                    },
                    ...rangePresets,
                    ]}
            />
            
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
        style={{position: 'absolute', top: 28, left: 550}}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        
      );
        
} 

export default DateToGetData;