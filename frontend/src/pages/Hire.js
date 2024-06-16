import React from 'react'
import NavHire from '../components/NavHire'
const Hire = () => {

  const getStyle = {
    display : 'flex',
    // justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'column',
    height : '70vh' ,
    width : '100vw',
    fontSize: '1vw'
  }

  const imgStyle = {
    height : '300px',
    
    
  }
  return (
    <>
    <NavHire/>
    <div style={getStyle}><h1>Welcome To Hiring Page</h1>
      <img src="https://www.allbusiness.com/media-library/hiring-staff-concept.jpg?id=32091288&width=400&height=400" style={imgStyle}></img>
     </div>
    </>
  )
}

export default Hire