import React, { useState } from 'react';
import '../CSS/Login.css'
import { useContext } from 'react';
import authContext from '../utils/authContext';
import { json, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    phone: "",
    password: ""
  })
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {isLoggedIn, setLogin} = useContext(authContext)

 
  const navigate = useNavigate()
  const handleGuestLogin = async(e)=>{
    e.preventDefault();
    setLoginDetails({
      phone : 9211,
      password : "9211"
    })

    if(loginDetails.password && loginDetails.password)
    handleLogin(e) ;
  }
  const handleLogin = async(e) => {
    e.preventDefault();
    
   
   
      setLoading(true)
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
          token : jsonData.token
         
        } ;

        localStorage.setItem('login_detail' , JSON.stringify(userObj));
        localStorage.setItem('login_id', jsonData.userId)
        localStorage.setItem('token', jsonData.token)
      
       
        //  toast.success("Login successfull")
        setLogin(true)
        setLoading(false)
        toast.success("Login successfull ...")

        // setLocalToken(jsonData.token)
        navigate('/profile') ;
      }
      else
      {
        const jsonData = await response.json()
      //  alert(jsonData.msg);
      setLoading(false)
        toast.error(jsonData.msg)
      }
      
     } catch(err)
     {
      setLoading(false)
      console.log(err);
     }
   
    // console.log(loginDetails);
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

  if(isLoading)
  {
    return <Spinner/>
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Phone Number"
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
        <button onClick={handleGuestLogin}>Login as guest</button>
        <button onClick={()=>{ navigate('/signup')}} >Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
