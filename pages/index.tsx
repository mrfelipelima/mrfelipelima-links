import Head from 'next/head';
import Image from 'next/image';
import {FacebookLogo, TwitterLogo, InstagramLogo, LinkedinLogo, EnvelopeOpen} from 'phosphor-react';

import FelipePhoto from '../src/assets/felipe.jpg';
import Callout from '../src/components/Disclosure';

export default function Home() {
  return (
    <>
      <Head>
        <title>Felipe Lima - Link list</title>
        <meta name="description" content="Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos." />
      </Head>
      <div className="h-screen flex items-center justify-center">
      <div className="w-5/6 lg:w-1/2">
        <section className="flex flex-col items-center my-8">
          <Image className="w-32 h-32 rounded-full border-4 border-textBase" src={FelipePhoto} alt="Foto de Felipe Cunha Lima" />
          <h1 className="text-4xl text-primaryColor font-titles text-center">Felipe Lima</h1>
          <span className="text-xl">@mrfelipelima</span>
          <span className="text-center">Web Engineer</span>
        </section>
        <Callout />
        <div className="flex flex-col items-center text-center my-8">
          <ul className="w-full flex flex-col gap-4">
            <a href="https://github.com/mrfelipelima">
              <li className="flex items-center justify-center h-14 w-full bg-secondaryShadow2 rounded hover:bg-secondaryShadow1 duration-300 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                GitHub
              </li>
            </a>
            <a href="https://twitch.tv/mrfelipelima">
              <li className="flex items-center justify-center h-14 w-full bg-secondaryShadow2 rounded hover:bg-secondaryShadow1 duration-300 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                Twitch
              </li>
            </a>
            <a href="https://facebook.com/GGfelipelima">
              <li className="flex items-center justify-center h-14 w-full bg-secondaryShadow2 rounded hover:bg-secondaryShadow1 duration-300 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                Facebook Gaming
              </li>
            </a>
          </ul>
        </div>
        <div className="my-8">
          <ul className="flex gap-2 justify-center">
            <li>
              <a href="https://www.facebook.com/MrFelipeLima">
                <FacebookLogo size={38} className="hover:text-textBase duration-300" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/mrfelipelima">
                <TwitterLogo size={38} className="hover:text-textBase duration-300" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/mrfelipelima">
                <InstagramLogo size={38} className="hover:text-textBase duration-300" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mrfelipelima">
                <LinkedinLogo size={38} className="hover:text-textBase duration-300" />
              </a>
            </li>
            <li>
              <a href="mailto:eu@felipelima.net">
                <EnvelopeOpen size={38} className="hover:text-textBase duration-300" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
