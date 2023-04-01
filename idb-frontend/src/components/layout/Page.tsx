import Head from 'next/head'
import type { FC, PropsWithChildren } from 'react'

interface Props {
  title: string | undefined
}

export const Page: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <>
    <Head>
      <title>{title === undefined ? 'IDB' : `IDB | ${title}`}</title>
    </Head>

    <div className='flex h-screen w-screen overflow-hidden'>{children}</div>
  </>
)
