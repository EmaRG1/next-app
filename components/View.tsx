import React from 'react'
import { Ping } from './Ping'

import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'


export const View = async ({ id }: { id: string }) => {
  
  const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id })
  
  after(
    async () => await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit());
  
  return (
    <div className='view-container'>
      <div className='-top-2 -right-2 absolute'>
        <Ping />
      </div>
        <p className='view-text'>
          <span className='hidden sm:inline mr-1 font-black'> Views:</span>
          <span className='font-black'>{totalViews}</span>
        </p>
    </div>
  )
}
