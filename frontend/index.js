import logo from './logo.svg';
import './App.css';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import About from './pages/About.js';
import Register from './pages/Signup.js';
import Services from './pages/Services.js';
import Contact from './pages/Contact.js';
import {Outlet} from 'react-router-dom';
import { createBrowserRouter, RouterProvider ,Router} from 'react-router-dom';
import authContext from './store/auth.jsx';
import Error from './pages/Error.js';
import Footer from './components/Footer.js';
import Login from './pages/Login.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUsers from './pages/AdminUser.js';
import AdminContacts from './pages/AdminContacts.js'
import AdminUpdate from './pages/AdminUpdateUser.js';


function AppLayout() {
  const [token, setToken] = useState("");
  
  const [userData, setUserData] = useState({username : '', email : ''});


  const setLocalToken = (token)=>{
    localStorage.setItem('token', token) ;
  }

  const setAdmin = (id)=>{
    localStorage.setItem('adminid', id) ;
  }

  const removeAdmin = ()=>{
    localStorage.removeItem('adminid') ;
  }

  const removeToken = ()=>{
    localStorage.removeItem('token') ;
  }

  return (
    <>
      <authContext.Provider value={{setLocalToken, removeToken, token , setToken, userData, setUserData, setAdmin}}>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </authContext.Provider>
    </>
  )
}

function AdminLayout() {
  return (
    <>
    
        {/* <AdminNavbar/> */}
        <Outlet/>
        {/* <Footer/> */}
    
    </>
  )
}

const appProvider = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>
      },
      {
        path: "/about",
        element: <About/>,
        errorElement: <Error/>
      },
      {
        path: "/contact",
        element: <Contact/> ,
        errorElement: <Error/>
      },
      {
        path: "/services",
        element: <Services/> ,
        errorElement: <Error/>
      },
      {
        path: "/signup",
        element: <Register/> ,
        errorElement: <Error/>
      },
      {
        path: "/login",
        element: <Login/> ,
        errorElement: <Error/>
      },
      {
        path: "/hire",
        element: <Hire/> ,
        errorElement: <Error/>
      },
      {
        path: "/jobs",
        element: <Jobs/> ,
        errorElement: <Error/>
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
     
     
      {
        path: "/admin/users",
        element: <AdminUsers/> ,
        errorElement: <Error/>
      },

      {
        path: "/admin/users/edit/:id",
        element: <AdminUpdate/> ,
        errorElement: <Error/>
      },

      {
        path: "/admin/contacts",
        element: <AdminContacts/> ,
        errorElement: <Error/>
      }
      // Add more admin routes as needed
    ]
  }
]);

const Root = ReactDOM.createRoot(document.getElementById("root")) ;
 
 // using this will allow you to render different pages
 Root.render(
  <>
    <RouterProvider router={appProvider} />
  <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
  </>
 ) ;
//  Root.render(<AppLayout/>) ;