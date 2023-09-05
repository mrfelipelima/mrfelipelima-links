import { localApi } from '@/lib/api';
import { Suspense } from 'react';

interface ILinks {
  id: string;
  title: string;
  url: string;
}

export const revalidate = 60;

export async function LinkList() {

  try {
    const response = await localApi.get("/links")

    if (response.data.length === 0) {
      return (
        <div className="text-center text-xl">
          <span>nenhum link encontrado</span>
        </div>
      )
    }

    const links: ILinks[] = response.data

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

  } catch(error) {
    console.log({
      message: 'Não foi possível acessar a api local.',
      data: error
    })
    return(
      <span>Não foi possível acessar a API local.</span>
    )
  }
}
