import { Page } from '@/components/layout/Page'
import type { NextPage } from 'next'
import Login from './assets/login'
import Register from './assets/register'

const Root: NextPage = () => (
  <Page title={undefined}>
    <Login />
  </Page>
)

export default Root
