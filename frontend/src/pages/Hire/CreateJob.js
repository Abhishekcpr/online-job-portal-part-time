import React, {useEffect, useState} from 'react'
import NavHire from '../../components/NavHire'
import '../../CSS/Hire/CreateJob.css'
import getGeminiResponse from '../../utils/geminiResponse'
import getCurrentLocation from '../../utils/useCurrentLocation'
import { toast } from 'react-toastify';

const CreateJob = () => {

  const [transcript, setTranscript] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [isListening, setIsListening] = useState(false);
  const [geminiResponse , setGeminiResponse] = useState('')
  const recognition = new window.webkitSpeechRecognition(); // For Chrome
  const [myLocation, setMyLocation] = useState("")
  const [myLocationCoord, setCoord] = useState(['0','0'])
  const [geminiObject, setGeminiObject ]  = useState({})
  const [enableAccept, setEnableAccept] = useState(false)
  const [micIcon, setMicIcon] = useState('🎙️')

  let categories = ['appliance repair', 'transportation','electrician', 'plumber','mason','labour', 'android app developer', 'web developer', 'graphic designer', 'painter', 'video editor', 'tutor', 'beauty and cosmetics', 'barber','other'];

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    image: '',
    startDate: getTodayDate(),
    duration: 0,
    budget: 0,
    locationAdd: '',
    locationCoord:[],
    employer: ''
  });

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file });
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // const empId = localStorage.getItem('login_id') ;
    // setFormData({...formData, employer : empId})
    console.log("the id:",formData.employer);
    console.log(formData);
    try{
     
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/createjob`, {
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
       })

      

      if(response.ok)
      {
        const jsonData = await response.json()
        console.log("Job details" , jsonData.msg);
        toast.success("Job created successfully")

        
      }
      else
      {
        const jsonData = await response.json()
        toast.error(jsonData.msg)
      }

     } catch(err){
       console.log("Error:", err);
     }
     
     setFormData({
      ...formData,
      category: '',
      description: '',
      image: '',
      duration: 0,
      budget: 0,
      employer : ''
    
    })
   
  };


  recognition.lang = 'en-US'; // Set language to English

  recognition.onstart = () => {
    setIsListening(true);
    console.log('Listening...');
  };

  recognition.onresult = async(event) => {
    const currentTranscript = event.results[0][0].transcript;
    console.log("The text given is=>", currentTranscript);
    setTranscript(currentTranscript);
  //  const theGeminiResponse = await getGeminiResponse(transcript)
  //  alert(theGeminiResponse.bot)
  };

  recognition.onerror = event => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  };

  const startListening = () => {
    recognition.start();
  };

  const stopListening = async() => {
    recognition.abort();
    setIsListening(false);
    setMicIcon("Fetching Response...");
    
    const prefixCmd = 'Consider the prompt given as follows and construct a json on the basis of the prompt in the following format : {"category": , "description" : , "budget" : , "duration" :}  if the duration and budget is not specified, use default value 0. Use the following categories if they are relevant else give your own category :' + JSON.stringify(categories) + ". PROMPT: "
  
    let apiData = await getGeminiResponse( prefixCmd + transcript);
    
     console.log(apiData);
     setGeminiResponse(apiData)
     
     if(apiData != undefined)
     {
      setMicIcon("🎙️")
     // Regular expression to find JSON object within geminiResponse
const jsonRegex = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}))*\}/;

// Find JSON object using the regular expression
const jsonDataMatch = apiData.match(jsonRegex);
if (jsonDataMatch) {
  const jsonDataString = jsonDataMatch[0];
  console.log(jsonDataString);

  try {
    const myObject = JSON.parse(jsonDataString);
    console.log(myObject);
    setGeminiObject(myObject);
    setEnableAccept(true)
  } catch (err) {
    console.log(err);
  }
} else {
  toast.error('JSON data not found in geminiResponse.');
}
     }
   

     
     
  };

  function setDetailsUsingPrompt(prompt)
  {
     const empId = localStorage.getItem('login_id') ;
   
     setFormData({...formData, description: geminiObject.description, budget : geminiObject.budget, category : geminiObject.category, duration : geminiObject.duration, locationAdd : myLocation, locationCoord: myLocationCoord, employer :empId });

     setTranscript('')
     setGeminiResponse('')
  }

  async function getTheLocation()
  {
    await getCurrentLocation(setMyLocation,setCoord)
    
    setFormData({...formData,locationAdd:myLocation})
    console.log("The location", myLocation);
  }

  useEffect(()=>{

    // <--------------- ENABLE BELOW ITEM LATER ------->
    const empId = localStorage.getItem('login_id') ;
    console.log(empId);
    setFormData({...formData, employer : empId}) ;
    //  getTheLocation()
  
  }, [myLocation])


  return (
    <>
    <NavHire/>
      <div className="jobs-header">
      <h1 className="create-job-heading">
      Create a new job
     </h1>
     <button  className="ai" onClick={() => {setShowPopup(true) ; setEnableAccept(false)}}>Use voice command</button>
      </div>
     <div className="create-job-container">


{showPopup && (
         
<div className="popup-container">
<div className="popup">
  <button  className="voice-button" onClick={isListening ? stopListening : startListening}>
             {isListening ? '⭕' : micIcon}
             </button>
    <p>{transcript}</p>
    <div className="button-group">
      <button className="accept" disabled={!enableAccept} onClick={()=>{ setShowPopup(false) ; setDetailsUsingPrompt(geminiResponse)}}>Accept</button>
      <button className="reject" onClick={()=>{ setShowPopup(false)}}>Reject</button>
      <button className="try-again" onClick={()=>{setTranscript('')}}>Try Again</button>
    </div>
  </div>
</div>
 
)}
    
     <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category<span className='required-asterisk'>*</span></label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="description">Description<span className='required-asterisk'>*</span></label>
      <textarea
        id="description"
        name="description"
        rows="6"
        value={formData.description}
        onChange={handleInputChange}
        required
      />

      {/* <label htmlFor="image">Image (Google drive link) :</label>
      <input
        type="text"
        id="image"
        name="image"
        onChange={handleInputChange}
        
      /> */}

      <label htmlFor="startDate">Start Date<span className='required-asterisk'>*</span></label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        id="duration"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="budget">Budget<span className='required-asterisk'>*</span></label>
      <input
        type="text"
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="location">Location<span className='required-asterisk'>*</span></label>
      <input
        type="text"
        id="location"
        name="locationAdd"
        value={formData.locationAdd}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Create Job</button>
    </form>
     </div>
    </>
  )
}

export default CreateJob
