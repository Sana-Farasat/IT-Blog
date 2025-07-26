//'use client'
import {
  components,
  portableTextToPlainText,
} from "@/components/CustomComponents";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogActions from "@/components/BlogActions";

export const revalidate = 10; //----> seconds

export async function generateStaticParams() {
  const query = `
*[_type == 'blog']{
 "slug":slug.current
}`;
  const slugs = await client.fetch(query);

  // const slugRoutes:string[]=slugs.map((slug:{slug:string})=>{
  // slug.slug
  // })
  // return slugRoutes.map((slug:string)=>{{slug}})

  // Create an array of slug objects like [{ slug: 'slug1' }, { slug: 'slug2' }, ...]
  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}

interface BlogData {
  title: string;
  // summary: string;
  content: any;
  author: string;
  imageUrl: string;
  slug: string;
}

// interface BlogParams {
//     params: { slug: string };
//   }

export default async function BlogData({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = `  *[_type == 'blog' && slug.current == '${slug}']{         
        content,
        title,
        author,
         "imageUrl": image.asset->url,
         "slug": slug.current
        
  }
`;
  const fetchData: BlogData[] = await client.fetch(query, {
    slug: slug,
  });

  //console.log(fetchData)

  //const {slug}= await params;
  //console.log(slug)

  return (
    <div>
      {fetchData.map((data: BlogData, index: any) => {
        if (!data) {
          return notFound(); // Show 404 page if blog not found
        }
        return (
          <div key={index}>
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex flex-col px-5 pt-24 justify-center items-center">
                <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-gray-900 transition-transform duration-300 ease-in-out hover:scale-105">
                  {data.title}
                  {/* {slug} */}
                </h1>
                <br />
                <Image
                  className="lg:w-3/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded transition-transform duration-300 ease-in-out hover:scale-105"
                  alt={data.title}
                  src={urlFor(data.imageUrl).url()}
                  width={800}
                  height={300}
                />
                <div className="w-full md:w-2/3 flex flex-col mb-2 items-center text-center">
                  <div className="mb-4 leading-relaxed">
                    <PortableText
                      value={data.content}
                      components={components}
                    />
                  </div>
                  <div className="flex w-full justify-center items-end">
                    <p> Written by {data.author} </p>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className="grid grid-cols-1 justify-items-center sm:flex sm:justify-center sm:items-center sm:gap-3 sm:my-2">
    <ShareButton  title={data.title} slug={data.slug}   />
    <CopyButton text={portableTextToPlainText(data.content)} />
    <SaveButton blog={data}  />
    <DownloadButton title={data.title} content={portableTextToPlainText(data.content)} />
     </section> */}

            {/* <section className="w-full max-w-48 sm:max-w-96 mx-auto sm:mx-0 grid grid-cols-2 sm:grid-cols-4 gap-1  "> */}
            <section className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center my-4">
              <BlogActions
                title={data.title}
                slug={data.slug}
                content={portableTextToPlainText(data.content)}
                imageUrl={data.imageUrl}
              />
            </section>

            <br />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}
