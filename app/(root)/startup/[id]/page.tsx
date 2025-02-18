import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/View';
import { StartupCard, StartupCardType } from '@/components/StartupCard';

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  const id = (await params).id;

  const [post, {select: editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
  ]);

  const paresedContent = md.render(post?.pitch || '');

  if (!post) return notFound();
  return (
    <>
      <section className='!min-h-[230px] pink_container'>
        <p className='tag'>{formatDate(post._createdAt) }</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='max-w-5xl sub-heading'>{post.description}</p>
      </section>

      <section className='section_container'>
        <img src={post.image} loading='lazy' alt="placeholder" className='shadow-sm rounded-xl w-full h-auto' />
        <div className='space-y-5 mx-auto mt-10 max-w-4xl'>
          <div className='flex-between gap-5'>
            <Link href={`/user/${post.author._id}`} className='flex items-center gap-2 mb-3'>
              <Image src={post.author.image} alt="avatar" width={64} height={64} className='drop-shadow-lg rounded-full' />
              <div>
                <p className='text-20-medium'>{post.author.name}</p>
                <p className='!text-black-300 text-16-medium'>@{post.author.username}</p>
              </div>
            </Link>

            <p className='category-tag'>{post.category}</p>
          </div>

          <h3 className='text-30-bold'>Pitch Details</h3>
          {paresedContent ? (
            <article className='max-w-4xl font-work-sans break-all prose' dangerouslySetInnerHTML={{__html: paresedContent}}/>
          ) : (
              <p className='no-results'>No details provided</p>
          )}
        </div>
        <hr className='divider' />

        {
          editorPosts && (
            <div className='mx-auto max-w-4xl'>
              <p className='text-30-semibold'>Editor Picks</p>

              <ul className='card_grid-sm mt-7'>
                {editorPosts?.map((post: StartupCardType, index: number)=>(<StartupCard key={index} post={post} />))}
              </ul>
            </div>
          )
        }


        <Suspense fallback={<Skeleton className='view-skeleton'/>}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default page
