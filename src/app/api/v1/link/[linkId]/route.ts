import { db } from '@/lib/firebase'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { notFound, redirect } from 'next/navigation'

export async function GET(
  req: Request,
  { params }: { params: { linkId: string } },
) {
  const linkRef = doc(db, 'links', params.linkId)

  const linkDoc = await getDoc(linkRef)

  if (!linkDoc.exists()) {
    return notFound()
  }

  const redirectLink = linkDoc.get('url')

  await updateDoc(linkRef, {
    click: increment(1),
  })

  return redirect(redirectLink)
}
