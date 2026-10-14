import { defineCollection, z } from 'astro:content';

export const ICONS = [
  'truck',
  'tractor',
  'sparkles',
  'hammer',
  'crosshair',
  'factory',
] as const;

const jobs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Category is a slug that must match a file in src/content/categories
    // (managed under "Workshop categories" in the CMS).
    category: z.string().default(''),
    // One or more images; the workshop cards show arrows to browse them.
    images: z.array(z.string()).default([]),
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
    icon: z.enum(ICONS).default('sparkles'),
    description: z.string().default(''),
  }),
});

const slides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    text: z.string().default(''),
    image: z.string(),
    caption: z.string().optional(),
    order: z.number().default(0),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    label: z.string(),
    title: z.string().default(''),
    description: z.string().default(''),
    order: z.number().default(0),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string().default('MEET THE TEAM'),
    title: z.string(),
    sub: z.string().default(''),
    lead: z.string().default(''),
    points: z.array(z.string()).default([]),
    team: z.array(z.object({
      name: z.string(),
      role: z.string().default(''),
      photo: z.string().optional(),
      blurb: z.string().default(''),
    })).default([]),
  }),
});

const contact = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string().default('CONTACT'),
    title: z.string(),
    sub: z.string().default(''),
    phoneNote: z.string().default(''),
    addressNote: z.string().default(''),
  }),
});

const settings = defineCollection({
  type: 'content',
  schema: z.object({
    phone: z.string().default('01933 422290'),
    hours: z.string().default('Mon–Fri 07:30–17:30'),
    address: z.string().default(''),
    email: z.string().default(''),
    facebook: z.string().default(''),
    instagram: z.string().default(''),
    mapLat: z.coerce.number().optional(),
    mapLon: z.coerce.number().optional(),
  }),
});

export const collections = { jobs, services, slides, categories, about, contact, settings };
