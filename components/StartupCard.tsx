import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {_createdAt, views, author: {_id: authorID, name}, _id, description, image, category, title} = post
  return (
    <li className='group startup-card'>
      <div className='flex-between'>
        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='text-primary size-6'></EyeIcon>
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between gap-5 mt-5'>
        <div className='flex-1'>
          <Link href={`/user/${authorID}`}>
            <p className='line-clamp-1 text-16-medium'>{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='line-clamp-1 text-26-semibold'>{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorID}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className='rounded-full' />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>
          {description}
        </p>
        <img src={image} alt="placeholder" className='startup-card_img'/>
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn'>
          <Link href={`/startup/${_id}`}>
            Read More
          </Link>
        </Button>
      </div>
    </li>
  )
}
