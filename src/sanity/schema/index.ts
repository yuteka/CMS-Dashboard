import { type SchemaTypeDefinition } from 'sanity'
import { localeString, localeText } from './localeTypes'
import siteContent from './siteContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, siteContent],
}
