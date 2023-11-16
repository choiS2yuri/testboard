
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

// import { useCustomSession } from '../sessions';
import { getServerSession } from 'next-auth';


export default async function Login(){
    const session = await getServerSession(authOptions) as userInfo;
    // const {data: session, status} = useCustomSession();
    const redirectTo = ()=>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href='/login'
    }
    return(
        <>
        {
            session && session.user
            ? 
            <>
                <div className='max-w-7xl mx-auto flex justify-end'>
                    <p className='mr-3'>{session && session.user?.name}님 반갑습니다.</p>
                    <Link href='/logout'>로그아웃</Link>
                </div>
            </>
            :
            <>
            <div className="max-w-7xl mx-auto flex justify-start"> 
              <Link href="/register">회원가입</Link>
            </div>
            <div className="max-w-7xl mx-auto flex justify-start"> 
            <Link href='/login'>로그인</Link>
            </div> 
            </>
        }
        </>
    )
}


