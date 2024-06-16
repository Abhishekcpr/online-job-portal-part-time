import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Services from './pages/Services'
import Contact from './pages/Contact'
import About from './pages/About'
import Error from './pages/Error'
import authContext from './utils/authContext'
import { createBrowserRouter, RouterProvider ,Router} from 'react-router-dom';
import Profile from './pages/Profile'
import Hire from './pages/Hire'
import Jobs from './pages/Jobs'
import ActiveJobsHire from './pages/Hire/ActiveJobs'
import Saved from './pages/Hire/Saved'
import CreateJob from './pages/Hire/CreateJob'
import CompletedJobHire from './pages/Hire/CompletedJob'
import OngoingJobHire from './pages/Hire/OngoingJob'
import OngoingJob from './pages/Jobs/OngoingJob'
import CompletedJob from './pages/Jobs/CompletedJob'
import PendingJob from './pages/Jobs/PendingJob'
import ActiveJob from './pages/Jobs/ActiveJob'
import UserProfile from './pages/UserProfile'




const AppLayout = ()=>{

  const [isLoggedIn, setLogin] = useState(false)

  const [navHireActive, setNavHire] = useState('createjob')
  
  return (
    <>
      <authContext.Provider value = {{isLoggedIn, setLogin, navHireActive, setNavHire}}>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </authContext.Provider>
    </>
  )
}

const appProvider = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: "/services",
        element: <Services />,
        errorElement: <Error />,
      },
      {
        path: "/signup",
        element: <Register />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "/hire",
        element: <Hire />,
        errorElement: <Error />,
       
      },
      {
        path: "/hire/saved", 
        element: <Saved />,
        errorElement: <Error />,
      },
      {
        path: "/hire/active", 
        element: <ActiveJobsHire />,
        errorElement: <Error />,
      },
      {
        path: "/hire/createjob", // Relative path
        element: <CreateJob />,
        errorElement: <Error />,
      },
     
      {
        path: "/hire/ongoingjob", // Relative path
        element: <OngoingJobHire />,
        errorElement: <Error />,
      },
      {
        path: "/hire/completedjob", // Relative path
        element: <CompletedJobHire />,
        errorElement: <Error />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
        errorElement: <Error />,
      },
      {
        path: "/jobs/completedjob",
        element: <CompletedJob/>,
        errorElement: <Error />,
      },
      {
        path: "/jobs/active",
        element: <ActiveJob/>,
        errorElement: <Error />,
      },
      {
        path: "/jobs/ongoingjob",
        element: <OngoingJob/>,
        errorElement: <Error />,
      },
      {
        path: "/jobs/pendingjob",
        element: <PendingJob/>,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/user-profile/:userid",
        element: <UserProfile />,
        errorElement: <Error />,
      }
    ],
  },
]);

const App = () => {
  return (
   <appProvider/>
  )
}



export default appProvider