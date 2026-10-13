import { defineCollection, z } from 'astro:content';

export const CATEGORIES = [
  'car',
  'bike',
  'van',
  'commercial',
  'plant',
  'classic',
] as const;

const jobs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORIES),
    image: z.string().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { jobs, services };
