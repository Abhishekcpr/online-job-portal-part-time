import React, {useState,useEffect} from 'react'
import NavHire from '../../components/NavHire'
import '../../CSS/Hire/Ongoing.css'

const OngoingJob = () => {
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

      const completedJobs = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/getcompletedjob`,{
        method : 'GET'
      });

      if(completedJobs.ok)
      {
        const jsonData = await completedJobs.json() ;

        // let getcompletedjob = jsonData.msg
        // getcompletedjob.sort((a,b)=> b.endDate - a.endDate)
        setCompletedJobs(jsonData.msg.filter((jobs)=> jobs.employer._id == id))
        console.log(jsonData.msg);

      }
    }catch(err)
    {
      alert(`Error: ${err}`)
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
      <NavHire/>
      <h1 className="heading-center">Completed Jobs</h1>
      <div className="outer" style={{maxHeight:'calc(100vh - 200px)'}}>
      <div className="ongoing-container"  >
      <table className="tables">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>View</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {completedJobs.length > 0 && completedJobs.map((job) => (
            <tr key={job._id}>
              <td>{job.employee.username}</td>
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
            <h2>Completed job details <span> <button onClick={() => setShowPopup(false)}>❌</button></span></h2>
            <div className="popup-container">
            <p>Name: {selectedJob.employee.username} </p>
            <p> Job category: {selectedJob.job.category} </p>
            <p> Job description: {selectedJob.job.description} </p>
            <p>Salary: {selectedJob.salary}</p>
            <p>Rating: {"⭐".repeat(selectedJob.rating)}</p>
            <p>Feedback given: {selectedJob.message}</p>
            </div>
           
           
          </div>
        </div>
      )}
    </div>
      </div>
    </>
   
  );
}

export default OngoingJob