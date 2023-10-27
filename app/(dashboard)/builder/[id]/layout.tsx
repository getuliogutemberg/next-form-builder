import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col flex-grow mx-auto w-full h-screen'>{children}</div>
  )
}

export default layout