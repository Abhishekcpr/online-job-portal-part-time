import React, { useState } from 'react'
import {  useEffect } from 'react'
import { json, useParams } from 'react-router-dom'
import '../CSS/Profile.css'
import authContext from '../utils/authContext'
import { useContext } from 'react'
import getCurrentLocation from '../utils/useCurrentLocation'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';


const Testimonials = (props)=>{

  const filledStars = Array.from({ length: props.rating }, (_, index) => (
    <span className="star" key={index}>&#9733;</span>
  ));

  const openStars = Array.from({ length: 5 - props.rating }, (_, index) => (
    <span className="star" key={index}>&#9734;</span>
  ));

 
  
  return (
    
    <SplideSlide key={props._id}>
              <img className="review-img" src={props.employer.image} alt="" />
              <div className="content">
                <p className="text">{props.message}</p>
                <div className="info">
                  <div className="rating">
                   
                   {filledStars}
                   {openStars}
                  </div>
                  <p className="user">{props.employer.username}</p>
                </div>
              </div>
            </SplideSlide>

  )
}
// -->
const Profile = () => {

  const {isLoggedIn, setLogin} = useContext(authContext)
  const [myLocationAdd, setLocationAdd] = useState('')
  const [myLocationCoord, setLocationCoord] = useState('')
  const [userId , setUserId] = useState('')

   // dummy object for testing:
    const demo=  {
      name : "King coder abhishek",
      imgSrc : "https://media.licdn.com/dms/image/C4D03AQHL7RnuSeWLgA/profile-displayphoto-shrink_400_400/0/1655254741573?e=1716422400&v=beta&t=geQQl1MfD-hh0yBmBc9wBwiiHStIVVeD14CiC6R7jfo",
      msg : "Abhishek is a cool coder Abhishek is a cool coder Abhishek is a cool coder Abhishek is a cool coder Abhishek is a cool coder",
      rating : 4

    }

   
    const [profileDetails, setProfileDetails] = useState({
      username: '',
      phone: '',
      email: '',
     locationAdd:'',
     locationCoord:'',
     skills: '',
     expectedwage : '',
      isActive : true,
      emailNotifications: true,
    })
    const [testimonials, setTestimonials] = useState([])
    const {userid} = useParams() ;

    const [activeTab, setActiveTab] = useState('account');
   

    const filledStars = Array.from({ length: profileDetails.rating }, (_, index) => (
      <span className="star" key={index} style={{color:"orange"}}>&#9733;</span>
    ));
  
    const openStars = Array.from({ length: 5 - profileDetails.rating }, (_, index) => (
      <span className="star" key={index} style={{color:"orange"}}>&#9734;</span>
    ));
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setProfileDetails({ ...profileDetails, [id]: value });
    };
  
    const handleToggleChangeEmail = () => {
      setProfileDetails((prevData) => ({
        ...prevData,
        emailNotifications: !prevData.emailNotifications,
      }));
    };

    const handleToggleChangeActivate = () => {
      setProfileDetails((prevData) => ({
        ...prevData,
        isActive: !prevData.isActive,
      }));
    };

     const updateLocation = async(e)=>{
      e.preventDefault()
      try{

        await getCurrentLocation(setLocationAdd, setLocationCoord)
        setProfileDetails({
          ...profileDetails,
         locationAdd : myLocationAdd,
         locationCoord : [myLocationCoord.latitude+"", myLocationCoord.longitude+""] 
        })
      }
      catch(err)
      {
        alert(`Can't update location`)
      }
     }
    
    const updateDetails = async(e)=>{
     
      e.preventDefault()
      try{
        // await getCurrentLocation(setLocationAdd, setLocationCoord)
       

        

        console.log("ca : ", profileDetails);

        const updateMyDetails = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup/api/auth/profile/${userId}`, {
          method: 'PATCH',
          headers : {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({profileDetails,userId, locationCoordinates : [myLocationCoord.latitude,myLocationCoord.longitude], locationAdd : myLocationAdd})
        })
        console.log(updateMyDetails        );

        if(updateMyDetails.ok)
        {
          alert('Profile updated successfully!')
        }
       

        
      } catch(err)
      {
        alert("Error :"+err)
      }
    }

    const getApiData = async(id)=>{

        let localId = localStorage.getItem('login_id')
        

        try{

          const apiData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup/api/auth/profile/${localId}`,{
            method: 'GET'
          })

          if(apiData.ok)
          {
            const jsonData = await apiData.json()
            const userDetails = jsonData.msg[0]
              console.log("profile details =>",jsonData.msg[0]);
               setProfileDetails({
                ...profileDetails,
               

            src : userDetails.image,
            locationAdd : userDetails.locationAdd,
            skills : userDetails.skills,
            username : userDetails.username,
            rating : userDetails.rating,
            email : userDetails.email,
            phone : userDetails.phone,
            isActive : userDetails.isActive,
            expectedwage : userDetails.expectedwage,
            emailNotifications : userDetails.expectedwage
        })

      

          }
          else
          {
            alert(apiData.msg)
          }

        } catch(err)
        {
          alert(error)
        }
    }

    // testimonials : 
    const getTestimonials = async(id)=>{
      try{
        let localId = localStorage.getItem('login_id')
        
        const testimonials = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup/api/jobs/gettestimonial/${localId}`,{
          method: 'GET'
        })

        if(testimonials.ok)
        {
          const jsonData = await testimonials.json()
          console.log(jsonData.msg);
          setTestimonials(jsonData.msg)
        }

        //comment

      }catch(err)
      {
        console.log(err, "testimonials");
        alert(`Error : ${err}`)
      }
    }

    // MAP services :
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState('unknown');
    const [error, setError] = useState(null);

    
 async function doSomething(userId){
  await getTestimonials(userId)
   await getApiData(userId) ;
 }

    useEffect(() => {
      console.log("id of person", userId);
      const getId = localStorage.getItem('login_id') ;
      if(getId !== undefined )
      {
        setUserId(getId)
        doSomething(userId)

      }
     
      
     
    }, [])


    
  return (
    <>
       <section className="profile">
       

        <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-picture">
          <img src={profileDetails.src} alt="Profile" />
         
        </div>
        <h2>{profileDetails.name}</h2>
        
        <div className="stats">
          <div className="stats">
            <p>Rating  </p>
            {filledStars}
            {openStars}
          </div>
          
        </div>
       
       
      </div>
      <div className="profile-main">
        <div className="tabs">
          <button className={`tab ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
            Account Settings
          </button>
          <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
            Notifications
          </button>
        </div>
        {activeTab === 'account' && (
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input type="text" id="username" value={profileDetails.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input type="text" id="skills" value={profileDetails.skills} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" value={profileDetails.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Id</label>
              <input type="email" id="email" value={profileDetails.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="locationAdd">Current Address</label>
              <input type="text" id="locationAdd" value={profileDetails.locationAdd} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="expectedwage">Pay Scale</label>
              <input type="text" id="expectedwage" value={profileDetails.expectedwage} onChange={handleInputChange} />
            </div>
            <button type="submit" className="update-button" onClick={updateDetails}>Update</button>
            <button className="update-button" onClick={updateLocation}>
             Fetch Location
        </button>
          </form>
        )}
        {activeTab === 'notifications' && (
          <div className="notifications">
            <div className="form-group">
              <label htmlFor="emailNotifications">Email Notifications</label>
              <label className="switch">
                <input type="checkbox" id="emailNotifications" checked={profileDetails.emailNotifications} onChange={handleToggleChangeEmail} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="activateAccount">Deactivate Account</label>
              <label className="switch">
                <input type="checkbox" id="activateAccount" checked={profileDetails.isActive} onChange={handleToggleChangeActivate} />
                <span className="slider round"></span>
              </label>
            </div>
           
          </div>
        )}
      </div>
    </div>
    
      {
        testimonials.length > 0 &&   <div className="testimonial-container">
      <div className="title">
        <h2>Testimonial</h2>
         
      </div>

      <div className="slider-container">
        

        <Splide
          options={{
            perPage: 1,
            autoplay: true,
            speed: 1000,
            rewind: true,
            rewindByDrag: true,
          }}
        > 
      
     { testimonials.length > 0 && testimonials.map((test)=>(
               Testimonials(test) 
            ))}

            </Splide>
          
       </div>
       </div>
      }
       </section>
    </>
  )
}

export default Profile
export {Testimonials}