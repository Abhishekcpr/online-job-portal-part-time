import React, { useEffect, useState } from "react";
import NavJob from "../../components/NavJob";
import "../../CSS/Jobs/ActiveItems.css";
const activeComponent = (props) => {
  console.log("the style -=>",(props.employer != undefined ? "" : props));
  return (
    <>
      <div className="active-workers-inner-container">
        <div className="left-container-img">
          <img src={props.image} alt="job image" />
          {/* <img src={props.image} alt="" /> */}
        </div>
        <div className="right-container-info">
          <h3 className="worker-name">{props.employer.username }</h3>
          <p className="location">Location :{props.locationAdd}</p>
          <p className="skills">Category :{props.category}</p>
          <p className="skills truncated">Description :{props.description}</p>
          <p className="wages">Expected Budget :{props.budget}</p>
          {/* <button onClick={()=>props.jobApply(props._id, props.employer.email)}>Apply</button> */}
          <button className="general-btn" onClick={() => {props.setShowPopup(true) 
                props.fillApplicationForm(props)
          }}>Apply</button>
        </div>
      </div>
    </>
  );
};

const ActiveJob = () => {
  const sampleObject = {
    image:
      "https://www.clipartmax.com/png/small/144-1445560_business-finance-icons-in-svg-and-png-employment-icon.png",
    employer : {username: "King coder"},
    category: "Miscellaneous",
    description: "some random work",
    startDate: "24-07-2024",
    locationAdd: "Gorakhpur",
    budget: "$500/hr",
  };

  // skills : ["app development", "Web designing", "Code reviewer"],

  const [activeJobs, setActiveJobs] = useState([sampleObject]);
  const [activePage, setActivePage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    employerId: "",
    jobId : "",
    employerEmail : "",
    employerName: "",
    category: "",
    location: "",
    duration: "",
    description: "",
    expectedBudget: "",
    yourBudget: "",
    messageToRecruiter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const fetchJobs = async () => {
    try {
      console.log("reached...");
      const getJobs = await fetch(
        "http://localhost:5000/api/jobs/getalljobs/",
        {
          method: "GET",
        }
      );

      console.log(getJobs);

      if (getJobs.ok) {
        const jsonData = await getJobs.json();

        if (jsonData !== undefined && jsonData.msg.length > 0) {

         const allOpenJobs =  jsonData.msg.filter((jobs)=>{
             return jobs.isJobOpen == true
          })
          setActiveJobs([...allOpenJobs]);

          console.log(jsonData.msg);
        }
      }

      console.log("new", activeJobs);
    } catch (err) {
      alert(err);
    }
  };

  const fillApplicationForm = (details)=>{

    setFormData({
      ...formData,
      employerId : details.employer._id,
      employerEmail : details.employer.email,
      jobId : details._id,
      employerName: details.employer.username,
    category: details.category,
    location: details.locationAdd,
    duration: details.duration,
    description: details.description,
    expectedBudget: details.budget,
    

    })
  }


  const jobApply = async (jobId, employerEmail,employerId) => {
    const getId = localStorage.getItem("login_id");
    let getDetails = localStorage.getItem("login_detail");

    getDetails = JSON.parse(getDetails);
    // console.log("email->", getDetails);

    if(employerId === getId)
    {
      alert("You can't apply to your own created job")
      return ;
    }



    const workerMail = {
      email: getDetails.email,
      subject: "Job applied",
      message: `You have successfully applied to the job :${jobId}`,
    };

    const employerMail = {
      email: employerEmail,
      subject: "New application received",
      message: `${getDetails.username} applied to the job : ${jobId} you created. View complete details on EMO website`,
    };
    if (getId == undefined || getDetails == undefined)
      alert("You need to login to save profile");
    else {
      try {
        const apply = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/jobapply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: getId,
            jobId,
            employerMail,
            workerMail,
            demandedBudget : formData.yourBudget,
            description : formData.messageToRecruiter
          }),
        });

        if (apply.ok) {
          alert("Job applied successfully");
        }
        // console.log(saveWorkerProfile);
      } catch (err) {
        alert(`Error : ${err}`);
      }
    }
  };

  async function doSomething() {
    await fetchJobs();
  }

  useEffect(() => {
    setActivePage(true);
    doSomething();
  }, []);

  return (
    <>
      <NavJob />

      {showPopup && (
        <div className="popupActiveItem">
          <div className="popup-content">
            {/* <span className="close-btn" onClick={onClose}>×</span> */}
            <h2>Apply for Job</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="employerName">Employer Name</label>
              <input
                type="text"
                id="employerName"
                name="employerName"
                value={formData.employerName}
               
              />

              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                
              />

              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                
              />

              <label htmlFor="description">Description</label>
              <input
                type="textarea"
                id="description"
                name="description"
                value={formData.description}
               
              />

              <label htmlFor="expectedBudget">Expected Budget</label>
              <input
                type="text"
                id="expectedBudget"
                name="expectedBudget"
                value={formData.expectedBudget}
               
              />

              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
               
              />

              <label htmlFor="yourBudget">Your Budget</label>
              <input
                type="text"
                id="yourBudget"
                name="yourBudget"
                value={formData.yourBudget}
                onChange={handleChange}
              />

              <label htmlFor="messageToRecruiter">Message to Recruiter</label>
              <input
                type="textarea"
                id="messageToRecruiter"
                name="messageToRecruiter"
                value={formData.messageToRecruiter}
                onChange={handleChange}
              /> 

            

              <div className="buttons">
                <button type="submit" className="apply-btn" onClick={() => {setShowPopup(false)
                 jobApply(formData.jobId,formData.employerEmail, formData.employerId)
                }
                  
                }>
                  Apply
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <h1 className="active-worker-heading heading-center">Active Jobs</h1>

      <div className="active-worker-container">
        {activeJobs.length == 0 || activeJobs[0] === null ? (
          <center>
            <h3>There are no active jobs</h3>
          </center>
        ) : (
          activeJobs.map((element) => {
            return activeComponent({ ...element, jobApply, setShowPopup, fillApplicationForm });
          })
        )}
      </div>
    </>
  );
};

export default ActiveJob;
