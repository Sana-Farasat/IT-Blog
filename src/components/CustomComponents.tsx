import {PortableTextComponents} from '@portabletext/react';

export const components:PortableTextComponents={
    block:{
    //    h4:({children})=><h4 className='text-3xl font-bold text-accentDarkPrimary text-black black:text-white'>{children}</h4>,
    normal: ({ children }) => (
        <p className="text-base sm:text-2xl font-semibold text-gray-800 mb-4 px-3">{children}</p>
      ),
    //   pre: ({ children }) => (
    //     <pre className="text-2xl bg-gray-100 p-4 rounded">{children}</pre>
    //   ),
    },
    
        // listItem: {
        //   // Ex. 1: customizing common list types
        //   bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
      
        //   // Ex. 2: rendering custom list items
        //   checkmarks: ({children}) => <li className='list-disc marker:text-accentDarkSecondary'>✅ {children}</li>,
        // },
      
}

export function portableTextToPlainText(blocks: any[]): string {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
}
