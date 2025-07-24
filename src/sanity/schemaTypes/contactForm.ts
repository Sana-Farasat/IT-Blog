import { Rule } from '@sanity/types';

const contactFormSchema = {
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(3).max(100)
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: Rule) => Rule.optional().min(10).max(1000)
    }
  ]
}

export default contactFormSchema;