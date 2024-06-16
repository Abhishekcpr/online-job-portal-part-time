import React, { useEffect, useState } from 'react';
import '../CSS/Login.css'
import { useNavigate } from 'react-router-dom';
const Contact = () => {
  const [details, setDetails] = useState({username : "",
 email : "",
 message : ""
});
  
  const [error, setError] = useState('');

  const handleChange = (e)=>
  {
    const element = e.target.name ;
    setDetails({
      ...details,
      [element] : e.target.value
    })
  }
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{

      const response = await fetch('http://localhost:5000/api/contact', {
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(details)
       })

      

      if(response.ok)
      {
        const jsonData = await response.json()
        console.log("Contact data" , jsonData.msg);
        alert("Message sent successfully")

        
      }
      else
      {
        const jsonData = await response.json()
        alert(jsonData.msg)
      }

     } catch(err){
       console.log("Error:", err);
     }
     
     setDetails({
      ...details,
      message: ""
     })
    // console.log('Details:', details);
  };

  useEffect(()=>{
    let login_data = localStorage.getItem('login_detail')
    
    if(login_data != undefined)
    {
      login_data = JSON.parse(login_data)
      setDetails({
        ...details,
        username : login_data.username,
        email : login_data.email
      })
    }
  },[])

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          name = "username"
          value={details.username}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="email"
          name = "email"
          placeholder="email"
          value={details.email}
          onChange={(e) => handleChange(e)}
          required
        />

          <input
          type="text"
          placeholder="type your message here"
          name = "message"
          value={details.message}
          onChange={(e) => handleChange(e)}
          required
        />

        <button type="submit">Submit message</button>
       
      </form>
    </div>
  );
};

export default Contact;
