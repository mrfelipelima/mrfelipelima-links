import Image from 'next/image'

import felipeLima from '@/assets/felipe.jpg'
import { FacebookIcon, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-5/6 lg:w-1/2">
          <section className="my-8 flex flex-col items-center">
            <Image
              className="h-32 w-32 rounded-full border-4 border-textBase"
              src={felipeLima}
              width="144"
              height="144"
              alt="Foto de Felipe Lima"
            />
            <h1 className="font-titles text-center font-alt text-4xl text-primaryColor">
              Felipe Lima
            </h1>
            <span className="text-xl">@mrfelipelima</span>
            <span className="text-center">
              Pedreiro da internet, construo páginas, escrevo e faço stream...
            </span>
          </section>
          <div className="my-8 flex flex-col items-center text-center">
            <ul className="flex w-full flex-col gap-4">
              <a href="https://github.com/mrfelipelima">
                <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                  GitHub
                </li>
              </a>
              <a href="https://twitch.tv/mrfelipelima">
                <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                  Twitch
                </li>
              </a>
              <a href="https://facebook.com/GGfelipelima">
                <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                  Facebook Gaming
                </li>
              </a>
            </ul>
          </div>
          <div className="my-8">
            <ul className="flex justify-center gap-2">
              <li>
                <a href="https://www.facebook.com/MrFelipeLima">
                  <FacebookIcon
                    size={38}
                    className="duration-300 hover:text-textBase"
                  />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/mrfelipelima">
                  <Twitter
                    size={38}
                    className="duration-300 hover:text-textBase"
                  />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/mrfelipelima">
                  <Instagram
                    size={38}
                    className="duration-300 hover:text-textBase"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mrfelipelima">
                  <Linkedin
                    size={38}
                    className="duration-300 hover:text-textBase"
                  />
                </a>
              </li>
              <li>
                <a href="mailto:eu@felipelima.net">
                  <Mail
                    size={38}
                    className="duration-300 hover:text-textBase"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
