import React from 'react'
import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error: any = useRouteError();
    console.error(error);
    const errorMsg = (error.status == 404) ? "404, Page not found" : `${error.status}, ${error}`
  return (
    <div className='flex content-center justify-center h-screen bg-red-100'>
      <div className='my-auto'>
        <h1 className='text-5xl font-bold'>Oops!</h1>
        <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
        <p className='text-xl'>
            <i>{errorMsg}....<Link to="/" className='text-blue-700 underline hover:text-blue-600'>home</Link></i>
        </p>
      </div>
    </div>
  )
}

export default ErrorPage



