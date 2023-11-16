import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from './components/login'
import AuthSession from './session';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons:{
    icon:"/favicon.ico"
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {




  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="max-w-7xl mx-auto">
          <p className='flex justify-end text-gray-400'>{session && session.user?.email? "로그아웃" : '로그인'}</p>
        </div> */}
        <AuthSession>
          <Login />
          {children}
        </AuthSession>
      </body>
      {/* 전체를 읽는 것 children이 모든 tsx파일을 읽음 여기가 메인*/}
    </html>
  )
}
