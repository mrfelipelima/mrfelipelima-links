import Link from "next/link";

interface LinkPutonProps {
  id: string,
  title: string,
}

export default function LinkButton({ id, title }: LinkPutonProps) {
  return (
    <li className="w-full rounded-xl h-16">
      <Link
        href={`/api/v1/link/${id}`}
        className="w-full bg-framboesa-500 text-framboesa-50 rounded-xl h-16 text-base flex items-center justify-center px-3 hover:bg-framboesa-700 transition-colors"
      >
        {title}
      </Link>
    </li>
  )
}