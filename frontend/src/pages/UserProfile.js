import React, { useState } from 'react'
import {  useEffect } from 'react'
import { json, useParams } from 'react-router-dom'
import '../CSS/Profile.css'
import authContext from '../utils/authContext'
import { useContext } from 'react'
import getCurrentLocation from '../utils/useCurrentLocation'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Modal from "react-modal";
import Maps from '../components/Direction'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner';


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
const UserProfile = () => {

  // for map directions 
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // for profile 

  const {isLoggedIn, setLogin} = useContext(authContext)
  const [myLocationAdd, setLocationAdd] = useState('')
  const [myLocationCoord, setLocationCoord] = useState(null)
  const [userId , setUserId] = useState('')


  const handleClick = ({source,destination}) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`;
    window.open(googleMapsUrl, '_blank');
  };

  useEffect(() => {
    console.log("id of person", userId);
    const getId = localStorage.getItem('login_id') ;
    if(getId !== undefined )
    {
      setUserId(getId)
      doSomething(userId)

    }
   
    
   
  }, [])

   // dummy object for testing:
    const demo=  {
      name : "Sample name",
      imgSrc : "https://media.licdn.com/dms/image/C4D03AQHL7RnuSeWLgA/profile-displayphoto-shrink_400_400/0/1655254741573?e=1716422400&v=beta&t=geQQl1MfD-hh0yBmBc9wBwiiHStIVVeD14CiC6R7jfo",
      msg : "This is a random message",
      rating : 4

    }

    const [profileDetails, setProfileDetails] = useState({
      username: '',
      phone: '',
      email: '',
     locationAdd:'',
     locationCoord:[],
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

    
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    

    const getApiData = async(id)=>{

        let localId = localStorage.getItem('login_id')
        

        try{
          const token = await localStorage.getItem('token')

          const apiData = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/${userid}`,{
            method: 'GET',
            headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json',
      },
          })

          const jsonData = await apiData.json()
          if(apiData.ok)
          {
            const userDetails = jsonData.msg[0]
              console.log("profile details =>",jsonData.msg[0]);
               setProfileDetails({
                ...profileDetails,
               

            src : userDetails.image,
            locationAdd : userDetails.locationAdd,
            locationCoord: userDetails.locationCoord,
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
            toast.error(jsonData.msg)
          }

        } catch(err)
        {
          toast.error(error)
        }

        setIsLoading(false)
    }

    // testimonials : 
    const getTestimonials = async(id)=>{
      try{
        let localId = localStorage.getItem('login_id')
        const token = await localStorage.getItem('token')

        const testimonials = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/gettestimonial/${userid}`,{
          method: 'GET',
          headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json',
      },
        })

        const jsonData = await testimonials.json()
        if(testimonials.ok)
        {
          console.log(jsonData.msg);
          setTestimonials(jsonData.msg)
        }
        else
        {
          toast.error(jsonData.msg)
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
   await getApiData(userId) ;
   await getCurrentLocation(setLocationAdd,setLocationCoord)
   await getTestimonials(userId)
 }

   

 if(isLoading)
 {
  return <Spinner/>
 }
    
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
            User Profile
          </button>
         
        </div>
        {activeTab === 'account' && (
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input type="text" id="username" value={profileDetails.username}  />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input type="text" id="skills" value={profileDetails.skills}  />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" value={profileDetails.phone}  />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Id</label>
              <input type="email" id="email" value={profileDetails.email}  />
            </div>
            <div className="form-group">
              <label htmlFor="locationAdd">Current Address</label>
              <input type="text" id="locationAdd" value={profileDetails.locationAdd} />
            </div>
            <div className="form-group">
              <label htmlFor="expectedwage">Pay Scale</label>
              <input type="text" id="expectedwage" value={profileDetails.expectedwage} />
            </div>
           
          </form>
        )}

        <button className="general-btn" onClick={()=>{handleClick({source : myLocationAdd, destination : profileDetails.locationAdd})}}>View on map</button>
        
      </div>
    </div>
    
       {testimonials.length > 0 &&  <div className="testimonial-container">
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
      
      { testimonials.map((test) => (
    <Testimonials key={test._id} {...test} />
))}

            </Splide>
          
       </div>
       </div>

       }
      
       </section>
    </>
  )
}

export default UserProfile
export {Testimonials}