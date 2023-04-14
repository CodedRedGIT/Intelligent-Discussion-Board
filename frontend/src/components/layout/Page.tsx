import Head from 'next/head'
import type { FC, PropsWithChildren } from 'react'
import { Layout } from './Layout'
import React from 'react'

interface Props {
  title: string | undefined
}

export const Page: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <>
    <Head>
      <title>{title === undefined ? 'IDB' : `IDB | ${title}`}</title>
    </Head>

    <Layout>{children}</Layout>
  </>
)
