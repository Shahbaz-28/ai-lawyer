'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChatBubbleLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Chat', href: '/dashboard', icon: ChatBubbleLeftIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm mt-16">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-4 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 