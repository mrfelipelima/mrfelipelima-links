import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="space-y-4 p-8 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <span className="text-lg">vish kk deu erro</span>
      <p className="text-2xl">
        A página que você tentou acessar não existe aqui.
      </p>
      <div className="flex items-center justify-center gap-2">
        <ArrowLeft />
        Voltar para a{' '}
        <Link className="hover:underline" href="/">
          página inicial
        </Link>
      </div>
    </main>
  )
}
