import Image from 'next/image'

import felipeLima from '@/assets/felipe.jpg'

export function Header() {
  return (
    <div className="my-8 flex flex-col items-center">
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
    </div>
  )
}
