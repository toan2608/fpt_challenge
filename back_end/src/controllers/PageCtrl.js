
const knex = require('../configs/knex');
const DataSensor = require('../models/schemaMongo/dataSensor');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/iot_challenge');
let PageCtrl = {};

PageCtrl.getData = async (req,res) =>{
    // DataSensor.findOne({time: '1689046450'})
    // .then(data=>{
    //     console.log(data);
    // })
    const dateToGetData = req.body;
    console.log(dateToGetData);
    if(!!dateToGetData){
        DataSensor.find({
            $and: [
                {time: {$gte: dateToGetData[0]}},
                {time: {$lt: dateToGetData[1]}},
            ]
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => console.log(err));
    }
}
PageCtrl.home = async(req,res)=>{
    const time = new Date();
    let timeStamp = Math.floor(time.getTime()/1000);
    timeStamp = timeStamp - 15*60;
    const dataSensor1 = [];
    const dataSensor2 = [];
    DataSensor.find({time: {$gte: timeStamp}})
    .then(data=>{
        // console.log(data);
        for(let i = 0; i<data.length; i++){
            let sensor = data[i].topic.split("/")[1];
            if(sensor === 'test1')     dataSensor1.push(data[i]);  
            if(sensor === 'test2')     dataSensor2.push(data[i]);      
        }
        res.status(200).json({dataSensor1,dataSensor2})
    })
    .catch(err => console.log(err));
}
PageCtrl.getDataFollowTypeof = async (req,res) =>{
    const {typeof_data} = req.params;
    // const data = req.body
    const dateToGetData = req.body.dateToGetData;
    const sensor = req.body.sensor;
    console.log(typeof_data);
    console.log(dateToGetData);
    if(!!dateToGetData){
        DataSensor.find({
            $and: [
                {time: {$gte: dateToGetData[0]}},
                {time: {$lt: dateToGetData[1]}},
                {topic: `sensor/${sensor}`},
            ]
        })
        .then(data => {
            let dataAverg = []
            if(data.length > 90){
                let n = Math.floor(data.length/90 + 1);
                console.log(n);
                let length = Math.floor(data.length/n + 1);
                for(let i = 0 ; i< length; i++){
                    if( i == (length-1)){
                        if(((data.length - 1) - ((n-1)+(i-1)*n)) === 1){
                            // const {topic,__v,_id, ...values} =  data[data.length-1];
                            // console.log(data[data.length-1]);
                            // console.log(values);
                            const {time,PM25,PM10,PM1, Temperature,Humidity,Pressure,UV} =  data[data.length-1];
                            let values = {
                                time: time,
                                PM25: PM25,
                                PM10: PM10,
                                PM1: PM1,
                                Temperature: Temperature,
                                Humidity: Humidity,
                                Pressure: Pressure,
                                UV: UV,
                            }
                            dataAverg[i] = values;
                        }
                        if(((data.length-1) - ((n-1)+(i-1)*n)) > 1 && ((data.length-1) - ((n-1)+(i-1)*n)) < n){
                            let sumTime = 0,sumPM25 = 0,sumPM10 = 0,sumPM1 = 0,sumTemp = 0,sumHumi = 0,sumPress = 0, sumUV = 0;
                            for(let k = n+(i-1)*n ; k < data.length; k++){
                                sumTime += data[k].time;
                                sumPM25 += data[k].PM25;
                                sumPM10 += data[k].PM10;
                                sumPM1 += data[k].PM1;
                                sumTemp += data[k].Temperature;
                                sumHumi += data[k].Humidity;
                                sumPress += data[k].Pressure;
                                sumUV += data[k].UV;
                            }
                            let values = {
                                time: Math.floor(sumTime/((data.length-1) - ((n-1)+(i-1)*n))),
                                PM25: sumPM25/((data.length-1) - ((n-1)+(i-1)*n)),
                                PM10: sumPM10/((data.length-1) - ((n-1)+(i-1)*n)),
                                PM1: sumPM1/((data.length-1) - ((n-1)+(i-1)*n)),
                                Temperature: sumTemp/((data.length-1) - ((n-1)+(i-1)*n)),
                                Humidity: sumHumi/((data.length-1) - ((n-1)+(i-1)*n)),
                                Pressure: sumPress/((data.length-1) - ((n-1)+(i-1)*n)),
                                UV: sumUV/((data.length-1) - ((n-1)+(i-1)*n)),
                            }
                            dataAverg[i] = values;
                        }
                    }
                    else{
                        let sumTime = 0,sumPM25 = 0,sumPM10 = 0,sumPM1 = 0,sumTemp = 0,sumHumi = 0,sumPress = 0, sumUV = 0;
                        for(let j = 0 ; j < n ; j++){
                            if(data[j+i*n] !== undefined){
                                sumTime += data[j+n*i].time;
                                sumPM25 += data[j+i*n].PM25;
                                sumPM10 += data[j+i*n].PM10;
                                sumPM1 += data[j+i*n].PM1;
                                sumTemp += data[j+i*n].Temperature;
                                sumHumi += data[j+i*n].Humidity;
                                sumPress += data[j+i*n].Pressure;
                                sumUV += data[j+i*n].UV;
                            }
                        }
                        let values = {
                            time: Math.floor(sumTime/n),
                            PM25: sumPM25/n,
                            PM10: sumPM10/n,
                            PM1: sumPM1/n,
                            Temperature: sumTemp/n,
                            Humidity: sumHumi/n,
                            Pressure: sumPress/n,
                            UV: sumUV/n,
                        }
                        dataAverg[i] = values;
                    }
                }
            }
            else{
                dataAverg = data;
            }
            let sum = dataAverg[0][typeof_data], max = dataAverg[0][typeof_data];
            let min = dataAverg[0][typeof_data];
            for(let i = 1; i<dataAverg.length; i++){
                sum += dataAverg[i][typeof_data];
                if (max < dataAverg[i][typeof_data]){
                    max = dataAverg[i][typeof_data];
                }
                if(min > dataAverg[i][typeof_data]){
                    min = dataAverg[i][typeof_data];
                }
            }
            dataAvergMinMax = {
                averg: sum/dataAverg.length,
                max: max,
                min: min,
            }
            // console.log(dataAverg);
            console.log(dataAvergMinMax);
            res.status(200).json({dataAverg,dataAvergMinMax})
        })
        .catch(err => console.log(err));
    }
}
module.exports = PageCtrl;