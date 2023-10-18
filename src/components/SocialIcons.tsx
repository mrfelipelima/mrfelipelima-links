import { FacebookIcon, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'

export function SocialIcons() {
  return (
    <div className="w-full text-framboesa-500">
      <ul className="flex justify-center gap-6">
        <li>
          <a href="https://www.facebook.com/MrFelipeLima">
            <FacebookIcon
              size={24}
              className="duration-300 hover:text-framboesa-800"
            />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/mrfelipelima">
            <Twitter size={24} className="duration-300 hover:text-framboesa-800" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/mrfelipelima">
            <Instagram size={24} className="duration-300 hover:text-framboesa-800" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mrfelipelima">
            <Linkedin size={24} className="duration-300 hover:text-framboesa-800" />
          </a>
        </li>
        <li>
          <a href="mailto:eu@felipelima.net">
            <Mail size={24} className="duration-300 hover:text-framboesa-800" />
          </a>
        </li>
      </ul>
    </div>
  )
}
