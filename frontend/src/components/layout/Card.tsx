import { clsx } from 'clsx'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import React from 'react'

interface Props {
  className?: string
  style?: CSSProperties
}

export const Card: FC<PropsWithChildren<Props>> = ({
  className,
  style,
  children,
}) => (
  <div
    className={clsx(
      'rounded-lg border-neutral-300 bg-white px-4 py-3 shadow-md',
      className,
    )}
    style={style}
  >
    {children}
  </div>
)
