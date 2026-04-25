import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
    }),
    defineField({
      title: 'Tamil',
      name: 'ta',
      type: 'string',
    }),
    defineField({
      title: 'Hindi',
      name: 'hi',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Tamil',
      name: 'ta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Hindi',
      name: 'hi',
      type: 'text',
      rows: 3,
    }),
  ],
})
