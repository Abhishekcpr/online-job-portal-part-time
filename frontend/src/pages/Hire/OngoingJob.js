import React, {useEffect, useState} from 'react'
import NavHire from '../../components/NavHire'
import '../../CSS/Hire/Ongoing.css'
const OngoingJob = () => {
 
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTestimonial, setShowPopupTestimonial] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // for testimonial form :
  const [formData, setFormData] = useState({
     employeeId : "",
     employerId : "",
     employee : "",
     email : "",
     jobId : "",
     startDate : "",
     endDate : "",
     salary : 0,
     rating : 1,
     message : "",
     appId:""
     

  });

  // form for changing job details :
  const [JobData, setJobData] = useState({
    
    jobId : "",
    startDate : "",
    duration : "",
    budget : 0,
    isJobOpen : true,
    description : ""
    

 });

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleView = async(id) => {
    
    setShowPopup(true);
    try{

      const jobApplications = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/getapplications/${id}`) ;
     
      if(jobApplications.ok)
      {
        const response = await jobApplications.json()
        setApplications(response.msg.filter((app)=> (app.applicationStatus != 'rejected' && app.applicationStatus != 'completed')));
        console.log("the repo",response);
      }

    }catch(err)
    {
      alert(`Error: ${err}`)
    }

  };

  const handleEdit = async(id)=>{

  }

  const handleDeleteJob = async(id) => {
   
    try{

       const deleteJob = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/removejob/${id}`,
      { method : 'DELETE'}
      ) ;

       if(deleteJob.ok)
       {
         setActiveJobs(activeJobs.filter((Job) => Job._id !== id));
        alert('Job deleted successfully') ;
       }

    }catch(err)
    {
      alert(`Error : ${err}`) ;
    }
    
  };

  const handleCompleteApplication = async(e) => {
    // setShowPopupTestimonial(false)
     e.preventDefault()
     try{

      const feedbackMail = {
        email : formData.email,
        subject: "feedback from recruiter",
        message : `Hi ${formData.employee}, your recruiter has given the following feedback on your work:
        Rating: ${formData.rating}
        Feedback: ${formData.message}
        `
      }
     
      const appComplete = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/completejob`, {
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({...formData,feedbackMail})
      })

      if(appComplete.ok)
      {
        handleApplicationStatus(formData.appId,"completed");
      }

     } catch(err)
     {
       alert(`Error : ${err}`);
     }
  };

  const handleApplicationStatus = async(_id, status)=>{
      try{

          const statusChange = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/applicationstatus`,{
            method : 'PATCH',
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({_id, status})
          })

          if(statusChange.ok)
          {
            setShowPopupTestimonial(false)
             alert(`Application ${status}`)
          }
      } catch(err)
      {
        alert(`Error : ${err}`)
      }
  }

  const fetchJobs = async () => {
    try {
    
      const getJobs = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/jobs/getalljobs`,
        {
          method: "GET",
        }
      );

      console.log(getJobs);

      if (getJobs.ok) {
        const jsonData = await getJobs.json();

        if (jsonData !== undefined && jsonData.msg.length > 0) {

          const myId = localStorage.getItem('login_id')
         
          const myJobs = jsonData.msg.filter((job)=>{
            return myId == job.employer._id 
          })
          setActiveJobs([ ...myJobs]);

          console.log(jsonData.msg);
        }
      }

      console.log("new", activeJobs);
    } catch (err) {
      alert(err);
    }
  };

  async function doSomething(){
    await fetchJobs()
  }

  useEffect(() => {
   
    const getId=  localStorage.getItem('login_id') ;
    setFormData({...formData, employerId : getId})
    doSomething()
   
  }, [applications.applicationStatus])
  

  return (
    <>
      <NavHire/>
      <div className="outer" style={{height:'70vh'}}>
      <h1 className="heading-center">Ongoing Jobs</h1>
      <div className="ongoing-container">
      <table className="tables">
        <thead>
          <tr>
            <th>Category</th>
            <th>Edit </th>
            <th>Applications </th>
            {/* <th>Delete </th> */}
            <th>Status </th>
            
          </tr>
        </thead>
        <tbody>
          {activeJobs.map((Job) => (
            <tr key={Job.id}>
              <td>{Job.category}</td>
              <td>
                <button onClick={() => handleEdit(Job._id)}>✏️</button>
              </td>
              <td>
                <button onClick={() => handleView(Job._id)}>👁️</button>
              </td>
              {/* <td>
                <button onClick={() => handleDeleteJob(Job._id)}>❌</button>
              </td> */}
              <td>
                {(Job.isJobOpen ? "Open": "Closed")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            <h2>Job Applications    <button onClick={() => setShowPopup(false)}>❌</button></h2>
            {
              applications.map((app)=>{
                return(
                 <>
                 {/* <img src={app.candidate.image} alt="" /> */}
                 <div className="popup-container">
                 <p>Name : {app.candidate.username}</p>
                 <p>Rating : {"⭐".repeat(app.candidate.rating)}</p>
                 <p>Demanded Budget : {app.demandedBudget}</p>
                 <p>Description : {app.description}</p>
                 <br/>
                 </div>
                  {app.applicationStatus == "pending" ? <button onClick={()=> handleApplicationStatus(app._id,"accepted")}> Accept</button> : <button 
                   onClick={()=> {
                   setShowPopup(false);
                   setShowPopupTestimonial(true);
                    setFormData({...formData,employee : app.candidate.username, jobId : app.job,email: app.candidate.email, employeeId : app.candidate._id , appId: app._id})
                   }}>
                   Complete</button>}

                  <button onClick={()=> handleApplicationStatus(app._id,"rejected")}>Reject</button>
                  <button>View Profile</button>
                 <br/>

                 </>
                )
              })
            }
          </div>
        </div>
      )}

      {showPopupTestimonial && (
        (
        <div className="popupActiveItem">
          <div className="popup-content">
            <h2>Customer Feedback</h2>
            <form onSubmit={handleCompleteApplication}>
              <label htmlFor="employee">Employee Name</label>
              <input
                type="text"
                id="employee"
                name="employee"
                value={formData.employee}
               
              />


              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleTestimonialChange}
              />

              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleTestimonialChange}
              />

              <label htmlFor="salary">Salary Given</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleTestimonialChange}
              />

              <label htmlFor="rating">Rating (out of 5)</label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleTestimonialChange}
                />

              <label htmlFor="message">Feedback</label>
              <input
                type="textarea"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleTestimonialChange}
               
              />


             

              <div className="buttons">
                <button type="submit" className="apply-btn" >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPopupTestimonial(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
      )}
    </div>
      </div>
     
    </>
   
  );
}

export default OngoingJob