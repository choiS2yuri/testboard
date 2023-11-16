'use client';

import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react'


interface PostList {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    count: number;
}
export default function Post(){
    const [posts, setPosts] = useState<PostList[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    // const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [isActive, setIsActive] = useState<number>(0);

    useEffect (()=>{
        const fetchData = async ()=>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();
            setPosts(data.results);
            // console.log(data)
            setTotalCnt(data.totalCnt);
        }
        fetchData()
    },[page])


    const lastPage = Math.ceil(totalCnt / 15);
    //ceil 올림이라는 뜻 floor 버림
    const totalPageCnt = 5;
    const startPage = Math.floor((page - 1) / totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
    const nextPage = () => {
        const nextStart = Math.ceil((page) / 5) * 5 + 1;
        setPage(nextStart)
    }
    const prevPage = () =>{
        const prevStart = Math.floor((page - 1) / 5) * 5;
        setPage(prevStart)
    }
    return(
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
                    posts && posts.map((e,i)=>{
                        const date = new Date(e.date);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2,'0')
                        const fotmatDate = `${year}-${month}-${day}`
                        return(
                            <ul key={i} className='flex justify-between border mb-1'>
                                <li className='my-2 mx-2 px-1 py-1  basis-1/15 text-center'>{posts.length - i}</li>
                                <li className='my-2 mx-2 basis-8/15 text-center'><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                                <li className='my-2  mx-2 basis-2/15 text-center'>{e.author}</li>
                                <li className='my-2  mx-2 basis-3/15 text-center'>{fotmatDate}</li>
                                {/* <li className='my-2'>번호: {page}</li> */}
                            </ul>
                        )
                     })
                    }
                </div>
            </div>
            </div>
            
            {/* 선생님이랑수업끝 */}
            <div className="mx-auto max-w-7xl flex justify-end mb-4">
                <Link href="/write" className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-pink-500 '>글쓰기</Link>
            </div>
            <div className="flex justify-center gap-x-5 mb-5">
                {/* {page > 1 && <button onClick={()=>[setPage(page - 1)]}>이전</button>} */}
                {page > 5 && <button className=' border px-1.5 py-1 rounded text-sm  ' onClick={prevPage}>이전</button>}
                {
                    Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                        const pageNumber = i + startPage;
                        return(
                            <button key={pageNumber} onClick={()=>{setPage(pageNumber); setIsActive(i);}} className={` border px-1.5 py-1 rounded text-sm  basis-8 ${page === pageNumber ? "bg-pink-300 text-white" : " bg-white"}`}> {pageNumber} </button>   
                            )
                    })
                }
                {/* {page < lastPage && <button onClick={()=>[setPage(page + 1)]}>다음</button>} */}
                {page < lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm ' onClick={nextPage}>다음</button>}
            </div>
        </>
    )
}
