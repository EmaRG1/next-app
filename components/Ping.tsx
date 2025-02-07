import React from 'react'

export const Ping = () => {
  return (
    <div className='relative'>
      <div className='top-1 -left-4 absolute'>
        <span className='flex size-[11px]'>
          <span className='inline-flex absolute bg-primary opacity-75 rounded-full w-full h-full animate-ping'></span>
          <span className='inline-flex relative bg-primary rounded-full size-[11px]'></span>
        </span>
      </div>
    </div>
  )
}
