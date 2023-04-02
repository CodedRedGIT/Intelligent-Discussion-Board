import {
  faFolderClosed,
  faHomeLg,
  faPenToSquare,
  faPersonWalking,
  faPlay,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import { type FC, type PropsWithChildren } from 'react'
import Navbar from './Navbar'

//   const nav: NavItems = [
//     { name: 'Home', href: '/', icon: faHomeLg },
//     { name: 'Play', href: '/play', icon: faPlay },
//     { name: 'Level Editor', href: '/levels/editor', icon: faVectorSquare },
//     {
//       name: 'Create Character',
//       href: '/assets/create/character',
//       icon: faPersonWalking,
//     },
//     { name: 'Create Object', href: '/assets/create/object', icon: faPenToSquare },
//     { name: 'Asset Library', href: '/assets/library', icon: faFolderClosed },
//   ]

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex h-screen w-screen overflow-hidden'>
    <Navbar />
    <div className='w-full overflow-auto bg-gray-100 p-10 pt-20'>
      {children}
    </div>
  </div>
)
