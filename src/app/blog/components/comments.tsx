'use client'

import { DiscussionEmbed } from "disqus-react"

type CommentSessionProps = {
  post: {
    slug: string
    title: string
  }
}

export default function CommentSession({ post }: CommentSessionProps) {
  const pageURL = typeof window !== 'undefined' ? window.location.href : ''
  const disqsShortName = process.env.DISQS_SHORTNAME || ""
  return (
    <DiscussionEmbed shortname={disqsShortName} config={{ url: pageURL, identifier: post.slug, title: post.title }} />
  )
}