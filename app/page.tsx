import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

interface userInfo {
  user:{
    name?: string;
    email?: string;
    image?: string;
    level?: number;
  }
}
export default async function Home() {


    const page = 1;
    const perPage = 15;
    const offset = (page - 1)* perPage;

    
    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM board order by date DESC limit ?  offset ? ',[perPage, offset]);
    const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from choiyul.board')
    const totalCnt = countResult[0].cnt
    // console.log(results)

    let sessions = await getServerSession(authOptions) as userInfo;
    // console.log(sessions)

  return (
    <>
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-center text-2xl font-semibold">게시판</h1>
    </div>
  <div className="mx-auto max-w-7xl p-6">
    <div className="bg-white shadow-md rounded-lg">
      <div className="min-w-full">
       <ul className="bg-gray-100 flex justify-between">
        <li className="px-6 py-3 text-center basis-2/15">번호</li>
        <li className="px-6 py-3 text-center basis-8/15">제목</li>
        <li className="px-6 py-3 text-center basis-2/15">작성자</li>
        <li className="px-6 py-3 text-center basis-3/15">작성일</li>
       </ul>
       {
        results && results.map((e,i)=>{
          const date = new Date(e.date);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2,'0')
          const fotmatDate = `${year}-${month}-${day}`
        return(
          <ul key={i} className='flex justify-between border mb-1'>
            <li className='my-2 mx-2 px-1 py-1  basis-1/15 text-center'>{results.length - i}</li>
            <li className='my-2 mx-2 basis-8/15 text-center'><Link href={`/post/${e.id}`}>{e.title}</Link></li>
            <li className='my-2  mx-2 basis-2/15 text-center'>{e.username}</li>
            <li className='my-2  mx-2 basis-3/15 text-center'>{fotmatDate}</li>
            {/* <li className='my-2'>번호: {page}</li> */}
          </ul>
            )
          })
        }
      </div>
    </div>
  </div>
  <div className="mx-auto max-w-7xl flex justify-end mb-4">
    {
      sessions && <Link href="/write" className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-pink-500 '>글쓰기</Link>
    }
  </div>
</>
  )
}
