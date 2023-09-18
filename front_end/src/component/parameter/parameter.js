import { useEffect, useState } from "react";
import "./style.css";
import { getLocalStorage } from "../../utils/storageUtils";

const Parameter = (props) =>{
  let battery = props.data;
  const token = getLocalStorage('token');
  return( 
    <>
      <div class="insights">
        <div class="temperature">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>Temperature</h3>
                <h1 id="temperature"></h1>
              </div>
              <div className="border-icon backgroundColor-green">
                <i class="fa-solid fa-temperature-three-quarters fa-beat fa-xl" style={{color: 'white'}}></i>
              </div>
            </div>
        </div>
        <div class="humidity">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>Humidity</h3>
                <h1 id="humidity"></h1>
              </div>
              <div class="border-icon backgroundColor-yellow">
                <i class="fa-solid fa-droplet fa-beat fa-xl"></i>
              </div>
            </div>
        </div>
        <div class="pressure">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>Pressure</h3>
                <h1 id="pressure"></h1>
              </div>
              <div class="border-icon backgroundColor-red">
                <i class="fa-solid fa-gauge fa-beat fa-xl"></i>
              </div>
            </div>
        </div>
        <div class="pm1">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>PM1.0</h3>
                <h1 id="pm1"></h1>
              </div>
              <div class="border-icon backgroundColor-blue">
                <i class="fa-solid fa-meteor fa-beat fa-xl"></i>
              </div>
            </div>
        </div>
        <div class="pm25">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>PM2.5</h3>
                <h1 id="pm25"></h1>
              </div>
              <div class="border-icon backgroundColor-purple">
                <i class="fa-solid fa-volcano fa-beat fa-xl"></i>
              </div>
            </div>
        </div>
          
        <div class="pm10">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>PM10</h3>
                <h1 id="pm10"></h1>
              </div>
              <div class="border-icon backgroundColor-orange">
                <i class="fa-solid fa-wind fa-beat fa-xl"></i>
              </div>
            </div>
        </div>
        <div class="uv">
            <div class="middle">
              <div class="left">
                <h3 style={{fontSize: 18}}>UV</h3>
                <h1 id="uv"></h1>
              </div>
              <div class="border-icon backgroundColor-pink">
                <i class="fa-solid fa-sun-plant-wilt fa-beat fa-xl"></i>  
              </div>
            </div>
        </div>
        {(token) ? 
        <div class="battery">
          <div class="middle">
            <div class="left">
              <h3 style={{fontSize: 18}}>Battery</h3>
              <h1 id="uv"></h1>
            </div>
            <div style={{marginTop: 5, marginLeft: 30, fontSize: 22}}>{battery}%</div>

            <div class="battery" style={{width: 80, height: 30, backgroundColor: '#ddd',borderRadius: 5,position: 'relative', marginTop: 5}}>
              <div class="battery-level" style={{width: '90%', height: '80%', borderRadius: 3,position:'absolute', top: '10%', left: '5%'}}>
                <div style={(battery <= 20) ? {backgroundColor: '#CC3443', width: `${battery}%`, height: '100%'}: {backgroundColor: '#4CAF50', width: `${battery}%`, height: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
        : ""}
      </div>
    </>
  )
}

export default Parameter;