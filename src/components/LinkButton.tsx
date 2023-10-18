interface LinkPutonProps {
  url: string,
  title: string,
}

export default function LinkButton({ url, title }: LinkPutonProps) {
  return(
    <a
      href={url}
      className="w-full bg-framboesa-500 text-framboesa-50 rounded-xl h-16 text-base flex items-center px-3"
    >
      {title}
    </a>
  )
}