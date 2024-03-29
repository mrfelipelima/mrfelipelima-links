import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return(
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <h1 className="text-2xl">Vish kk deu erro 404</h1>
      <p>A página que você tentou acessar não existe aqui.</p>
      <div className="flex items-center justify-center gap-2">
        <ArrowLeft />
        Voltar para a <Link className="hover:underline" href="/">página inicial</Link>
      </div>
    </main>
  )
}