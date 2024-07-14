import Link from 'next/link'

interface LinkPutonProps {
  id: string
  title: string
}

export default function LinkButton({ id, title }: LinkPutonProps) {
  return (
    <li className="h-16 w-full rounded-xl">
      <Link
        href={`/api/v1/link/${id}`}
        className="flex h-16 w-full items-center justify-center rounded-xl bg-framboesa-500 px-3 text-base text-framboesa-50 transition-colors hover:bg-framboesa-700"
      >
        {title}
      </Link>
    </li>
  )
}
