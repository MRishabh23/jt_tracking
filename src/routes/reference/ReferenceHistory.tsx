import React from 'react'
import { useCheckAuth } from '../../api/auth';

//import { useSearchParams, useLocation } from 'react-router-dom'

const ReferenceHistory: React.FC = () => {
  useCheckAuth();
  return (
    <div>Reference History</div>
  )
}

export default React.memo(ReferenceHistory)