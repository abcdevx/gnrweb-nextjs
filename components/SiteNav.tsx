import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function SiteNav() {
  return (
    <nav>
      <div>
        <Link href="/">{siteConfig.bandName}</Link>
      </div>
      <ul>
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
