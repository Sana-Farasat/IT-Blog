import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { blog } from './blog'
import contactFormSchema from './contactForm'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog,author,contactFormSchema],
}
