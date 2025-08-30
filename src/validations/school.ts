import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string()
    .min(2, 'School name must be at least 2 characters')
    .max(100, 'School name must not exceed 100 characters'),
  
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),
  
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must not exceed 50 characters'),
  
  contact: z.string()
    .regex(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits'),
  
  email_id: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  
  image: z.any()
    .refine((files) => files?.length === 1, 'Image is required')
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      'Max file size is 5MB'
    )
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp files are accepted'
    ),
});

export type SchoolFormData = z.infer<typeof schoolSchema>;