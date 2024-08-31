import React from 'react'

const Spinner = () => {

    const styleObj = {
        height : "100vh",
        width : "100vw",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    }
  return (
    <div className="spinner" style={styleObj}>
        <img src="/images/spinner.svg" alt="spinner" />
    </div>
  )
}

export default Spinner