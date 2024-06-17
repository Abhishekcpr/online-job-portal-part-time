import React,{useEffect,useState} from 'react'
import NavJob from '../../components/NavJob'
import '../../CSS/Hire/Ongoing.css'

const OngoingJob = () => {
 const [appliedJobs, setAppliedJobs] = useState([{
  id:"",
  jobDescription : "",
  budget : 0,
  demandedBudget : 0,
  message : "",
  category : "",
  applicationStatus : ""

 }])
 const [applications, setApplications] = useState({
  jobDescription : "",
  budget : 0,
  demandedBudget : 0,
  message : "",
  category : "",
  applicationStatus : ""


 })
 const [showPopup, setShowPopup] = useState(false);

 const getAppliedJobs = async(id) => {
 
  try{

    const jobApplications = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/getapplicationsbycandidateid/${id}`) ;
   
    if(jobApplications.ok)
    {
      const response = await jobApplications.json()
      let getApplications = response.msg.filter((app)=> ( app.applicationStatus != 'completed'))
      console.log("the repo",getApplications);
      setAppliedJobs(getApplications.map((app)=>{
        return {
          id: app._id,
          category : app.job.category,
          budget : app.job.budget,
          jobDescription : app.job.description,
          demandedBudget : app.demandedBudget,
          message : app.description,
          applicationStatus : app.applicationStatus
        }
      }));
     
    }

  }catch(err)
  {
    alert(`Error: ${err}`)
  }

};



const  handleDeleteJob = async(id)=>{
   try{
      const withdrawApplication = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/withdraw/${id}`,{
        method : "PATCH"
      })

      if(withdrawApplication.ok)
        {
          const message = await withdrawApplication.json()
          console.log(message);
          alert(message.msg)
        }
   } catch(err)
   {
    alert(`Error : ${err}`)
   }
}

 async function doSomething(userId)
 {
   await getAppliedJobs(userId)
 }
  useEffect(() => {
    const userId = localStorage.getItem('login_id')
    doSomething(userId)
  }, [])
  
  return (
    <>
      <NavJob/>
       <div className="outer" style={{height:'70vh'}}>
       <h1 className="heading-center">Applied Jobs</h1>
        <div className="ongoing-container">
        <table className="tables">
          <thead>
            <tr>
             
              <th>Category</th>
              <th>View </th>
              <th>Withdraw </th>
              <th>Status </th>
              
            </tr>
          </thead>
          <tbody>
  {appliedJobs.length>0  && appliedJobs.map((app) => (
    <tr key={app.id}>
      <td>{app.category}</td>
      <td>
        <button onClick={() => {
          setShowPopup(true);
          setApplications({
            category : app.category,
            budget : app.budget,
            jobDescription : app.jobDescription,
            demandedBudget : app.demandedBudget,
            message : app.message,
            applicationStatus : app.applicationStatus
          });
          console.log(applications);
        }}>👁️</button>
      </td>
      <td>
        <button onClick={() => handleDeleteJob(app.id)} disabled={app.applicationStatus == 'withdrawn'}>❌</button>
      </td>
      <td>{app.applicationStatus}</td>
    </tr>
  ))}
</tbody>

        </table>
        
        {showPopup === true && (applications) && (
        <div className="popup">
          <div className="popupContent">
            <h2>Job Application detail   <button onClick={() => setShowPopup(false)}>❌</button></h2>
            {
              <>
              <div className="popup-container">
              <p>Category : {applications.category}</p>
                 <p>Job Description : {applications.jobDescription}</p>
                 <p>Proposed Budget : {applications.budget}</p>
                 <p>Demanded Budget : {applications.demandedBudget}</p>
                 <p>Message to recruiter  : {applications.message}</p>
                 <p>Application Status  : {applications.applicationStatus}</p>
                 <br/>
              </div>
              </>
            }
          </div>
        </div>
      )}

      </div>
       </div>
    </>
    )
}

export default OngoingJob ;