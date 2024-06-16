import React from 'react'
import '../CSS/Service-card.css'
import { NavLink } from 'react-router-dom'
const Cards = (props) => {
  return (
   <NavLink to={props.src} className="navlink">
     <div className="service-container">
        <div className="service-image">
            <img src = {props.imgSrc} />
        </div>

        <h1 className="service-heading">{props.heading}</h1>
        <p className="service-desc">{props.para}</p>
    </div>
   </NavLink>
  )
}

export default Cards