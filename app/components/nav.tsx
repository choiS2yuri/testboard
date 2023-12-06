
interface userInfo {
    user:{
      name?: string;
      email?: string;
      image?: string;
      level?: number;
    }
  }


import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Logout from './logout';
import Login from './login';
// import { useCustomSession } from '../sessions';


export default async function Nav(){
    const session = await getServerSession(authOptions) as userInfo;
    // const {data: session, status} = useCustomSession();
    return(
        <>
        {
            session && session.user
            ? 
            <>
                <div className='max-w-7xl mx-auto flex justify-end'>
                    <p className='mr-3'>{session && session.user?.name}님 반갑습니다.</p>
                    <Logout />
                </div>
            </>
            :
            <div className='max-w-7xl mx-auto flex justify-end'>
                <div className='basis-1/12'> 
                    <Link href="/register" className='hover:font-bold'>회원가입</Link>
                </div>
                <div className='basis-1/12'> 
                    <Login />
                </div> 
            </div>
        }
        {
            session && session?.user.level === 10 
            ?
            <>
                <div className="w-full flex justify-start">
                    <Link href='/admin'>관리자페이지</Link>
                </div>
            </>
            :
            ""
        }
        </>
    )
}


