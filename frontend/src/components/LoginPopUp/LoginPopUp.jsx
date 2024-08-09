import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { ImCross } from "react-icons/im";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Context';
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)
   
    const [currState,setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value}));
    };    

    // useEffect(()=>{
    //   console.log(data);
    // },[data])

    const onLogin = async(event)=>{
        event.preventDefault();
        let newURL = url;
        if(currState=="Sign Up"){
          newURL +="/api/user/register";
        }
        else{
          newURL+="/api/user/login";
        }
    
        const response = await axios.post(newURL,data);
        console.log(response);

        if(response.data.suceess){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false);
        }
        else{
          alert(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
         <form className="login-popup-container" onSubmit={onLogin}>
              <div className="login-popup-title">
                  <h2>{currState}</h2>
                  <ImCross className='cross' onClick={()=>setShowLogin(false)} /> 
              </div>
              <div className="login-popup-inputs">
                {currState==="Sign Up"?<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter Your Name' required />:<></>}
                  <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter Your Email' required />
                  <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password' required />
              </div>
              <button type='submit' >{currState==="Sign Up" ? "Create account" : "Login"}</button>
              <div className="login-popup-condition">
                  <input required type="checkbox" />
                  <p>By continuing, I aggree to the terms of use and privacy</p>
              </div>
               {currState==="Login" ?
                <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")} >click here</span> </p>
                :<p>Already have an account ? <span onClick={()=>setCurrState("Login")} >login here</span> </p>}
         </form>
    </div>
  )
} 

export default LoginPopUp  



