import React from 'react'
import { useCheckAuth } from '../../api/auth'

const AirLatency: React.FC = () => {
  useCheckAuth();
  return (
    <>
    <div>AirLatency</div>
    
    </>
  )
}

export default React.memo(AirLatency)