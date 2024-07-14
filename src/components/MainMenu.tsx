'use client'
import { Button } from '@/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/ui/sheet'
import clsx from 'clsx'
import { includes } from 'lodash'
import { Home, Menu, Newspaper, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FLogo } from './FLogo'

export function MainMenu() {
  const pathname = usePathname()
  const navLinkClasses = clsx(
    'font-bold text-indigoDark-800 dark:text-framboesa-800 hover:text-framboesa-500',
    'data-[active=true]:text-framboesa-500',
  )

  return (
    <div className="flex md:items-center md:justify-center">
      <nav className="hidden md:flex">
        <ul className="flex items-center gap-2">
          <li>
            <Link
              className={navLinkClasses}
              href="/"
              data-active={pathname === '/'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={navLinkClasses}
              href="/blog"
              data-active={includes(pathname, 'blog')}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={navLinkClasses}
              href="/about"
              data-active={includes(pathname, 'about')}
            >
              Sobre
            </Link>
          </li>
        </ul>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu size={28} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <div>
              <FLogo />
              <span className="sr-only">Felipe Lima</span>
            </div>
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-4 px-2.5 text-framboesa-500 hover:text-framboesa-200"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/blog"
                className="flex items-center gap-4 px-2.5 text-framboesa-500 hover:text-framboesa-200"
              >
                <Newspaper className="h-5 w-5" />
                Blog
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/about"
                className="flex items-center gap-4 px-2.5 text-framboesa-500 hover:text-framboesa-200"
              >
                <User className="h-5 w-5" />
                Sobre
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
