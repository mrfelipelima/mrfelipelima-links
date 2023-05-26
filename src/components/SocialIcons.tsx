import { FacebookIcon, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'

export function SocialIcons() {
  return (
    <div className="my-8">
      <ul className="flex justify-center gap-2">
        <li>
          <a href="https://www.facebook.com/MrFelipeLima">
            <FacebookIcon
              size={32}
              className="duration-300 hover:text-textBase"
            />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/mrfelipelima">
            <Twitter size={32} className="duration-300 hover:text-textBase" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/mrfelipelima">
            <Instagram size={32} className="duration-300 hover:text-textBase" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mrfelipelima">
            <Linkedin size={32} className="duration-300 hover:text-textBase" />
          </a>
        </li>
        <li>
          <a href="mailto:eu@felipelima.net">
            <Mail size={32} className="duration-300 hover:text-textBase" />
          </a>
        </li>
      </ul>
    </div>
  )
}
