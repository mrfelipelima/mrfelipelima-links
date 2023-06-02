import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

import { firebaseApp } from '@/lib/firebase'
import { z } from 'zod'

const db = getFirestore(firebaseApp)

export async function POST(request: NextRequest) {
  const data = await request.json()

  const linkScheme = z.object({
    title: z.string(),
    url: z.string().url(),
  })

  const link = linkScheme.parse(data)

  const linkRef = await addDoc(collection(db, 'links'), link)

  return NextResponse.json({
    documentId: linkRef.id,
  })
}
