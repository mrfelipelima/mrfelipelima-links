import { server } from '@/lib/enviroment'

interface ILinks {
  id: string
  title: string
  url: string
}

export async function LinkList() {
  const response = await fetch(`${server}/api/v1/links`)
  const links: ILinks[] = await response.json()

  return (
    <div className="my-8 flex flex-col items-center text-center">
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
    </div>
  )
}
