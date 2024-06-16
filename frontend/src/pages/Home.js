import React from 'react'
import Navbar from '../components/Navbar'
import '../CSS/Home.css'
import Footer from '../components/Footer'
const Home = () => {
  return (
   <>
   
     <h1 className="main-heading">Earn Money Online</h1>

     <div className="outer-container">
      <div className="section1 flex">
        <div className="context-box border" >
          <h2 className="content-heading">Hire Trusted and Skilled Workers Online</h2>
           <ul className="benefits">
            <li className="benefits-item"> Set your budget and hire workers who meet your financial requirements</li>
            <li className="benefits-item">Every worker on our platform undergoes a thorough vetting process, ensuring trust and reliability.</li>
            <li className="benefits-item">Include testimonials from satisfied customers or clients who have used your platform to hire skilled workers. </li>
           
           </ul>
        </div>
        <div className="image-box border" ><img src="/images/img1.avif" alt="" /></div>
      </div>

      <div className="section2 flex">
       
      <div className="image-box border" ><img src="/images/img2.webp" alt="" /></div>
        <div className="context-box border " >
          <h2 className="content-heading">Discover Talented Digital Workers for Your Projects</h2>
           <ul className="benefits">
            <li className="benefits-item"> Set your budget and hire workers who meet your financial requirements</li>
            <li className="benefits-item"> Explore a wide range of digital talents including web developers, graphic designers, video editors, and bloggers</li>
            <li className="benefits-item">Find workers who fit your project needs and budget, whether it's a one-time task or ongoing collaboration. </li>

            <li className="benefits-item">Review portfolios, ratings, and reviews to ensure you're hiring top-notch digital professionals.</li>
           
           </ul>
        </div>
        
      </div>


      
     </div>

   
   </>
  )
}

export default Home