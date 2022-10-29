import { Disclosure } from '@headlessui/react'
import { CaretUp, Quotes } from 'phosphor-react';
import useFetch from '../hooks/useFetch';

type Posts = {
    ID: string;
    site_ID: string;
    author: {};
    date: Date;
    modified: Date;
    title: string;
    URL: string;
    short_URL: string;
    content: string;
    excerpt: string;
}

type WordPressResponse = {
    found: string;
    posts: Posts[];
    meta: Object;
}

export default function Callout() {
  
    const { data: blogPosts, isFetching } =
        useFetch<WordPressResponse>('/posts')

  return (
    <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full h-14 justify-between items-center rounded bg-secondaryShadow2 px-4 py-2 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                <h2>Blog</h2>
                <CaretUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <ul>
                    {isFetching && <p>Carregando...</p>}
                    {blogPosts?.posts.map(wpPosts => {
                        const postTitle = wpPosts.title.replace(/((&#)[0-9])\w+;/, '');
                        return(
                            <li key={wpPosts.ID} className="flex mb-1">
                                <a href={wpPosts.URL} className="flex-initial text-base text-zinc-300 hover:underline duration-300">
                                    <h3>{postTitle}</h3>
                                </a>
                            </li>
                        )
                    })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
  )
}