import React from 'react'
import Cards from '../components/Service-cards'
import '../CSS/Service-card.css'

const Services = () => {
  const serviceObj = {
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc : "https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=",
    heading : "Main heading",
    para : "THis is some random content"
  }
  return (
   <section>
   <h1 className="service-head">Skilled worker services</h1>
   <div className="services">
   {   Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://miro.medium.com/v2/resize:fit:1130/1*1SYIdp-nJIvHhNpAy_aOxg.jpeg',
    'transportation' : 'https://www.odtap.com/wp-content/uploads/2019/03/5-Top-Technology-Trends-in-Transportation-and-Logistics-Industry.png',
    heading : "Appliance Repair",
    para : ""
   }) 
     
    }

    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://cdn.langeek.co/photo/20974/original/',
    heading : "Electrician",
    para : ""
   }) 
     
    }

    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://www.shutterstock.com/image-vector/plumbing-specialist-toolbox-fixing-repairing-260nw-1042465225.jpg',
    heading : "Plumber",
    para : ""
   }) 
     
    }

    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://3.imimg.com/data3/EO/IR/MY-15660944/images-mason-500x500.jpg',
    heading : "Mason",
    para : ""
   }) 
     
    }

    
   </div>

   <h1 className="service-head">Digital services</h1>
    
   <div className="services">
   { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://www.androiddeveloper.co.in/blog/wp-content/uploads/2016/03/Android-App-Development-2.jpg',
    heading : "App developer",
    para : ""
   }) 
     
    }

    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://res.cloudinary.com/hamstech/images/v1637134439/Hamstech%20App/Title-Image-4_80465274aebb5/Title-Image-4_80465274aebb5.jpg?_i=AA',
    heading : "Graphic designer",
    para : ""
   }) 
     
    }

    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fvideo-editing-software.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.6038&fp-y=0.2953&h=600&q=80&w=1200&s=127f2876ce973179bb8b5bfb4b62ebaa',
    heading : "Video editor",
    para : ""
   }) 
     
    }
    { Cards({
    src : "https://www.youtube.com/channel/UC3BMN1frZxZ0dbuecn_Rv6A",
    imgSrc :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIyS4uyxPyPUO7I1Gm7czBHzuIJCsO0npSmWDISkVkoQ&s',
    heading : "Tutor",
    para : ""
   }) 
     
    }

  
   </div>
   </section>

  )
}

export default Services