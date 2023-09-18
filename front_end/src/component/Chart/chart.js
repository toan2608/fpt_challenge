
import { useEffect, useState } from 'react';
import {LineChart,CartesianGrid,XAxis,YAxis ,Tooltip,Legend,Line} from 'recharts';
import "./chart.css";
import gauge from "../../assets/icons/gauge.png"
// const data = [
//   {
//     "created_at": "2023-04-02 00:23:44",
//     "Humidity": 40,
//     "Temperature": 24,
//     "Pressure": 950,
//     "PM25": 244,
//     "PM1": 244,
//     "PM10": 244,
//     "UV": 2000
//   },
//   {
//     "created_at": "2023-04-02 00:23:46",
//     "Humidity": 60,
//     "Temperature": 25,
//     "Pressure": 900,
//     "PM25": 250,
//     "PM1": 250,
//     "PM10": 250,
//     "UV": 2200
//   },
//   {
//     "created_at": "2023-04-02 00:23:47",
//     "Humidity": 70,
//     "Temperature": 26,
//     "Pressure": 1100,
//     "PM25": 280,
//     "PM1": 280,
//     "PM10": 280,
//     "UV": 2400
//   },
//   {
//     "created_at": "2023-04-02 00:23:48",
//     "Humidity": 65,
//     "Temperature": 27,
//     "Pressure": 950,
//     "PM25": 260,
//     "PM1": 260,
//     "PM10": 260,
//     "UV": 2600
//   },
//   {
//     "created_at": "2023-04-02 00:23:49",
//     "Humidity": 65,
//     "Temperature": 27,
//     "Pressure": 950,
//     "PM25": 220,
//     "PM1": 220,
//     "PM10": 220,
//     "UV": 2800
//   },
//   {
//     "created_at": "2023-04-02 00:23:50",
//     "Humidity": 50,
//     "Temperature": 28,
//     "Pressure": 900,
//     "PM25": 200,
//     "PM1": 200,
//     "PM10": 200,
//     "UV": 2600
//   },
//   {
//     "created_at": "2023-04-02 00:23:51",
//     "Humidity": 55,
//     "Temperature": 29,
//     "Pressure": 1000,
//     "PM25": 250,
//     "PM1": 250,
//     "PM10": 250,
//     "UV": 2400
//   },
//   {
//     "created_at": "2023-04-02 00:23:52",
//     "Humidity": 60,
//     "Temperature": 29,
//     "Pressure": 1002,
//     "PM25":400,
//     "PM1":400,
//     "PM10":400,
//     "UV": 2200
//   }
// ]
// for(let i = 0 ; i<data.length; i++){
//   data[i].created_at = data[i].created_at.split(" ")[1];
// }

const approximately = async(number)=>{
  let temp = number.toString();
  let temp2 = temp.split('.')[1];
  if(!!temp2){
    let firstNumber = Number.parseInt(temp2[0]);
    let secondNumber = Number.parseInt(temp2[1]);
    if(secondNumber >= 5){
      firstNumber += 1;
    }
    let firstNumberToString = firstNumber.toString();
    return temp.split('.')[0] + '.' + firstNumberToString;
  }
  else{
    return number;
  }
}

const average = async (object,name) =>{
  let sum = 0;
  for(let i = 0; i< object.length; i++){
    sum += object[i][name];
  }
  if(name === "Temperature"){
    let average = await approximately(sum/object.length);
    return average
  }
  else{
    let average = Math.floor(sum/object.length);
    return average;
  }
}

const Chart = (props) =>{
  const data = props.data;
  const [tempAvrg, setTemAvrg] = useState(0);
  const [humiAvrg, setHumiAvrg] = useState(0);
  const [pressAvrg, setPressAvrg] = useState(0);
  const [pm1Avrg, setPm1Avrg] = useState(0);
  const [pm25Avrg, setPm25Avrg] = useState(0);
  const [pm10Avrg, setPm10Avrg] = useState(0);
  const [uvAvrg, setUvAvrg] = useState(0);
  useEffect(()=>{
    const waiting = async ()=>{
      let temperature = await average(data,'Temperature');
      setTemAvrg(temperature);
      let humidity = await average(data,'Humidity');
      setHumiAvrg(humidity);
      let pressure = await average(data,'Pressure');
      setPressAvrg(pressure);
      let pm1 = await average(data,'PM1');
      setPm1Avrg(pm1);
      let pm25 = await average(data,'PM25');
      setPm25Avrg(pm25);
      let pm10 = await average(data,'PM10');
      setPm10Avrg(pm10);
      let uv = await average(data,'UV');
      setUvAvrg(uv);
    }
    waiting();
  },[data]);
  return(
    <>
      <div className="chart-temperature" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey = "timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey = "Temperature" stroke="green" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>Temperature average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average" id='temperature-average'>{tempAvrg}</span>
        </div>
      </div>
      <div className="chart-humidity margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Humidity" stroke="yellow" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>Humidity average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-humidity">{humiAvrg}</span>
        </div>
      </div>
      <div className="chart-pressure margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Pressure" stroke="red" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>Pressure average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-pressure">{pressAvrg}</span>
        </div>
      </div>
      <div className="chart-pm1 margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="PM1" stroke="blue" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>PM1.0 average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-pm1">{pm1Avrg}</span>
        </div>
      </div>
      <div className="chart-pm25 margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="PM25" stroke="purple" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>PM2.5 average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-pm25">{pm25Avrg}</span>
        </div>
      </div>
      <div className="chart-pm10 margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="PM10" stroke="orange" />
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>PM10 average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-pm10">{pm10Avrg}</span>
        </div>
      </div>
      <div className="chart-uv margin-top-20px" style={{display: 'flex',  justifyContent: 'space-between',  marginLeft:15, marginRight: 15}}>
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeConvert" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="UV" stroke="deeppink"/>
        </LineChart>
        <div className='parameter-average'>
          <h3 className='parameter'>UV average</h3>
          <img src={gauge} className='gauge-img'/>
          <span className="value-average value-uv">{uvAvrg}</span>
        </div>
      </div>
    </>
  )
}

export default Chart;
                            
