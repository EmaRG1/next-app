"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';

const StartupForm = () => {
  const [erros, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = React.useState("");
  const { toast } = useToast();
  //const router = useRouter();
  const handleFormSubmit = async (prevState :any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }

      await formSchema.parseAsync(formValues);
      console.log(formValues);
      //const result = await createIdea (prevState, formData, pitch)
      //console.log(result)
      // if (result.status === 'SUCCESS') {
      //   toast({
      //     title: "Success",
      //     description: "Your startup idea has been submitted successfully.",
      //   })
      //   router.push(`/startup/${result.id}`)
      // }
      // return result;
    } catch (error) {
      if( error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Validation Error",
          description: "Please check your form for errors.",
          variant: "destructive"
        })
        return {...prevState, error: "Validation Failed", status: "ERROR"}
      }
      toast({
        title: "Validation Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      })
      return {
        ...prevState,
        error: "Something went wrong",
        status: "ERROR"
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL'
  });
  

  return (
    <form action={formAction } className='startup-form'>
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

      <div data-color-mode="light">
        <label htmlFor="pitch" className='startup-form_label'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: 'Pitch your startup idea',
          }}
          previewOptions={{
            disallowedElements: ["stle"]
          }}
        />  
        {erros.pitch && <p className='startup-form_error'>{erros.pitch}</p>}
      </div>

      <Button disabled={isPending} type='submit' className='startup-form_btn text-white'>
        {isPending ? "Submitting..." : "Submit your pitch"}
        <Send className='ml-2 size-6'/>
      </Button>
      
    </form>
  )
}

export default StartupForm