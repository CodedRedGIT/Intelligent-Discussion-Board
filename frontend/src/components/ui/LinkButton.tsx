import { clsx } from 'clsx'
import Link from 'next/link'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import React from 'react'

interface Props {
  href: string

  className?: string
  style?: CSSProperties
}

export const LinkButton: FC<PropsWithChildren<Props>> = ({
  href,
  className,
  style,
  children,
}) => (
  <Link
    className={clsx(
      'inline-block rounded-md bg-primary px-4 py-2 text-[0.9rem] text-white transition-all enabled:hover:bg-primary-dark enabled:active:bg-primary-darker disabled:opacity-50',
      className,
    )}
    href={href}
    style={style}
  >
    {children}
  </Link>
)
