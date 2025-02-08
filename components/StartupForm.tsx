"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';

const StartupForm = () => {
  const [erros, setErrors] = useState<Record<string, string>>({});
  return (
    <form action={() => { }} className='startup-form'>
      <div>
        <label htmlFor="title" className='startup-form_label'>
          Title
        </label>
        <Input 
          id='title' 
          name='title' 
          className='startup-form_input' 
          required 
          placeholder='Startup name' 
        />

        {erros.title && <p className='startup-form_error'>{erros.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className='startup-form_label'>
          Description
        </label>
        <Textarea
          id='description' 
          name='description' 
          className='startup-form_textarea' 
          required 
          placeholder='Startup description' 
        />

        {erros.description && <p className='startup-form_error'>{erros.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className='startup-form_label'>
          Category
        </label>
        <Input 
          id='category' 
          name='category' 
          className='startup-form_input' 
          required 
          placeholder='Startup category (Tech, Health, Education, etc...)' 
        />

        {erros.category && <p className='startup-form_error'>{erros.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className='startup-form_label'>
          Image URL
        </label>
        <Input 
          id='link' 
          name='link' 
          className='startup-form_input' 
          required 
          placeholder='Startup image URL' 
        />

        {erros.link && <p className='startup-form_error'>{erros.link}</p>}
      </div>
    </form>
  )
}

export default StartupForm