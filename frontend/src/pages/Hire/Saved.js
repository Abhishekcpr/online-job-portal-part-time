import React, { useEffect,useState } from 'react'
import NavHire from '../../components/NavHire'
import '../../CSS/Hire/ActiveJob.css'


const savedComponent = (props) => {
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
          <button className="general-btn" onClick={()=> props.removeProfile(props._id)}>Remove Profile</button>
        </div>
      </div>
    </>
  );
};


const Saved = () => {

  const sampleObject = {

    image : "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    username : "King coder",
    skills : "Gupt work",
    locationAdd : "Gorakhpur",
    rating : 3,
    expectedwage : "$500/hr"
  }

  const [savedWorkers, setSavedWorkers] = useState([sampleObject])

  const getAllSavedProfiles = async()=>{

    try{
         const getId = localStorage.getItem('login_id');
         if(getId == undefined)
         {
          alert('You need to login to get saved profiles!!!')
         }
         else
         {
          
          const allsavedProfiles = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/getsavedprofile/${getId}`,
          {method : 'GET'})

        
          if(allsavedProfiles.ok)
          {
          
            const apiData = await allsavedProfiles.json()
            console.log(apiData.savedProfiles);
            setSavedWorkers(apiData.savedProfiles)
          }
          else
          {
            alert(`Unable to fetch saved profiles`);
          }
         }
        
    } catch(err)
    {
       alert(`Error: ${err}`)
    }
}

const removeProfile = async(workerId)=>{
  const getId = localStorage.getItem('login_id') ;
  if(getId == undefined)
  alert('You need to login to remove profile')
  else
  {
     try{
      const saveWorkerProfile = await fetch(`http://localhost:5000/api/jobs/removeprofile/`, {
        method: 'PATCH',
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({userId : getId, workerId})
      })

      if(saveWorkerProfile.ok)
      {
        setSavedWorkers(savedWorkers.filter((profiles)=>{
          return profiles._id !== workerId
        }))
        alert("Profile removed")
      }
      // console.log(saveWorkerProfile);
     }catch(err){
       alert(`Error : ${err}`)
     }
  }
}

async function getSavedProfile(){
  await getAllSavedProfiles()
}
useEffect(()=>{

  getSavedProfile()
},[])

  return (
    <>
    <NavHire/>
    <h1 className='heading-center'>Saved Profiles</h1>
    <div className="active-worker-container">
    {
      savedWorkers.map((profile)=>{
        return savedComponent({...profile,removeProfile})
      })
    }
    </div>
    </>
      
  )
}

export default Saved