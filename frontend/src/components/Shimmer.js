import React from 'react'
import '../CSS/Service-card.css'
import '../CSS/Shimmer.css'
const Shimmer = () => {

    const sampleArray = Array.from({ length: 8 });

  
  return (
   
     <div className="shimmer-ui">

   
        {
            sampleArray.map((element,key)=>{
              return  (<div className="service-container">
        <div className="service-image">
            <img src = {"https://miro.medium.com/v2/resize:fit:1400/1*jJKlUDkGzezjiFPagzvnuw.gif"} />
        </div>

       
    </div>)
            })
        }
     </div>
  
  )
}

export default Shimmer