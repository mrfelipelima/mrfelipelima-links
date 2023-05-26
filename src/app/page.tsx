import { Header } from '@/components/Header'
import { LinkList } from '@/components/LinkList'
import { SocialIcons } from '@/components/SocialIcons'

export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-5/6 lg:w-1/2">
          <Header />
          <LinkList />
          <SocialIcons />
        </div>
      </div>
    </>
  )
}
