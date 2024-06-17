import React, { useState } from 'react';
import '../CSS/Login.css'
import { useContext } from 'react';
import authContext from '../utils/authContext';
import { json, useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    phone: "",
    password: ""
  })
  const [error, setError] = useState('');
  const {isLoggedIn, setLogin} = useContext(authContext)

 
  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault();
    
   
   

    try{

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(loginDetails)
       })

     

      if(response.ok)
      {
        const jsonData = await response.json()
        console.log("is admin" , jsonData.userId);

        const userObj = {
          id : jsonData.userId,
          username : jsonData.username,
          email : jsonData.email,
         
        } ;

        localStorage.setItem('login_detail' , JSON.stringify(userObj));
        localStorage.setItem('login_id', jsonData.userId)
      
       
        //  toast.success("Login successfull")
        setLogin(true)
        alert("Login successfull ...")
        // setLocalToken(jsonData.token)
        navigate('/profile') ;
      }
      else
      {
        const jsonData = await response.json()
       alert(jsonData.msg);
        // toast.error(jsonData.msg)
      }
      
     } catch(err)
     {
      console.log(err);
     }
   
    console.log(loginDetails);
  };

  function handleChange(e)
  {
    const element = e.target.name;
    const value = e.target.value ;

    setLoginDetails({
     ...loginDetails,
      [element] : value
    })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Phone number"
          name = "phone"
          value={loginDetails.phone}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name = "password"
          value={loginDetails.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login</button>
        <button onClick={()=>{ navigate('/signup')}} >Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
