import { auth } from '@/auth'
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import {  AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if(!user) return notFound();
  return (
    <>
      <section className='profile_container'>
        <div className='mt-5 profile_card'>
          <div className='profile_title'>
            <h3 className='text-24-black text-center uppercase line-clamp-1'>{user?.name }</h3>
          </div>
          <Image
            src={user?.image}
            alt={user?.name}
            width={220}
            height={220}
            className='profile_image'
          />
          <p className='mt-7 text-30-extrabold text-center'>@{user?.username}</p>
          <p className='mt-1 font-medium text-[16px] text-white text-center'>{ user?.bio}</p>
        </div>

        <div className='flex-col flex-1 gap-5 lg:mt-5'>
          <p className='mb-5 text-30-bold'>
            {session?.id === id ? 'Your' : 'All'} Startups
          </p>
          <ul className='card_grid-sm'>
            <Suspense fallback={<StartupCardSkeleton/>}>
              <UserStartups id={id}/>
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  )
}

export default page