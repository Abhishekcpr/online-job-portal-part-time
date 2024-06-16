import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../CSS/NavHire.css'

const NavHire = () => {


    return (
        <>
         
          <header>
            <div className="navjobs-container">
             
             
                <ul className="navjobs-ul">
                  <li >
                    <NavLink exact to="/hire/createjob" activeClassName="active"> Create a Job </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/hire/active" activeClassName="active"> Active Workers </NavLink>
                  </li>
                    <li>
                    <NavLink exact to="/hire/ongoingjob" activeClassName="active"> Ongoing Jobs </NavLink>
                  </li>
                  <li >
                    <NavLink exact to="/hire/completedjob" activeClassName="active"> Completed Jobs </NavLink>
                  </li>

                  <li >
                    <NavLink exact to="/hire/saved" activeClassName="active">Saved Profiles</NavLink>
                  </li>
    
                </ul>
               
             
             
            </div>
          </header>
        </>
      );
}

export default NavHire