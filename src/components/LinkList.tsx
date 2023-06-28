import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Suspense } from 'react'

interface ILinks {
  id: string
  title: string
  url: string
}

const links: ILinks[] = []

getDocs(collection(db, 'links')).then((docs) => {
  docs.forEach((doc) => {
    links.push({
      id: doc.id,
      title: doc.get('title'),
      url: doc.get('url'),
    })
  })
})


export function LinkList() {
  if (links.length === 0) {
    return (
      <div className="text-center text-xl">
        <span>nenhum link encontrado</span>
      </div>
    )
  }

  return (
    <div className="my-8 flex flex-col items-center text-center">
      <Suspense fallback={<span>Carregando..</span>}>
        <ul className="flex w-full flex-col gap-4">
          {links.map((link) => {
            return (
              <a href={link.url} key={link.id}>
                <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                  {link.title}
                </li>
              </a>
            )
          })}
        </ul>
      </Suspense>
    </div>
  )
}
