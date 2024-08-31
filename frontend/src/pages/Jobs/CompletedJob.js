import NavJob from '../../components/NavJob'
import { toast } from 'react-toastify';

import React, {useState,useEffect} from 'react'
import '../../CSS/Hire/Ongoing.css'

const CompletedJob = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleView = (id) => {
   
    const val = completedJobs.filter((job)=> job._id == id)
    console.log(val[0]);
    setSelectedJob(val[0])
    setShowPopup(true);
   
   
  };

  const handleDelete = (id) => {
   
  };

  const fetchCompletedJobs = async(id)=>{
    try{

      const token = await localStorage.getItem('token')
      const completedJobs = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/getcompletedjob`,{
        method : 'GET',
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json',
      },
      });

      if(completedJobs.ok)
      {
        const jsonData = await completedJobs.json() ;

       
        setCompletedJobs(jsonData.msg.filter((jobs)=> jobs.employee._id == id))
        console.log(jsonData.msg);

      }
    }catch(err)
    {
      toast.error(`Error: ${err}`)
    }
  }

  async function doSomething(id){
    await fetchCompletedJobs(id)
  }

  useEffect(() => {
   
    const getId=  localStorage.getItem('login_id') ;
   
    doSomething(getId)
   
  }, [])

  return (
    <>
      <NavJob/>
     <h1 className="heading-center">Completed Jobs</h1>
      <div className="outer" style={{height:'70vh'}}>
      <div className="ongoing-container">
      <table className="tables">
        <thead>
          <tr>
            <th>Employer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>View</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {completedJobs.length > 0 && completedJobs.map((job) => (
            <tr key={job._id}>
              <td>{job.employer.username}</td>
              <td>{new Date(job.startDate).toLocaleDateString()}</td>
              <td>{new Date(job.endDate).toLocaleDateString()}</td>
              <td>
                <button className="general-btn" onClick={() => handleView(job._id)}>View</button>
              </td>
              {/* <td>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </td> */}
              
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            <h2>Completed job details <span>  <button onClick={() => setShowPopup(false)}>❌</button></span></h2>
            <div className="popup-container">
            <p>Employer Name: {selectedJob.employer.username} </p>
            <p> Job category: {selectedJob.job.category} </p>
            <p> Job description: {selectedJob.job.description} </p>
            <p>Salary received: {selectedJob.salary}</p>
            <p>Rating: {"⭐".repeat(selectedJob.rating)}</p>
            <p>Feedback received: {selectedJob.message}</p>
            </div>
           
          
          </div>
        </div>
      )}
    </div>
     </div>
    </>
   
  );
}

export default CompletedJob