import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'home',
      title: 'Home Page',
      type: 'object',
      fields: [
        // Hero Section
        defineField({
          name: 'hero',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'localeString' }),
            defineField({ name: 'subtitle', type: 'localeText' }),
            defineField({
              name: 'cta',
              type: 'object',
              fields: [
                defineField({ name: 'text', type: 'localeString' }),
                defineField({ name: 'link', type: 'string' }),
              ]
            }),
            defineField({
              name: 'media',
              type: 'object',
              fields: [
                defineField({ name: 'type', type: 'string', options: { list: ['image', 'video'] } }),
                defineField({ name: 'url', type: 'string', title: 'Video URL (YouTube/Direct)' }),
                defineField({ name: 'image', type: 'image', title: 'Image Upload', options: { hotspot: true } }),
              ]
            }),
          ]
        }),
        // About Section
        defineField({
          name: 'about',
          title: 'About Section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'localeString' }),
            defineField({ name: 'description', type: 'localeText' }),
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
          ]
        }),
        // Services Section
        defineField({
          name: 'services',
          title: 'Services Section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'localeString' }),
            defineField({
              name: 'items',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({ name: 'id', type: 'string' }),
                  defineField({ name: 'title', type: 'localeString' }),
                  defineField({ name: 'description', type: 'localeText' }),
                  defineField({ name: 'icon', type: 'string' }),
                ]
              }]
            }),
          ]
        }),
        // Media Section
        defineField({
          name: 'media_section',
          title: 'Media Section (Featured Video)',
          type: 'object',
          fields: [
            defineField({ name: 'type', type: 'string' }),
            defineField({ name: 'url', type: 'string' }),
            defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
          ]
        }),
        // Testimonials
        defineField({
          name: 'testimonials',
          title: 'Testimonials Section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'localeString' }),
            defineField({
              name: 'items',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({ name: 'id', type: 'string' }),
                  defineField({ name: 'name', type: 'string' }),
                  defineField({ name: 'role', type: 'string' }),
                  defineField({ name: 'feedback', type: 'localeText' }),
                  defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
                ]
              }]
            }),
          ]
        }),
        // Contact
        defineField({
          name: 'contact',
          title: 'Contact Section',
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'localeString' }),
            defineField({
              name: 'details',
              type: 'object',
              fields: [
                defineField({ name: 'email', type: 'string' }),
                defineField({ name: 'phone', type: 'string' }),
                defineField({ name: 'address', type: 'string' }),
              ]
            }),
          ]
        }),
      ]
    }),
    defineField({
      name: 'common',
      title: 'Common Content',
      type: 'object',
      fields: [
        defineField({
          name: 'nav',
          type: 'object',
          fields: [
            defineField({ name: 'home', type: 'localeString' }),
            defineField({ name: 'about', type: 'localeString' }),
            defineField({ name: 'services', type: 'localeString' }),
            defineField({ name: 'contact', type: 'localeString' }),
          ]
        }),
        defineField({
          name: 'footer',
          type: 'object',
          fields: [
            defineField({ name: 'rights', type: 'localeString' }),
          ]
        }),
      ]
    })
  ]
})
