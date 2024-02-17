import React from 'react'

const ServiceItem = ({ serviceName, index }) => {
  return (
    <div>
        <div key={index}>
        <h3>{index}. {serviceName}</h3>
        </div>
    </div>
  )
}

export default ServiceItem