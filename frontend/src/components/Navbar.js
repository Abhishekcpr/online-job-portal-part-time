import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import { useState } from "react";
import authContext from "../utils/authContext";
import { useContext, useEffect } from "react";
import axios from 'axios'
import actionCommand from "../utils/actionCommands";
import getGeminiResponse from "../utils/geminiResponse";
// import { faBars } from '@fortawesome/free-solid-svg-icons';

 const Navbar = () => {

  // listening module 
  const [transcript, setTranscript] = useState('');
  const [searchText, setSearchText] = useState('')
  const [isListening, setIsListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition(); 
  const {isLoggedIn, setLogin} = useContext(authContext)
  const [geminiResponse, setGeminiResponse] = useState("")
  const arrayLinks = ["home", "about" , "contact" , "services","login", "signup","logout","jobs" , "hire"] ;

  
  
  

  const navigate = useNavigate()
  const [navOpen , setNavOpen] = useState(false)

  recognition.lang = 'en-US';

  recognition.onstart = () => {
    setIsListening(true);
    console.log('Listening...');
  };

  recognition.onresult = async(event) => {
    const currentTranscript = event.results[0][0].transcript;
    console.log("The text given is=>", currentTranscript);
    setTranscript(currentTranscript);
  
  };

  recognition.onerror = event => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  };

  const startListening = () => {
    recognition.start();
  };

  const stopListening = async() => {
    recognition.stop();
    setIsListening(false);
   
    const prefixCmd =  JSON.stringify(actionCommand)  +  " Use this json to find most suitable key according to description and return the key only, you may need to translate the prompt."
    let apiData = await getGeminiResponse( prefixCmd+ transcript);
   
    console.log("api data", apiData);

    if(apiData !== undefined)
    {
       apiData = apiData.toLowerCase()
      // console.log("my transcript=>", typeof(apiData));
        for( let val in actionCommand)
        { 

          if(apiData.includes(val))
          {
            console.log("action performed ",val);
            // alert(arrayLinks[val]);

            navigate("/" + (actionCommand[val].link)) ;
          }
        }
    }
    else
    {
      alert("Could not process the intruction!!!")
    }

     
     
  };
    
 
    
    function logoutUser()
    {
      setLogin(false) ;
      localStorage.removeItem('login_id') ;
      localStorage.removeItem('login_detail') ;
      localStorage.removeItem('token') ;
    }

    function toggleCollapse()
    {
        const nav = document.querySelector("nav"); 

    if (navOpen) {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
        setNavOpen(!navOpen)
    }

   

    useEffect(() => {
      
      const getLoginStatus = localStorage.getItem('login_id') ;
      console.log("login status", getLoginStatus);
      if(getLoginStatus != undefined)
      {

        setLogin(true)
      }
    }, [isLoggedIn])
    
  return (
    <>
     
      <header>
        <div className="container">
          <div className="logo-brand">
            
            <NavLink exact to="/"><img src="/images/logo.png" alt="" className="company-logo" /></NavLink>
          </div>

          <nav>
            <ul className="nav-ul">
             
             <li className="voiceSearch">
              <input type="text" className="search-bar" value={transcript} placeholder="AI navigate..." />
             {/* <button className="search-button">🔎</button> */}
             <button  className="voice-button" onClick={isListening ? stopListening : startListening}>
             {isListening ? '⭕' : '🎙️'}
             </button>
             </li>

              <li>
                <NavLink  exact to="/" activeClassName="active-nav"> Home </NavLink>
              </li>
              {/* <li>
                <NavLink exact to="/about" activeClassName="active-nav"> About </NavLink>
              </li> */}
              <li>
                <NavLink exact to="/services" activeClassName="active-nav"> Services </NavLink>
              </li>
              <li>
                <NavLink exact to="/contact" activeClassName="active-nav"> Contact </NavLink>
              </li>

              {/* <li>
                <NavLink to="/signup"> Signup </NavLink>
              </li>

              <li>
                <NavLink to="/login"> Login </NavLink>
              </li> */}

              {isLoggedIn ? (
                
                <>
                <li>
                  <NavLink to="/jobs" >Find Jobs</NavLink>
                </li>

                <li>
                  <NavLink to="/hire" >Hire</NavLink>
                </li>

                <li>
                  <NavLink to="/profile" >My Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={logoutUser}>Logout</NavLink>
                </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/signup"> Signup </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
           
          </nav>
          <div className="nav-button" onClick={()=> toggleCollapse()}>{navOpen ? "❌" : "🔽" }</div>
        </div>
      </header>
    </>
  );
};

export default Navbar;