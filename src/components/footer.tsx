import React from 'react'

interface props{}

const Footer:React.FC<props> = () => {
  return (
    <footer className="h-[8%] flex items-center justify-center py-4">
        <span>©2023 Justransform - All Rights Reserved.</span>
    </footer>
  )
}

export default React.memo(Footer)