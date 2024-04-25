'use client';

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { link } from 'fs'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
 const pathname = usePathname();

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image src='/assets/images/logon.jpg' alt='logo' width={250} height={28} />
        </Link>

        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_elements group  ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                    }`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image
                      src={link.icon}
                      alt='logo'
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </SignedIn>

          <SignedOut>
            
          </SignedOut>

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
