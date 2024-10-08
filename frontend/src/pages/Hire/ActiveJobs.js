import React,{useEffect, useState} from "react";
import NavHire from "../../components/NavHire";
import '../../CSS/Hire/ActiveJob.css'
import DistanceMatrix from "../../utils/distanceMatrix";
import { toast } from 'react-toastify';
import { json, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Shimmer from "../../components/Shimmer";



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
          {/* {(!(isNaN(props.distance))) ? <p className="distance">Estimated distance :{props.distance/1000} km</p>: <p className="distance">Estimated distance: not known</p>} */}
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

  // const [activeWorkers, setActiveWorkers] = useState([])
  const [activePage, setActivePage] = useState(false)

  const fetchWorkers = async()=>{
    try{
      const token = await localStorage.getItem('token')
      const getWorkers = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/`,{
        method : 'GET',
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json',
      },
      })
  
      console.log(getWorkers);
     
      const jsonData = await getWorkers.json()
      if(getWorkers.ok)
      {
        
         if(jsonData !== undefined && jsonData.msg.length > 0)
         {
          //  await DistanceMatrix(jsonData.msg,setActiveWorkers)
           
          // setActiveWorkers([...activeWorkers, ...jsonData.msg])
          // console.log(jsonData.msg);
          return jsonData.msg
         }
      }
      else
      toast.error(jsonData.msg)

      console.log("new", activeWorkers);
  
    } catch(err)
    {
      toast.error(err)
    }
  }

  const { isLoading, error, data:activeWorkers } = useQuery({
    queryKey: ['activeWorkers'],
    queryFn: fetchWorkers
  });
  
  
  if(isLoading)
  {
    return <Shimmer/>
  }
  

  const viewProfile = (workerId)=>{
    navigate('/user-profile/' + workerId) ;
  }

  const saveProfile = async(workerId)=>{
    const getId = localStorage.getItem('login_id') ;
    if(getId == undefined)
    toast.error('You need to login to save profile')
    else
    {
       try{
        const token = await localStorage.getItem('token')

        const saveWorkerProfile = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/saveprofile/`, {
          method: 'PATCH',
          headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json',
      },
          body: JSON.stringify({userId : getId, workerId})
        })

        if(saveWorkerProfile.ok)
        {
          toast.success("Profile saved")
        }
        else
        {
          toast.error("Some error occurred")
        }
       
        // console.log(saveWorkerProfile);
       }catch(err){
         toast.error(`Error : ${err}`)
       }
    }
  }

  // async function  doSomething()
  // {
  //  const getWorkers =  await fetchWorkers()
  //   if(getWorkers)
  //     {
  //       await DistanceMatrix(activeWorkers,setActiveWorkers)
  //     }
  // }

  // useEffect(() => {

  //   setActivePage(true)
  //   doSomething()

  // }, [])
  
  return (
    <>
      <NavHire />
      {/* <button onClick={async()=>{ await DistanceMatrix(activeWorkers,setActiveWorkers)}}>closest to me</button> */}
      <h1 className="active-worker-heading heading-center">Active Workers</h1>

       <div className="active-worker-container">
      

       {(activeWorkers== undefined || activeWorkers.length == 0)? <center><h3>There are no active workers</h3></center> : 
        activeWorkers?.map((element)=>{
          return activeComponent({...element, saveProfile, activePage,viewProfile})
        })
       }
       </div>
      
    </>
  );
};

export default ActiveJobs;
export {activeComponent}
