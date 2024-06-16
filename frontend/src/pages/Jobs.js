import React from 'react'
import { useContext, useEffect } from 'react'
import authContext from '../utils/authContext'
import NavJob from '../components/NavJob'

const Jobs = () => {

    const {isLoggedIn, setLogin} = useContext(authContext)

    const getStyle = {
      display : 'flex',
      // justifyContent : 'center',
      alignItems : 'center',
      flexDirection : 'column',
      height : '70vh' ,
      width : '100vw',
      fontSize: '1vw'
    }

    const imgStyle = {
      height : '300px',
      
    }
   
    useEffect(() => {
      
        const getLoginStatus = localStorage.getItem('login_id') ;
        console.log("login status", getLoginStatus);
        if(getLoginStatus != undefined)
        {
  
          setLogin(getLoginStatus)
        }
      }, [isLoggedIn])
  return ( !isLoggedIn ? (<h1>You need to login to access jobs data</h1> ): (

   <>
    <NavJob/>
     <div style={getStyle}><h1>Welcome To Job Search Page</h1>
      <img src="https://st2.depositphotos.com/3591429/7157/i/450/depositphotos_71571591-stock-photo-job-search-qualification-concept.jpg" style={imgStyle}></img>
     </div>
   </>
  ));
}

export default Jobs