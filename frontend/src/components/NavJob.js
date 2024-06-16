import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../CSS/NavHire.css'

const NavJob = () => {


    return (
        <>
         
          <header>
            <div className="navjobs-container">
             
             
                <ul className="navjobs-ul">
                  
                  <li>
                    <NavLink exact to="/jobs/active" activeClassName="active"> Active Jobs </NavLink>
                  </li>
                    <li>
                    <NavLink exact to="/jobs/ongoingjob" activeClassName="active"> Ongoing Jobs </NavLink>
                  </li>
                  <li >
                    <NavLink exact to="/jobs/completedjob" activeClassName="active"> Completed Jobs </NavLink>
                  </li>

                  {/* <li >
                    <NavLink exact to="/jobs/pendingjob" activeClassName="active">Pending Jobs</NavLink>
                  </li> */}
    
                </ul>
               
             
             
            </div>
          </header>
        </>
      );
}

export default NavJob