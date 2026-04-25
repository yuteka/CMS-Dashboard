import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'
import { projectId, dataset } from '../sanity/env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | string) => {
  if (!source) return ''
  
  // If it's already a URL (string), just return it
  if (typeof source === 'string') return source
  
  // If it's a Sanity Image object, use the builder
  return imageBuilder.image(source).auto('format').fit('max').url()
}
