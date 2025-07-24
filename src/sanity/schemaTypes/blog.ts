import { Rule } from '@sanity/types';
import {defineType,defineArrayMember} from "sanity";
//import {defineField} from "sanity";

export const blog = defineType({
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Blog Title',
      description: 'Title of the Blog',
      validation: (Rule: Rule) => Rule.required().min(2).max(20),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly version of the blog title',
      options: {
        source: 'title', // this will generate the slug based on the title
        maxLength: 96, // optional max length for the slug
      },
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: 'Summary of the Blog Post',
      validation: (Rule: Rule) => Rule.required().min(10),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'The date and time when the blog was published',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'Name of the blog author',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Main image for the blog post',
      options: {
        hotspot: true, // allows cropping and focus adjustment
      },
    },
    {
      name:'content',
      type:'array',
      title:'Content',
      of: [
        defineArrayMember({
          type:'block'
        })
      ]
    }
  ],
});

//--------------Reference field is added here at the last-----------------
//defineField({
//       name:'author',
//       type:'reference',
//       title:'Author'
//       to:[
//           {type: 'author'}
//                  ]
//})