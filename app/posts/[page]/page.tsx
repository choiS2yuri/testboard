import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Search from '@/app/components/search';



interface userInfo {
  user:{
    name?: string;
    email?: string;
    image?: string;
    level?: number;
  }
}
export default async function PostsList({
    params,
} : {
    params?: {page ?: number}
}) {
    //잇을수도있고 없을수도 있고 넘버로 받음


    const currentPage = params?.page !== undefined ? params.page : 1;
    //현재 파라미터가 값이 없다면 ? 1페이지가 되고:그게 아니라면 해당 페이지로 접속

    const perPage = 10;
    const offset = (currentPage - 1)* perPage;

    
    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM board order by date DESC limit ?  offset ? ',[perPage, offset]);
    const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from choiyul.board')
    const totalCnt = countResult[0].cnt

    const lastPage = Math.ceil(totalCnt / perPage);
    const totalPageCnt = 5;
    //페이지클릭 5개만 보여주겠다
    const startPage = Math.floor((currentPage - 1) / totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt -1);
    let prevStart = Math.floor((currentPage -1) / 5) *5 - 4;
    let nextStart = Math.ceil((currentPage) / 5) * 5 + 1;
    //값이 바뀌기 때문에 let 사용


    let sessions = await getServerSession(authOptions) as userInfo;

  return (
    <>
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-center text-2xl font-semibold">자유게시판📔</h1>
    </div>
    <div className='max-w-7xl mx-auto flex justify-end'>
        <Search />
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
          const number = totalCnt - ((currentPage - 1) *perPage + i)
        return(
          <ul key={i} className='flex justify-between border mb-1'>
            <li className='my-2 mx-2 px-1 py-1  basis-2/15 text-center'>{number}</li>
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
  <div className="flex justify-center gap-x-5 mb-5">
    {
        currentPage > 5 && <Link href={`/posts/${prevStart}`} className='bg-white border px-1.5 py-1 test-sm rounded'>이전</Link>
    }
    {
        Array(endPage - startPage + 1).fill(null).map((_,i)=>{
            const pageNumber = i + startPage;
            return(
                <Link key={i} href={`/posts/${pageNumber}`} className='bg-white border px-1.5 py-1 test-sm rounded'>{pageNumber}</Link>
            )
        })
    }
    {
        nextStart <= lastPage && <Link href={`/posts/${nextStart}`} className='bg-white border px-1.5 py-1 test-sm rounded'>다음</Link>
    }
    
  </div>
</>
  )
}
