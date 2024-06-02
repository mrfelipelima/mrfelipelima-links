'use client'

import { env } from "@/env"
import { DiscussionEmbed } from "disqus-react"

type CommentSessionProps = {
  post: {
    slug: string
    title: string
  }
}

export default function CommentSession({ post }: CommentSessionProps) {
  const pageURL = typeof window !== 'undefined' ? window.location.href : ''
  const disqsShortName = env.NEXT_PUBLIC_DISQS_SHORTNAME
  return (
    <DiscussionEmbed shortname={disqsShortName} config={{ url: pageURL, identifier: post.slug, title: post.title }} />
  )
}