import { FacebookIcon, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'

export function SocialIcons() {
  return (
    <div className="w-full text-framboesa-500">
      <ul className="flex justify-center gap-6">
        <li>
          <a title="Facebook" href="https://www.facebook.com/MrFelipeLima">
            <p className="sr-only">Facebook</p>
            <FacebookIcon
              size={24}
              className="duration-300 hover:text-framboesa-800"
            />
          </a>
        </li>
        <li>
          <a title="Twitter" href="https://twitter.com/mrfelipelima">
            <Twitter
              size={24}
              className="duration-300 hover:text-framboesa-800"
            />
            <p className="sr-only">Twitter</p>
          </a>
        </li>
        <li>
          <a title="Instagram" href="https://instagram.com/mrfelipelima">
            <Instagram
              size={24}
              className="duration-300 hover:text-framboesa-800"
            />
            <p className="sr-only">Instagram</p>
          </a>
        </li>
        <li>
          <a title="LinkedIn" href="https://www.linkedin.com/in/mrfelipelima">
            <Linkedin
              size={24}
              className="duration-300 hover:text-framboesa-800"
            />
            <p className="sr-only">Linkedin</p>
          </a>
        </li>
        <li>
          <a title="Email" href="mailto:eu@felipelima.net">
            <Mail size={24} className="duration-300 hover:text-framboesa-800" />
            <p className="sr-only">E-mail</p>
          </a>
        </li>
      </ul>
    </div>
  )
}
