import z from 'zod'

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20, { message: 'Description must be at least 20 characters long' }).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url().superRefine(async (url, ctx) => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type');
      
      if (!contentType || !contentType.startsWith('image/')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'The URL must point to a valid image.',
        });
      }
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Failed to fetch the URL.',
      });
    }
  }),
  pitch : z.string().min(10)
})