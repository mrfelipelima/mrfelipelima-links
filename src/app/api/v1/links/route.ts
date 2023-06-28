import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

import { db } from '@/lib/firebase'

type Links = {
  id: string
  title: string
  url: string
}

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'links'))

  const links: Links[] = []

  querySnapshot.forEach((doc) => {
    links.push({
      id: doc.id,
      title: doc.get('title'),
      url: doc.get('url'),
    })
  })

  return NextResponse.json(links, {
    status: 200,
  })
}

// export async function POST(request: NextRequest) {
//   const data = await request.json()

//   const linkScheme = z.object({
//     title: z.string(),
//     url: z.string().url(),
//   })

//   const link = linkScheme.parse(data)

//   const linkRef = await addDoc(collection(db, 'links'), link)

//   const response = {
//     id: linkRef.id,
//     title: link.title,
//     url: link.url,
//   }

//   return NextResponse.json(response, {
//     status: 201,
//   })
// }
