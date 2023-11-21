
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
            <>
            <div className="max-w-7xl mx-auto flex justify-start"> 
              <Link href="/register">회원가입</Link>
            </div>
            <div className="max-w-7xl mx-auto flex justify-start"> 
                <Login />
            </div> 
            </>
        }
        </>
    )
}


