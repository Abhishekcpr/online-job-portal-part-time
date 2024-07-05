import React,{useEffect, useState} from "react";
import NavHire from "../../components/NavHire";
import '../../CSS/Hire/ActiveJob.css'
import DistanceMatrix from "../../utils/distanceMatrix";
import { json, useNavigate } from 'react-router-dom';


const activeComponent = (props) => {
  return (
    <>
      <div className="active-workers-inner-container">
        <div className="left-container-img">
          <img src={props.image} alt="" />
        </div>
        <div className="right-container-info">
          <h2 className="worker-name">{props.username}</h2>
          <p className="rating">{"⭐".repeat(props.rating)}</p>
          <p className="location truncated">{props.locationAdd}</p>
          {/* <p className="skills">{props.skills.join(", ")}</p> */}
          <p className="skills truncated">Skills :{props.skills}</p>
          <p className="wages">Wages :{props.expectedwage}</p>
          {(!(isNaN(props.distance))) ? <p className="distance">Estimated distance :{props.distance/1000} km</p>: <p className="distance">Estimated distance: not known</p>}
          <div className="profile-card-buttons" >
          <button className="general-btn" onClick={()=> props.saveProfile(props._id)}>Save Profile</button>
          <button className="general-btn" onClick={()=> props.viewProfile(props._id)}>View Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};


const ActiveJobs = () => {

  const navigate = useNavigate()
  const sampleObject = {

    image : "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    username : "King coder",
    skills : "Gupt work",
    locationAdd : "Gorakhpur",
    rating : 3,
    expectedwage : "$500/hr",
    distance : 0
  }

  // skills : ["app development", "Web designing", "Code reviewer"],

  const [activeWorkers, setActiveWorkers] = useState([])
  const [activePage, setActivePage] = useState(false)
  

  const fetchWorkers = async()=>{
    try{
  
      console.log("reached...");
      const getWorkers = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/`,{
        method : 'GET'
      })
  
      console.log(getWorkers);
     
      if(getWorkers.ok)
      {
         const jsonData = await getWorkers.json()
        
         if(jsonData !== undefined && jsonData.msg.length > 0)
         {
           await DistanceMatrix(jsonData.msg,setActiveWorkers)
           
          setActiveWorkers([...activeWorkers, ...jsonData.msg])
          console.log(jsonData.msg);
         }
      }

      console.log("new", activeWorkers);
  
    } catch(err)
    {
      alert(err)
    }
  }

  const viewProfile = (workerId)=>{
    navigate('/user-profile/' + workerId) ;
  }

  const saveProfile = async(workerId)=>{
    const getId = localStorage.getItem('login_id') ;
    if(getId == undefined)
    alert('You need to login to save profile')
    else
    {
       try{
        const saveWorkerProfile = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/saveprofile/`, {
          method: 'PATCH',
          headers : {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({userId : getId, workerId})
        })

        if(saveWorkerProfile.ok)
        {
          alert("Profile saved")
        }
       
        // console.log(saveWorkerProfile);
       }catch(err){
         alert(`Error : ${err}`)
       }
    }
  }

  async function  doSomething()
  {
   const getWorkers =  await fetchWorkers()
    if(getWorkers)
      {
        await DistanceMatrix(activeWorkers,setActiveWorkers)
      }
  }

  useEffect(() => {

    setActivePage(true)
    doSomething()

  }, [])
  
  return (
    <>
      <NavHire />
      {/* <button onClick={async()=>{ await DistanceMatrix(activeWorkers,setActiveWorkers)}}>closest to me</button> */}
      <h1 className="active-worker-heading heading-center">Active Workers</h1>

       <div className="active-worker-container">
      

       {(activeWorkers.length == 0)? <center><h3>There are no active workers</h3></center> : 
        activeWorkers.map((element)=>{
          return activeComponent({...element, saveProfile, activePage,viewProfile})
        })
       }
       </div>
      
    </>
  );
};

export default ActiveJobs;
export {activeComponent}
