import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import './login.scss'
import axios from "axios";
import { login } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [eye,setEye] = useState(false);
    const [state,setState] = useState(false);
    const handleChange = () =>{
        setEye(!eye);
    }
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // let username_gs = useSelector((state) => state.authSlice.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const values = {
            email: email,
            password: password,
        };
        dispatch(login(values));
       
    };
    
    return (
        <div className="container-login">
            <div class="cont" style={{position: 'relative'}}>
                <div style={{position: 'absolute', top: 40, left: 0}}>
                    <button style={{color: 'blue',textDecoration: 'underline', fontSize: 15}} onClick={()=> navigate('/')}>Quay lại</button>
                </div>
            <div class="form sign-in">
                <div className="container-form-login">
                    <h2>Welcome back,</h2>
                    <form action="#">
                        <label>
                            <span>Email</span>
                            <input type="email" name="email" required value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type={eye ? "text" : "password"} name="password" required value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder="Password"/>
                            {(eye === false) ? 
                                <svg style={{width: 20,position: "absolute",top: 196,right: 190,color: "black"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"   className="w-5 h-5" onClick={handleChange}>
                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                </svg>
                            : <svg style={{width: 20,position: "absolute",top: 196,right: 190,color: "black"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  fill="currentColor" className="w-5 h-5" onClick={handleChange}>
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            }
                        </label>
                        <button style={{backgroundColor: "orange", marginTop:10}} onClick={(e) => handleSubmit(e)}>Sign In</button>
                    </form>
                </div>
            <button style={{backgroundColor: "orange", marginTop:10}} onClick={()=>navigate('/register')}>Sign Up</button>
            
            </div>
            <div class="sub-cont">
                <div class="img">
                    <div class="img__text m--up"></div>
                </div>   
            </div>
            </div>

            <a href="https://dribbble.com/shots/3306190-Login-Registration-form" target="_blank" class="icon-link">
                <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png" />
            </a>
        </div>
    )
};
  
export default LoginPage;


    